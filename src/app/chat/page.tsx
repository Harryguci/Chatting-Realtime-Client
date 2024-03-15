"use client"

import React, { useState } from "react";
import ChatFrame from "../_components/ChatFrame";
import ChatControlPanel from "../_components/ChatControlPanel";
import '../_assets/scss/chat.scss';

export default function Chat() {
    const [chatFrameWidth, setChatFrameWidth] = useState('55%');
    return (
        <React.Fragment>
            <div className="chat-container"
                style={{ position: 'relative', height: '100%' }}>

                <ChatControlPanel style={{
                    flex: `0 0 ${100 - parseInt(chatFrameWidth)}%`,
                    zIndex: 0,
                }} />

                <ChatFrame style={{ flex: `0 0 ${chatFrameWidth}`, zIndex: 10 }} />
            </div>
        </React.Fragment>
    )
}