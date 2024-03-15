'use client'

import React, { useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import axios from "axios";
import '../_assets/scss/components/chat_frame.scss';
import Link from "next/link";
import BtnCircle from "./BtnCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile, faPaperPlane, faPhone, faPlus, faVideo } from "@fortawesome/free-solid-svg-icons";
import ChatMessages from "./ChatMessages";
import isHTML from "../_helper/isHtml";
import swal from 'sweetalert';
import IMessage from "../_interfaces/IMessage";
import IAccount from "../_interfaces/IAccount";
import { useRouter } from "next/navigation";
import { GlobalContext } from "../Context/store";

const ChatFrame: React.FunctionComponent<{ style: object | undefined }> = ({ style }) => {
    const router = useRouter();
    const { data: userData } = useContext(GlobalContext);

    const handleClickCall = useCallback(() => {
        swal({
            title: "Good job!",
            text: "You clicked the button!",
            icon: "error",
            buttons: ["Aww yiss!"],
        });
    }, []);

    const [maxSize, setMaxSize] = useState<number | null>(null);

    const [enableScroll, setEnableScroll] = useState(false);

    const [messages, setMessages] = useState<Array<IMessage>>([]);

    const [messageContent, setMessageContent] = useState("")
    const [limit, setLimit] = useState(15);
    const [isRequireRefreshData, setIsRequireRefreshData] = useState(true);

    const chatFrameMain = useRef<HTMLDivElement | null>(null);
    const formElement = useRef<HTMLFormElement>(null);
    const wsConnection = useRef<WebSocket | null>(null);

    const handleSendClick = async (e: any) => {
        if (e) e.preventDefault();
        if (wsConnection) {
            if (isHTML(messageContent)) {
                return window.alert(`${messageContent} is invalid`);
            } else {
                wsConnection.current?.send(JSON.stringify({
                    id: 'harryguci_ngocanh_',
                    username: 'harryguci',
                    roomId: 'room1',
                    content: messageContent,
                    createAT: null
                }));
            }
        }

        const { data, status } = await axios.post('https://localhost:3001/api/Messages', {
            id: 'harryguci_ngocanh_',
            username: 'harryguci',
            roomId: 'room1',
            content: messageContent,
            createAT: null
        });

        setMessageContent("");
    }

    const GetNumberOfMessage = async () => {
        const accessToken = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

        const { data, status } =
            await axios.get(`https://localhost:3001/api/Messages/Count?roomId=room1`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

        setMaxSize(data.count);
        return data.count;
    }

    const GetMessage = async (cb: Function) => {
        try {
            const accessToken = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

            const { data, status }
                : { data: Array<IMessage>, status: number | string }
                = await axios.get(`https://localhost:3001/api/Messages/RoomId/room1`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

            setMessages(data);

            if (data.length >= limit) {
                setIsRequireRefreshData((prev: Boolean) => prev ? !prev : prev);
            }

        } catch (error: any) {
            if (error.response.status === 401) {
                swal({
                    title: "Error!",
                    text: 'Bạn phải đăng nhập để xem',
                    icon: "error",
                    buttons: ["Try later!"],
                });

                router.push('/auth/login')
            } else {
                swal({
                    title: "Error!",
                    text: error.message,
                    icon: "error",
                    buttons: ["Try later!"],
                });
            }
        }

        return cb();
    }

    useEffect(() => {
        GetNumberOfMessage();
        GetMessage(() => console.log("Get Message Successfully!!"));
    }, []);

    useLayoutEffect(() => {
        chatFrameMain.current?.scrollTo(0, chatFrameMain.current.clientHeight);
        setEnableScroll(true);
    }, [isRequireRefreshData]);

    useEffect(() => {
        if (!enableScroll || !chatFrameMain || !chatFrameMain.current)
            return;

        const handle = async (event: any) => {
            var h = chatFrameMain?.current?.scrollTop;
            if (h && h <= 10) {
                setLimit(prev => (!maxSize || prev <= maxSize) ? prev + 5 : prev);
            }
        }

        chatFrameMain.current.addEventListener('scroll', handle);

        return () => {
            if (enableScroll)
                chatFrameMain.current?.removeEventListener('scroll', handle);
        }
    }, [enableScroll, chatFrameMain, maxSize]);

    // WebSocket Configuration:
    useEffect(() => {
        var token = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

        const webSocket = new WebSocket(`wss://localhost:3001/ws?token=${token}`);

        // Connection opened
        webSocket.addEventListener("open", (event: Event) => {
            console.log('Connected to the Server');
        });

        const HandleReceiveMessage = async (event: MessageEvent) => {
            var data: any = null;

            try {
                data = JSON.parse(event.data);
            }
            catch (exception: any) {
                console.error(exception.message);
            }
            if (data == null) return;

            if (data.type === "message") {
                setMessages(prev => {
                    var newMessage: IMessage = {
                        _id: data.id,
                        username: data.username,
                        content: data.content,
                        createAt: data.createAt,
                        isSelf: data.username === userData?.username
                    };
                    console.log('[New Message]', newMessage);

                    return [...prev, newMessage];
                });
            }
        }

        // Listen for messages
        webSocket.onmessage = HandleReceiveMessage;

        wsConnection.current = webSocket;

        return () => {
            wsConnection.current?.close();
        }
    }, []);

    useLayoutEffect(() => {
        chatFrameMain.current?.scrollTo(0, chatFrameMain.current.clientHeight);
    }, [messages])

    return (
        <React.Fragment>
            <div className="card chat-frame" style={style ?? style}>
                <div className="chat-frame__header">
                    <div className="chat-frame__header__user">
                        <div className="chat-frame__header__user__avatar">
                            <img src="https://th.bing.com/th/id/R.1af6278b2f245eff29006e6b351de3a5?rik=WTJmHheK8s9BgA&riu=http%3a%2f%2f3.bp.blogspot.com%2f-JR6q_p0lRIc%2fUTop3JjaOXI%2fAAAAAAAAA0w%2f4hho4JbJc70%2fs1600%2fcats-art-prints.gif&ehk=Pb9b3kn7k0p6fY12uhAPsvnw9HKdfXA4umk5FmlPUUA%3d&risl=&pid=ImgRaw&r=0"
                                alt="username" />
                        </div>
                        <div className="chat-frame__header__user__info">
                            <Link href='/account/username'>
                                <p>{userData?.username || 'username'}</p>
                            </Link>
                            <small>last online 5 hours ago</small>
                        </div>
                    </div>
                    <div className="chat-frame__header__contact">
                        <BtnCircle id="" className="bg-white-smoke"
                            type="button"
                            onClick={handleClickCall}>
                            <FontAwesomeIcon icon={faPhone} />
                        </BtnCircle>
                        <BtnCircle
                            id=""
                            className="bg-primary-gradient text-white"
                            type="button"
                            onClick={handleClickCall}>
                            <FontAwesomeIcon icon={faVideo} />
                        </BtnCircle>
                    </div>
                </div>
                <div className="chat-frame__main" ref={chatFrameMain}>
                    <ChatMessages
                        friendUsername="ngocanh"
                        currentUsername="harryguci" limits={limit}
                        setFetching={setIsRequireRefreshData}
                        messages={messages}
                        setMessages={setMessages} />
                </div>
                <div className="chat-frame__control">
                    <div className="chat-frame__control__left-action">
                        <BtnCircle
                            id={'chat-frame__control__left-action__more-btn'}
                            className={undefined}
                            type={'button'}
                            onClick={undefined}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </BtnCircle>
                        <div className="chat-frame__control__left-action__submenu"></div>
                    </div>
                    <div className="chat-frame__control__chat-container">
                        <form ref={formElement} onSubmit={handleSendClick}
                            style={{
                                display: 'flex',
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <input
                                className="form-control"
                                type="text"
                                name="input_message"
                                id="input_message"
                                placeholder="Type a messsage here"
                                value={messageContent}
                                onChange={e => setMessageContent(e.target.value)} />
                        </form>
                    </div>
                    <div className="chat-frame__control__right-action">
                        <BtnCircle
                            className={undefined}
                            onClick={undefined}
                            id={'chat-frame__control__right-action__icon'}
                            type={'button'}>
                            <FontAwesomeIcon icon={faFaceSmile} />
                        </BtnCircle>
                        <BtnCircle
                            className={undefined}
                            onClick={handleSendClick}
                            id={'chat-frame__control__right-action__icon'}
                            type={'button'}>
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </BtnCircle>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ChatFrame;
