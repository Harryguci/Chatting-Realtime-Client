import React, { useEffect, useState } from "react";
import axios from 'axios';

export interface Message {
    _id: string,
    username: string,
    time: string | Date,
    isSelf: boolean,
    content: string
}

const ChatMessages: React.FunctionComponent<{ username1: string, username2: string, limits: number }> = ({ username1, username2, limits }) => {
    const [messages, setMessages] = useState<Array<Message>>([]);
    const [limitState, setLimitState] = useState<number>(5);

    // Fetch data
    const getMessage = async () => {
        // Will re-write with the WebSocket Protocol.
        const { data, status } = await axios.get('http://localhost:3001/messages', {
            headers: {
                Accept: 'application/json',
            },
        },);

        console.log(JSON.stringify(data));
    }

    useEffect(() => {
        getMessage();
    }, [limitState]);

    return (
        <div>
            <ul>
                {messages && messages.length > 0 && (
                    messages.map((mess: Message, index: number) =>
                        <li className="" key={mess._id}>{mess.username}<br />{mess.content}</li>)
                )}
            </ul>
        </div>
    );
}

export default ChatMessages;
