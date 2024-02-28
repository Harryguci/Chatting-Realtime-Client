'use client'

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import '../_assets/scss/components/chat_frame.scss';
import Link from "next/link";
import BtnCircle from "./BtnCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile, faPaperPlane, faPhone, faPlus, faVideo } from "@fortawesome/free-solid-svg-icons";
import ChatMessages from "./ChatMessages";
import axios from "axios";

const ChatFrame: React.FunctionComponent<{ style: object | undefined }> = ({ style }) => {
    const handleClickCall = useCallback(() => {
        // window.alert('call btn is clicked');
    }, []);
    const [enableScroll, setEnableScroll] = useState(false);

    const [messageContent, setMessageContent] = useState("")
    const [limit, setLimit] = useState(15);
    const [isRequireRefreshData, setIsRequireRefreshData] = useState(true);

    const chatFrameMain = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (chatFrameMain.current)
            chatFrameMain.current.scrollTo(0, chatFrameMain.current.scrollHeight);
    }, [isRequireRefreshData]);

    useEffect(() => {
        let check = false;
        let denta = 100;

        const handler = (event: any) => {
            if (chatFrameMain && chatFrameMain.current &&
                chatFrameMain.current.scrollTop + chatFrameMain.current.clientHeight
                >= chatFrameMain.current.scrollHeight - denta) {
                setEnableScroll(true);
            }
        }

        if (!enableScroll && chatFrameMain.current) {
            check = true;
            chatFrameMain.current.addEventListener('scroll', handler);
        }

        return () => {
            if (check && chatFrameMain.current && !enableScroll) {
                chatFrameMain.current.removeEventListener('scroll', handler);
            }
        }
    }, [isRequireRefreshData]);

    const handleSendClick = async (e: any) => {
        if (e.target) e.preventDefault();

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
            if (chatFrameMain.current)
                chatFrameMain.current.scrollTo(0, chatFrameMain.current.scrollHeight)
        }
    }

    useEffect(() => {
        console.log('Enable Scroll', enableScroll);

        if (!enableScroll) return;
        if (!chatFrameMain || !chatFrameMain.current) return;
        chatFrameMain.current.addEventListener('scroll', (event: any) => {
            var h = chatFrameMain?.current?.scrollTop;
            if (h && h <= 10) {
                setLimit(prev => prev + 5);
            }
        });

        return () => {
            if (!enableScroll || !chatFrameMain || !chatFrameMain.current) return;
            chatFrameMain.current.removeEventListener('scroll', (event: any) => {
                var h = chatFrameMain?.current?.scrollTop;
                if (h && h <= 10) {
                    setLimit(prev => prev + 5);
                }
            });
        }
    }, [enableScroll]);

    return (
        <React.Fragment>
            <div className="card chat-frame" style={style ?? style}>
                <div className="chat-frame__header">
                    <div className="chat-frame__header__user">
                        <div className="chat-frame__header__user__avatar">
                            <img src="/HR-Logo-new.png" alt="username" />
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
                        <BtnCircle id="" className="bg-primary-gradient text-white"
                            type="button"
                            onClick={handleClickCall}>
                            <FontAwesomeIcon icon={faVideo} />
                        </BtnCircle>
                    </div>
                </div>
                <div className="chat-frame__main" ref={chatFrameMain}>
                    <ChatMessages friendUsername="ngocanh" currentUsername="harryguci" limits={limit} setFetching={setIsRequireRefreshData} />
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
                        <form onSubmit={handleSendClick} style={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <input className="form-control"
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
