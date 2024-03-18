"use client"

import React, { useState } from "react";
import ChatControlPanel from "../_components/ChatControlPanel";
import '../_assets/scss/chat.scss';
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