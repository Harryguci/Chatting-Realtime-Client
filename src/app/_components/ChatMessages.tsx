import React, { memo, useEffect, useState } from "react";
import IMessage from "../_interfaces/IMessage";
import Message from './Message'
const ChatMessages: React.FunctionComponent<{
    friendUsername: string,
    currentUsername: string,
    messages: Array<IMessage>,
}> = ({ friendUsername, currentUsername, messages }) => {
    return (
        <div>
            <div className="chat-message" style={{ position: 'relative' }}>
                {messages?.length > 0 && (
                    messages.map((mess: IMessage, index: number) =>
                        <Message
                            key={index}
                            type={mess.username === currentUsername ? "right" : 'left'}
                            username={mess.username}
                            content={mess.content}
                            time={mess.createAt} />)
                )}
            </div>
        </div>
    );
}

export default memo(ChatMessages);
