import { Fragment, ReactNode, useEffect, useRef, SetStateAction, Dispatch, useState, ChangeEventHandler, ChangeEvent, useContext } from "react"
import '../_assets/scss/components/search_box.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import swal from "sweetalert";
import Link from "next/link";
import { GlobalContext } from "../Context/store";

interface SearchResult {
    username: '',
    roles: '',
    email: '',
    isFriend: boolean,
}

function SearchBox({ style, searchText, setSearchText }:
    { style: object | {}, searchText: string, setSearchText: Dispatch<SetStateAction<string>> }): ReactNode {
    const formRef = useRef<HTMLFormElement>(null);
    const [result, setResult] = useState<SearchResult[]>([]);
    const { data: currentUser } = useContext(GlobalContext);

    useEffect(() => {
        if (formRef.current) {
            formRef.current.onsubmit = (event: any) => event.preventDefault();
        }
    }, [formRef])

    const FindUser = async () => {
        const token = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

        await axios.get(`https://localhost:3001/api/Accounts/Find/${searchText}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(response => {
            console.log(response.data);
            var list = response.data.result;
            var friends = response.data.listFriend;
            // To do: update isFriend prop in the List

            list.map((item: any, index: number) => {
                if (friends.filter((p: any) => (p.user1 === item.username || p.user2 === item.username)).length > 0)
                    item.isFriend = true;
            });

            setResult(response.data.result);
        }).catch(error => {
            console.error(error);
        })
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
        FindUser();
    }

    const handleAddFriend = async (friend: string) => {
        const token = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');
        const data = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/FriendRequests`, {
            id: '',
            user1: currentUser?.username,
            user2: friend
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => response.data)
        .catch(error => {
            swal(error.message, {
                title: 'Error',
                //@ts-ignore
                buttons: {
                    Ok: 'Ok',
                },
                icon: 'error'
            });
        })
        if (data) {
            swal('Gửi yêu cầu thành công', {
                title: 'Add Friend',
                //@ts-ignore
                buttons: {
                    Ok: 'Ok',
                },
                icon: 'success'
            });
        }
    }   

    return (
        <Fragment>
            <form style={style} ref={formRef} className="search-box box-shadow-1 rounded-1">
                <div style={{ display: "flex", alignItems: 'center', paddingLeft: '1rem' }}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} style={{ fontSize: '14px', color: '#666666' }} />
                    <input className="form-control"
                        style={{ padding: 1 + 'rem', width: '100%', border: 'none' }}
                        type="text" name="search" id="search"
                        placeholder="Search"
                        value={searchText} onChange={handleChange} />
                    {result && result.length > 0 &&
                        <ul className="search-box__list-result rounded-1 box-shadow-1">
                            {result.map((user, index) =>
                                <li key={user.username} style={{ display: 'flex' }}>
                                    <Link href={`/chat/${user.username}`}>{user.username}</Link>
                                    <div className="" style={{ marginRight: '0', marginLeft: 'auto' }}>
                                        {!user.isFriend &&
                                            <button
                                                onClick={(e) => handleAddFriend(user.username)}
                                                className="btn"
                                                style={{ padding: 0 }}>
                                                Add Friend
                                            </button>}
                                    </div>
                                </li>
                            )}
                        </ul>}
                </div>
                <button className="btn" style={{
                    width: '30%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    boxShadow: '-5px 0 5px rgba(0,0,0,0.02)'
                }}>
                    <FontAwesomeIcon icon={faAngleDown} />{" "}Messages
                </button>
            </form>
        </Fragment>
    )
}

export default SearchBox
