'use client'

import React, { useEffect, useState } from "react";
import axios from 'axios';
import IMessage from "../_interfaces/IMessage";
import Message from './Message'
const ChatMessages: React.FunctionComponent<{
    friendUsername: string,
    currentUsername: string,
    limits: number
}> = ({ friendUsername, currentUsername, limits }) => {
    const [messages, setMessages] = useState<Array<IMessage>>([
        {
            _id: '1',
            username: 'harryguci',
            time: new Date('2023-02-23'),
            isSelf: true,
            content: 'hello world'
        },
        {
            _id: '2',
            username: 'harryguci',
            time: new Date('2023-02-23'),
            isSelf: true,
            content: 'hello world 2'
        },
        {
            _id: '3',
            username: 'ahp06',
            time: new Date('2023-02-23'),
            isSelf: true,
            content: 'Đây là Ngọc Anh'
        },
        {
            _id: '4',
            username: 'ahp06',
            time: new Date('2023-02-23'),
            isSelf: true,
            content: 'Have a nice day 😍'
        },
        {
            _id: '5',
            username: 'harryguci',
            time: new Date('2023-02-23'),
            isSelf: true,
            content: 'Love u'
        },
        
    ]);
    const [limitState, setLimitState] = useState<number>(5);

    // Fetch data
    const getMessage = async () => {
        // Will re-write with the WebSocket Protocol.
        try {
            const { data, status } = await axios.get('http://localhost:3001/messages', {
                headers: {
                    Accept: 'application/json',
                },
            });
            console.log(JSON.stringify(data));
        } catch (error) {
            // console.error(error);
        }
    }

    useEffect(() => {
        getMessage();
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
                            time={mess.time} />)
                )}
            </div>
        </div>
    );
}

export default ChatMessages;
