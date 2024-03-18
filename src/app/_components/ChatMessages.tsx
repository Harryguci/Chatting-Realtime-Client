import React, { memo, useEffect, useState } from "react";
import IMessage from "../_interfaces/IMessage";
import Message from './Message'
const ChatMessages: React.FunctionComponent<{
    friendUsername: string,
    currentUsername: string,
    messages: Array<IMessage>,
    setMessages: Function
}> = ({ friendUsername, currentUsername, messages, setMessages }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const LoadingElement = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (LoadingElement && LoadingElement.current) {
            LoadingElement.current.style.maxHeight = isLoading ? '200px' : '0px';
        }
    }, [isLoading, LoadingElement])

    return (
        <div>
            <div className="chat-message" style={{ position: 'relative' }}>
                <p ref={LoadingElement} style={{
                    fontSize: '1rem',
                    overflow: 'hidden',
                    display: 'block',
                    transition: 'all 1s ease-in-out'
                }}>Loading...</p>
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
