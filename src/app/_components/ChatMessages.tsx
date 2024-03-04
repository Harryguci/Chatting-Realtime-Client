import React, { memo, useEffect, useState } from "react";
import axios from 'axios';
import IMessage from "../_interfaces/IMessage";
import Message from './Message'
const ChatMessages: React.FunctionComponent<{
    friendUsername: string,
    currentUsername: string,
    limits: number,
    setFetching: Function,
}> = ({ friendUsername, currentUsername, limits, setFetching }) => {
    const [messages, setMessages] = useState<Array<IMessage>>([]);
    // const [isRemainState, setIsRemainState] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const LoadingElement = React.useRef<HTMLDivElement>(null);

    // Get the messages data
    const Loading = React.useCallback(() => {
        return (
            <div className="loading"
                style={{
                    position: 'relative',
                    top: 10 + 'px',
                    left: 10 + 'px',
                    fontSize: '2rem',
                    overflow: 'hidden',
                    maxHeight: (isLoading ? 'auto' : '0'),
                    transition: 'all 0.5s ease-in-out'
                }}>
                Loading...
            </div>
        )
    }, [isLoading])
    const getMessage = async (cb: Function) => {
        try {
            console.log('[Get Message]');

            const { data, status }
                : { data: Array<IMessage>, status: number | string }
                = await axios.get(`https://localhost:3001/api/Messages?username=harryguci&friend=${friendUsername}&limits=${limits}`, {
                    headers: {
                        'accessToken': currentUsername
                    }
                });

            setMessages(data);

            if (data.length >= limits) {
                setFetching((prev: Boolean) => prev ? !prev : prev);
            }

        } catch (error) {
            window.alert(error);
        }

        return cb();
    }

    useEffect(() => {
        console.log('[Set Loading True]');
        
        setIsLoading(true);
        getMessage(() => {
            console.log('[Set Loading False]');
            setIsLoading(false);
        });
    }, [limits]);

    useEffect(() => {
        if (LoadingElement && LoadingElement.current) {
            LoadingElement.current.style.maxHeight = isLoading ? '200px' : '0px';
        }
    }, [isLoading, LoadingElement])

    return (
        <div>
            <div className="chat-message" style={{ position: 'relative' }}>
                <p ref={LoadingElement} style={{
                    fontSize: '5rem',
                    overflow: 'hidden',
                    display: 'block',
                    transition: 'all 1s ease-in-out'
                }}>Loading...</p>
                {messages?.length > 0 && (
                    messages.map((mess: IMessage, index: number) =>
                        <Message
                            key={index}
                            type={mess.username === friendUsername ? "left" : 'right'}
                            username={mess.username}
                            content={mess.content}
                            time={mess.createAt} />)
                )}
            </div>
        </div>
    );
}

export default memo(ChatMessages);
