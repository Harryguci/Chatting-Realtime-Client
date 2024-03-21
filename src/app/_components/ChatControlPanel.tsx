import { Fragment, ReactNode, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import '../_assets/scss/components/chatControl.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import SearchBox from "./SearchBox";
import MessageCard from "./MessageCard";
import axios from "axios";
import Spinner from "./Spinner";
import IMessageCard from "../_interfaces/IMessageCard";
import IRelationship from "../_interfaces/IRelationship";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
import { GlobalContext } from "../Context/store";
import TimeDiff from "../_helper/TimeDiff";
import { server } from "@/config";
import CreateNewChatForm from "./CreateNewChatForm";

function ChatControlPanel({ style }: { style: object | undefined }): ReactNode {
    const router = useRouter();

    const [search, setSearch] = useState<string>("");
    const [messageCards, setMessageCards] = useState<IMessageCard[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showCreateForm, setShowCreateForm] = useState<boolean>(false);

    const messageCardWrapRef = useRef<HTMLDivElement>(null);
    const createNewBtnRef = useRef<HTMLButtonElement>(null);

    const { data: userData } = useContext(GlobalContext);

    const getRoomId = async (friend: string) => {
        return await axios.get(`${server}/api/RoomAccounts/Friend?user1=${userData ? userData.username : JSON.parse(localStorage.getItem('currentUser') ?? "{}").username}&user2=${friend}`)
            .then(response => {
                return response.data.id;
            })
            .catch(error => {
                swal({
                    title: "Error!",
                    text: error.message,
                    icon: "error",
                    buttons: ["Try later!"],
                });
            });
    }

    useEffect(() => {
        var token: string | null = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');
        var currentUsername = JSON.parse(sessionStorage.getItem('currentUser') ?? "{}").username;

        axios.get(`${server}/api/Relationships`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((repsonse: any) => {
            var arr = Array.from<IRelationship>(repsonse.data);
            var listFriend: IMessageCard[] = [];

            arr.forEach(async (item, index) => {
                const friend = item.user1 !== currentUsername ? item.user1 : item.user2;
                const roomId = await getRoomId(friend)

                const lastOneMess: string = await axios.get(`${server}/api/Messages/RoomId/${roomId}?limit=1`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }).then(response => {
                        if (response.data.length > 0) {

                            return response.data[0].content;
                        }
                        return 'Chưa có tin nhắn nào'
                    })
                    .catch(error => 'ERROR');

                var friendAccount = await axios.get(`${server}/api/Accounts/Find/${friend}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(response => response.data.result[0]);

                var txtLastLogin = 'online';
                if (friendAccount.lastLogin) {
                    txtLastLogin = 'last ' + TimeDiff(new Date(friendAccount.lastLogin).getTime(), Date.now())
                }

                const messageCardItem: IMessageCard = {
                    content: lastOneMess,
                    user: {
                        username: friend,
                        lastLogin: `<b class="text-green">${txtLastLogin}</b>`,
                        lastLoginNumber: friendAccount.lastLogin ? new Date(friendAccount.lastLogin).getTime() : -1
                    },
                    href: `/chat/${friend}`
                }

                listFriend = [...listFriend, messageCardItem];
                // console.log(listFriend);

                listFriend.sort((a: any, b: any) => {
                    if (b.user.lastLoginNumber === -1 || (a.user.lastLoginNumber < b.user.lastLoginNumber))
                        return 1;
                    if (a.user.lastLoginNumber === -1 || (a.user.lastLoginNumber > b.user.lastLoginNumber))
                        return -1;

                    return 0;
                });

                setMessageCards(listFriend);
            })

            setMessageCards(listFriend);
            setLoading(false);

            return repsonse.data;
        }).catch(error => {
            if (error.response.status === 401)
                router.push('/auth/login');
        })

        return () => {
            setMessageCards([]);
        }
    }, [router]);

    useLayoutEffect(() => {
        if (messageCardWrapRef && messageCardWrapRef.current)
            messageCardWrapRef.current.style.opacity = loading ? '0' : '1';
    }, [loading]);

    const closeForm = useCallback((ev: any) => {
        setShowCreateForm(false);
    }, [])

    return (
        <Fragment>
            <div className="chat-control-panel" style={style ?? {}}>
                {<Spinner style={loading ? { opacity: '1' } : { opacity: '0' }} />}
                <div className="chat-control-panel__head">
                    <div className="">
                        <h1>Chat</h1>
                        <button className="btn" style={{ padding: '0' }}>
                            Recent chat {!loading && <FontAwesomeIcon icon={faAngleDown} />}
                        </button>
                    </div>
                    <div className="">
                        <button ref={createNewBtnRef} onClick={e =>
                            setShowCreateForm(prev => !prev)
                        }
                            className="btn bg-primary-gradient rounded-1 box-shadow-1">
                            {!loading && <FontAwesomeIcon icon={faPlus} />}{" "}Create New Chat
                        </button>
                    </div>
                </div>
                <SearchBox style={{ margin: '2rem 0' }}
                    searchText={search}
                    setSearchText={setSearch}
                    onlyFriend={true} />
                <div ref={messageCardWrapRef} style={{ transition: 'opacity 0.3s 0.3s ease-in-out', opacity: '0' }}
                    className="message-card-wrapper">
                    {messageCards && messageCards.length > 0
                        && messageCards.map((item, index) =>
                            <MessageCard key={index} {...item} />
                        )}
                    {!loading && messageCards.length <= 0 &&
                        <h3 className="text-center text-blue">Hãy thêm 1 bạn bè để trò chuyện</h3>}
                </div>
            </div>
            {showCreateForm && <CreateNewChatForm currentUser={userData} close={closeForm} className="center" bgShadow={true} />}
        </Fragment >
    )
}

export default ChatControlPanel;
