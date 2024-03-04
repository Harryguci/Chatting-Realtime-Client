'use client'

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import axios from "axios";
import '../_assets/scss/components/chat_frame.scss';
import Link from "next/link";
import BtnCircle from "./BtnCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile, faPaperPlane, faPhone, faPlus, faVideo } from "@fortawesome/free-solid-svg-icons";
import ChatMessages from "./ChatMessages";
import isHTML from "../_helper/isHtml";

const ChatFrame: React.FunctionComponent<{ style: object | undefined }> = ({ style }) => {
    const handleClickCall = useCallback(() => {
        // window.alert('call btn is clicked');
    }, []);

    const [currentUsername, setCurrentUsername] = useState('harryguci');
    const [friendUsername, setFriendUsername] = useState('ngocanh');
    const [maxSize, setMaxSize] = useState<number | null>(null);

    const [enableScroll, setEnableScroll] = useState(false);

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
            } else
                wsConnection.current?.send(JSON.stringify({
                    id: 'harryguci_ngocanh_',
                    username: 'harryguci',
                    friendUsername: 'ngocanh',
                    content: messageContent,
                    createAT: null
                }));
        }

        const { data, status } = await axios.post('https://localhost:3001/api/Messages', {
            id: 'harryguci_ngocanh_',
            username: 'harryguci',
            friendUsername: 'ngocanh',
            content: messageContent,
            createAT: null
        });

        if (data) {
            sessionStorage.setItem('update-message', 'true');
            setLimit(prev => prev + 1)
            setMessageContent('')
            setIsRequireRefreshData(true);
        }
    }

    const GetNumberOfMessage = async () => {
        const { data, status } =
            await axios.get(`https://localhost:3001/api/Messages/Count?username=${currentUsername}&friend=${friendUsername}`);
        setMaxSize(data.count);
        return data.count;
    }

    useEffect(() => {
        GetNumberOfMessage();
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
        const webSocket = new WebSocket('wss://localhost:3001/ws');

        // Connection opened
        webSocket.addEventListener("open", (event: Event) => {
            console.log('Connected to the Server');
        });

        // Listen for messages
        webSocket.addEventListener("message", (event: MessageEvent) => {
            console.log("Message from server ", event.data)
        })

        wsConnection.current = webSocket;

        return () => wsConnection.current?.close()
    }, []);

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
                            <Link href='/account/username'><p>username</p></Link>
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
                    <ChatMessages friendUsername="ngocanh"
                        currentUsername="harryguci" limits={limit}
                        setFetching={setIsRequireRefreshData} />
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
