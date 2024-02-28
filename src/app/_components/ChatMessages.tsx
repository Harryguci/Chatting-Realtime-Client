'use client'

import React, { useEffect, useState } from "react";
import axios from 'axios';
import IMessage from "../_interfaces/IMessage";
import Message from './Message'
const ChatMessages: React.FunctionComponent<{
    friendUsername: string,
    currentUsername: string,
    limits: number,
    setFetching: Function
}> = ({ friendUsername, currentUsername, limits, setFetching }) => {
    const [messages, setMessages] = useState<Array<IMessage>>([]);
    const [limitState, setLimitState] = useState<number>(limits ? limits : 10);
    const [isRemain, setIsRemain] = useState<boolean>(true);

    // Get the messages data
    const getMessage = async (cb: Function) => {
        try {
            const { data, status }
                : { data: Array<IMessage>, status: number | string }
                = await axios.get(`https://localhost:3001/api/Messages?username=harryguci&friend=${friendUsername}&limits=${limitState}`, {
                    headers: {
                        'accessToken': currentUsername
                    }
                });

            setMessages(data);

            if (data.length >= limitState) {
                setFetching((prev: Boolean) => prev ? !prev : prev);
            }
            else
                setIsRemain(false);
        } catch (error) {
            window.alert(error);
        }

        return cb();
    }

    useEffect(() => {
        if (isRemain)
            setLimitState(limits);
    }, [limits]);

    useEffect(() => {
        console.log(`[Update Messages with limits = ${limits}]`);
        getMessage(() => {
            console.log('[DONE GET MESSAGE]');
        });

    }, [limitState]);

    return (
        <div>
            <div className="chat-message">
                {messages?.length > 0 && (
                    messages.map((mess: IMessage, index: number) =>
                        <Message
                            key={index}
                            type={mess.username === friendUsername ? "left" : 'right'}
                            username={mess.username}
                            content={mess.content}
                            time={mess.createAt} />)
                )}
                {messages?.length === 0 && (
                    <p className="center">Loading...</p>
                )}
            </div>
        </div>
    );
}

export default ChatMessages;
