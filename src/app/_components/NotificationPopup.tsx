"use client"

import { Fragment, MouseEventHandler, ReactNode, memo, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import BtnCircle from "./BtnCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import '../_assets/scss/components/notification_popup.scss';
import axios from "axios";
import swal from "sweetalert";

interface IFriendRequestBtn {
    content: string,
    onclick: MouseEventHandler
}
interface INotificationPopup {
    title: string,
    content: string,
    buttons: Array<IFriendRequestBtn>
}

function NotificationPopup(): ReactNode {
    const [showMemu, setShowMenu] = useState<boolean>(false);
    const handleOnclick = useCallback(async () => {
        setShowMenu(prev => !prev);

        var token = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

        await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/FriendRequests/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resposne => {
            var data = resposne.data;
            var res: INotificationPopup[] = []

            Array.from(data).forEach((item: any, index: number) => {
                var notiItem: INotificationPopup = {
                    title: 'Yêu cầu kết bạn',
                    content: `${item.user1} đã gửi lời mời kết bạn`,
                    buttons: [{
                        content: 'Delete',
                        onclick: () => { }
                    }, {
                        content: 'Accept',
                        onclick: async () => {
                            await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/FriendRequests/${item.id}`, {
                                id: item.id,
                                user1: item.user1,
                                user2: item.user2,
                                accepted: true,
                                createAt: item.createAt
                            }, {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            })
                                .then(value => {
                                    swal({
                                        title: "Good job!",
                                        text: "You clicked the button!",
                                        icon: "success",
                                        buttons: ["Aww yiss!"],
                                    });
                                    setSizeNotis(prev => prev - 1);
                                    setNotis(prev => prev.filter(p => p !== item));
                                    setShowMenu(false);
                                }).catch(error => {
                                    console.error(error);
                                })
                        }
                    }]
                }

                res = [...res, notiItem]
            })

            setNotis(res)
        })
    }, []);

    const menuRef = useRef<HTMLDivElement>(null);
    const [notis, setNotis] = useState<INotificationPopup[]>([]);
    const [sizeNotis, setSizeNotis] = useState<number>(0);

    useLayoutEffect(() => {
        if (showMemu && menuRef.current)
            menuRef.current.style.maxHeight = '300px';
        else if (menuRef.current)
            menuRef.current.style.maxHeight = '0px';
    }, [showMemu]);
    
    useEffect(() => {
        var token = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

        axios.get(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/FriendRequests/Size`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response : any) => {
            setSizeNotis(response.data.size)
        })
        .catch(error => swal(error.message, {
            icon: 'error',
        }));
        // return setSizeNotis(0);
    }, []);

    return (
        <Fragment>
            <div className="notification-pop-up">
                <BtnCircle
                    className="bg-white"
                    onClick={handleOnclick}
                    id={undefined}
                    type={'button'}
                    style={{
                        display: 'block',
                        position: 'relative',
                        marginTop: '1rem',
                        marginRight: '1rem',
                        marginLeft: 'auto'
                    }}>
                    <FontAwesomeIcon icon={faBell} />
                    <span className="badge badge-noti">
                        <p>{sizeNotis || '0'}</p>
                    </span>
                </BtnCircle>
                <div ref={menuRef} className="notification-pop-up__menu box-shadow-1">
                    <ul>
                        {notis && notis.length > 0 && notis.map((noti, index: number) =>
                            <li key={index}>
                                <p className="notification-pop-up__title">{noti.title}</p>
                                <p className="notification-pop-up__content">{noti.content}</p>
                                {noti.buttons && noti.buttons.length > 0 && noti.buttons.map((btn, j: number) =>
                                    <button key={j} className="btn" onClick={btn.onclick}>
                                        {btn.content}
                                    </button>
                                )}
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </Fragment>
    )
}

export default memo(NotificationPopup);
