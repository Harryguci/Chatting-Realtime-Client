'use client'

import React, { useCallback } from "react";
import '../_assets/scss/components/chat_frame.scss';
import Link from "next/link";
import BtnCircle from "./BtnCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faVideo } from "@fortawesome/free-solid-svg-icons";

function ChatFrame({ style }: { style: object }) {

    const handleClickCall = useCallback(() => {
        window.alert('call btn is clicked');
    }, []);

    return (
        <React.Fragment>
            <div className="card chat-frame" style={style}>
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
                        <BtnCircle id="" className=""
                            type="button"
                            onClick={handleClickCall}>
                            <FontAwesomeIcon icon={faPhone} />
                        </BtnCircle>
                        <BtnCircle id="" className=""
                            type="button"
                            onClick={handleClickCall}>
                            <FontAwesomeIcon icon={faVideo} />
                        </BtnCircle>
                    </div>
                </div>
                <div className="chat-frame__main"></div>
                <div className="chat-frame__control"></div>
            </div>
        </React.Fragment>
    )
}

export default ChatFrame;
