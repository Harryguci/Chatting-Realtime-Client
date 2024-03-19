"use client"

import { Fragment, useEffect, useState } from "react";
import ChatFrame from "../../_components/ChatFrame";
import ChatControlPanel from "../../_components/ChatControlPanel";
import '../../_assets/scss/chat.scss';

export default function Chat({ params }: { params: { id: string } }) {
    const [friend, setFriend] = useState<string>(params.id);
    const [chatFrameWidth, setChatFrameWidth] = useState('60%');
    useEffect(() => {
        document.title = 'Chat | ' + params.id;
    }, [params.id]);

    return (
        <Fragment>
            <ChatControlPanel style={{
                flex: `0 0 ${100 - parseInt(chatFrameWidth)}%`,
                zIndex: 0,
            }} />

            {friend && <ChatFrame friend={friend} roomId={undefined}
                style={{ flex: `0 0 ${chatFrameWidth}`, zIndex: 10 }} />}
        </Fragment>
    )
}