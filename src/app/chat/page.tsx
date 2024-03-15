"use client"

import React from "react";
import ChatFrame from "../_components/ChatFrame";

export default function Chat() {
    return (
        <React.Fragment>
            <div className="chat-container"
                style={{ position: 'relative', height: '100%' }}>
                <ChatFrame style={undefined} />
            </div>
        </React.Fragment>
    )
}