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
import { useRouter } from "next/navigation";
import { GlobalContext } from "../Context/store";
import Spinner from "./Spinner";
import { server } from "@/config";
import Image from "next/image";


const ChatFrame: React.FunctionComponent<{
    style: object | undefined,
    roomId: string | undefined,
    friend: string | undefined
}>
    = ({ style, roomId, friend }) => {
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
        const [roomIdState, setRoomIdState] = useState<string | undefined>(roomId);

        const [enableScroll, setEnableScroll] = useState(false);

        const [messages, setMessages] = useState<Array<IMessage>>([]);

        const [messageContent, setMessageContent] = useState<string>("")
        const [limit, setLimit] = useState<number>(15);
        const [loading, setLoading] = useState<boolean>(true);

        const chatFrameRef = useRef<HTMLDivElement | null>(null);
        const chatFrameMain = useRef<HTMLDivElement | null>(null);
        const chatFrameHeader = useRef<HTMLDivElement | null>(null);
        const chatFrameControl = useRef<HTMLDivElement | null>(null);
        const formElement = useRef<HTMLFormElement>(null);
        const wsConnection = useRef<WebSocket | null>(null);

        const handleSendClick = async (e: any) => {
            if (e) e.preventDefault();
            if (!roomIdState) return;

            if (wsConnection) {
                if (isHTML(messageContent)) {
                    // return window.alert(`${messageContent} is invalid`);
                    return swal('The content is contain HTML syntax', {
                        title: 'Error',
                        //@ts-ignore
                        buttons: {
                            Ok: 'Ok',
                        },
                        icon: 'error'
                    });
                } else {
                    wsConnection.current?.send(JSON.stringify({
                        id: '',
                        username: userData?.username,
                        roomId: roomIdState,
                        content: messageContent,
                        createAT: null
                    }));
                }
            }

            const { data, status } = await axios.post(`${server}/api/Messages`, {
                id: '',
                username: userData?.username,
                roomId: roomIdState,
                content: messageContent,
                createAT: null
            });

            setMessageContent("");
        }

        const getNumberOfMessage = async () => {
            const accessToken = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

            const { data, status } =
                await axios.get(`${server}/api/Messages/Count?roomId=room1`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
            // setIsRequireRefreshData(false);
            setMaxSize(data.count);
            return data.count;
        }

        const getMessage = async (cb: Function | undefined | null) => {
            if (!roomIdState) return;
            try {
                const accessToken = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

                const { data, status }
                    : { data: Array<IMessage>, status: number | string }
                    = await axios.get(`${server}/api/Messages/RoomId/${roomIdState}?limit=${limit}`, {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    });

                setMessages(data);
                setLoading(false);
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

            return cb && cb();
        }

        const getRoomId = async () => {
            await axios.get(`${server}/api/RoomAccounts/Friend?user1=${userData ? userData.username : JSON.parse(localStorage.getItem('currentUser') ?? "{}").username}&user2=${friend}`)
                .then(response => {
                    setRoomIdState(response.data.id);
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
            if (!roomId)
                getRoomId();

            getNumberOfMessage();
            getMessage(null);
        }, [limit, roomIdState, roomId]);

        useEffect(() => {
            if (!enableScroll || !chatFrameMain || !chatFrameMain.current)
                return;

            const handle = async (event: any) => {
                var h = chatFrameMain?.current?.scrollTop;
                if (h !== undefined && h <= 10) {
                    setLimit(prev => (!maxSize || prev <= maxSize) ? prev + 5 : prev);
                }
            }

            chatFrameMain.current.onscroll = handle;

            return () => {
                if (chatFrameMain.current)
                    chatFrameMain.current.onscroll = () => { }
            }
        }, [chatFrameMain.current, maxSize]);

        //
        // WebSocket Configuration:
        //
        useEffect(() => {
            const token = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

            const webSocket = new WebSocket(`${process.env.NEXT_PUBLIC_SOCKET_URI}/ws?token=${token}`);

            // Connection opened
            // webSocket.addEventListener("open", (event: Event) => {
            //     console.log('Connected to the Server');
            // });

            webSocket.onopen = () => console.log('Connected to the Server');

            const HandleReceiveMessage = async (event: MessageEvent) => {
                var data: any = null;

                try {
                    data = JSON.parse(event.data);
                }
                catch (exception: any) {
                    // console.error(exception.message);
                    return;
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

        //
        //  Handle UI
        //
        useLayoutEffect(() => {
            if (chatFrameMain && chatFrameMain.current) {
                // Scroll to the bottom of the list of messages 
                chatFrameMain.current.scrollTo(0, chatFrameMain.current.scrollHeight);

                // Adding the show animation
                chatFrameMain.current.style.animationName = 'showChatFrameMain';
            }

            // Enable auto refresh data when the user scroll to the top of the list of messages
            setEnableScroll(true);
        }, [messages, chatFrameMain.current])

        //
        // Handle UI when the user change the size of the window 
        //
        useLayoutEffect(() => {
            const handler = (event: any) => {
                if (chatFrameMain && chatFrameMain.current)
                    chatFrameMain.current.style.height = (chatFrameRef.current?.clientHeight ?? 0)
                        - (chatFrameHeader.current?.offsetHeight ?? 0)
                        - (chatFrameControl.current?.offsetHeight ?? 0) + 'px';
            }


            handler(null);

            window.onresize = handler;
            window.onload = handler;

            return () => {
                window.onresize = () => { }
                window.onload = () => { }
            }
        }, [chatFrameMain])

        return (
            <React.Fragment>
                <div className="card chat-frame" ref={chatFrameRef} style={style ?? style}>
                    {<Spinner style={loading ? { opacity: '1' } : { opacity: '0' }} />}

                    <div className="chat-frame__header" ref={chatFrameHeader}>
                        <div className="chat-frame__header__user">
                            <div className="chat-frame__header__user__avatar">
                                <Image width={0}
                                    height={0}
                                    sizes="100vw"
                                    style={{ width: '100%', height: 'auto' }}
                                    src="/cat-avatar.gif"
                                    blurDataURL="/cat-avatar-blur.png"
                                    placeholder="blur"
                                    alt="username" />
                            </div>
                            <div className="chat-frame__header__user__info">
                                <Link href={`/account/${friend}`}>
                                    <p>{friend || 'username'}</p>
                                </Link>
                                <small>last online 5 hours ago</small>
                            </div>
                        </div>
                        <div className="chat-frame__header__contact">
                            <BtnCircle id="" className="bg-white-smoke"
                                type="button"
                                onClick={handleClickCall}
                                style={loading ? { width: '50px', height: '50px' } : undefined}>
                                <FontAwesomeIcon icon={faPhone} />
                            </BtnCircle>
                            <BtnCircle
                                id=""
                                className="bg-primary-gradient text-white"
                                type="button"
                                onClick={handleClickCall}
                                style={loading ? { width: '50px', height: '50px' } : undefined}>
                                <FontAwesomeIcon icon={faVideo} />
                            </BtnCircle>
                        </div>
                    </div>
                    <div className="chat-frame__main" ref={chatFrameMain}>
                        <ChatMessages
                            friendUsername={friend ?? ""}
                            currentUsername={userData?.username || ""}
                            messages={messages} />
                    </div>
                    <div className="chat-frame__control" ref={chatFrameControl}>
                        <div className="chat-frame__control__left-action">
                            <BtnCircle
                                id={'chat-frame__control__left-action__more-btn'}
                                className={undefined}
                                type={'button'}
                                style={{ width: 'auto', height: '100%' }}
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
                                style={{ width: 'auto', height: '100%' }}
                                type={'button'}>
                                <FontAwesomeIcon icon={faFaceSmile} />
                            </BtnCircle>
                            <BtnCircle
                                className={undefined}
                                onClick={handleSendClick}
                                id={'chat-frame__control__right-action__icon'}
                                style={{ width: 'auto', height: '100%' }}
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
