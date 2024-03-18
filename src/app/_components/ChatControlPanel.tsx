import { Fragment, ReactNode, useState } from "react";
import '../_assets/scss/components/chatControl.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import SearchBox from "./SearchBox";
import MessageCard from "./MessageCard";

interface IMessageCard {
    content: string,
    user: object,
    href: string
}

function ChatControlPanel({ style }: { style: object | undefined }): ReactNode {
    const [search, setSearch] = useState<string>("");
    const [messageCards, setMessageCards] = useState<IMessageCard[]>([
        {
            content: `Lyric:
            Nếu em còn một giấc mộng đẹp 
            Cho anh, được gần em, suy tư thêm 1 chút 
            Anh nhìn em 
            Anh chờ em 
            Cả 2 ta như cuốn lấy nhau rồi phải không? Phải không?
            
            Nếu em còn đôi mắt đượm buồn
            Cho anh, được chạm vào, khung cửa đã cũ
            Anh bên em
            Anh nghe em
            Lời bài hát như chiếc lá rơi bên thềm ngày mùa đông
            Ngày con tim còn thương
            
            Chờ mùa hoa tới
            Chờ từng nỗi ngây ngô tuổi trẻ 
            Chờ những vòng tay chờ những con đường chờ những nụ hôn 
            Chúng ta dành hết xuân thì, để say mê đôi bờ mi
            
            Chờ mùa mưa tới
            Chờ từng giấc chiêm bao ngày hè
            Chờ những lời ru chờ những giai điệu chờ những vầng trăng
            Chúng ta dành hết xuân thì, để chờ nhau
            
            Nếu em còn đôi mắt đượm buồn
            Cho anh, được chạm vào, khung cửa đã cũ
            Anh bên em
            Anh nghe em
            Lời bài hát như chiếc lá rơi bên thềm ngày mùa đông
            Ngày con tim còn thương
            
            Chờ mùa hoa tới
            Chờ từng nỗi ngây ngô tuổi trẻ 
            Chờ những vòng tay chờ những con đường chờ những nụ hôn 
            Chúng ta dành hết xuân thì, để say mê đôi bờ mi
            
            Chờ mùa mưa tới
            Chờ từng giấc chiêm bao ngày hè
            Chờ những lời ru chờ những giai điệu chờ những vầng trăng
            Chúng ta dành hết xuân thì, để chờ nhau `,
            user: {
                username: 'ngocanh',
                lastLogin: '5 minutes last'
            },
            href: '/chat/ngocanh'
        },
        {
            content: 'I am an admin',
            user: {
                username: 'admin123',
                lastLogin: '<b class="text-green">online</b>'
            },
            href: '/chat/admin123'
        },
        {
            content: 'I am Harryguci',
            user: {
                username: 'harryguci',
                lastLogin: '<b class="text-green">online</b>'
            },
            href: '/chat/harryguci'
        }
    ]);

    return (
        <Fragment>
            <div className="chat-control-panel" style={style ?? {}}>
                <div className="chat-control-panel__head">
                    <div className="">
                        <h1>Chat</h1>
                        <button className="btn" style={{ padding: '0' }}>
                            Recent chat <FontAwesomeIcon icon={faAngleDown} />
                        </button>
                    </div>
                    <div className="">
                        <button className="btn bg-primary-gradient rounded-1 box-shadow-1">
                            <FontAwesomeIcon icon={faPlus} />{" "}Create New Chat
                        </button>
                    </div>
                </div>
                <SearchBox style={{ margin: '2rem 0' }}
                    searchText={search}
                    setSearchText={setSearch} />
                <div className="message-card-wrapper">
                    {messageCards.map(item =>
                        <MessageCard key={item.href} {...item} />
                    )}
                </div>
            </div>
        </Fragment>
    )
}

export default ChatControlPanel;
