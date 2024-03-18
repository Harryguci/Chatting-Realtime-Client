"use client"

import React, { useState } from "react";
// import ChatFrame from "../_components/ChatFrame";
import ChatControlPanel from "../_components/ChatControlPanel";
import '../_assets/scss/chat.scss';
import ChatWrapper from "../_components/ChatWrapper";
export default function Chat() {
    const [chatFrameWidth, setChatFrameWidth] = useState('0%');

    return (
        <React.Fragment>
            <ChatControlPanel style={{
                flex: `0 0 ${100 - parseInt(chatFrameWidth)}%`,
                zIndex: 0,
                height: 'max-content'
            }} />
        </React.Fragment>
    )
}