import { useState, useEffect, useRef, memo } from "react";
import '../_assets/scss/components/message_component.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import FormatTime from "../_helper/FormatTime";
import Image from "next/image";

function Message({ type, username, content, time }
    : {
        type: 'left' | 'right', username: string | undefined,
        content: string | undefined,
        time: string | Date | undefined,
    }): React.ReactElement {

    const [className, setClassName] = useState(['card', 'message-component'])
    const [showInfo, setShowInfo] = useState(false);

    const timeElement: any = useRef(null);
    const usernameElement: any = useRef(null);
    const showMoreBtn: any = useRef(null);
    const showMoreBtnIcon: any = useRef(null);
    const submenuControl: any = useRef(null);

    const messageElement: any = useRef(null);


    useEffect(() => {
        if (type) {
            setClassName(['card', 'message-component', type])
        }
    }, [type]);

    useEffect(() => {
        if (showInfo && timeElement && timeElement.current) {
            timeElement.current.style.maxHeight = '50px';
        }
        else if (timeElement && timeElement.current) {
            timeElement.current.style.maxHeight = '0px';
        }

        // if (showInfo && usernameElement && usernameElement.current) {
        //     usernameElement.current.style.maxHeight = '50px';
        // }
        // else if (usernameElement && usernameElement.current) {
        //     usernameElement.current.style.maxHeight = '0px';
        // }

        if (showInfo && showMoreBtn && showMoreBtn.current) {
            showMoreBtn.current.style.maxHeight = '50px';
        }
        else if (showMoreBtn && showMoreBtn.current) {
            showMoreBtn.current.style.maxHeight = '0px';
        }

        if (showInfo && submenuControl && submenuControl.current) {
            submenuControl.current.style.maxHeight = '500px';
        }
        else if (submenuControl && submenuControl.current) {
            submenuControl.current.style.maxHeight = '0px';
        }
    }, [showInfo])

    const handleClick = (event: any) => {
        if (![showMoreBtn?.current,
        showMoreBtnIcon?.current,
        submenuControl?.current].includes(event.target))
            setShowInfo(prev => !prev);
    }

    const handleMoreBtnClick = (event: any) => {
        event.preventDefault();
        console.log('Btn click');
    }

    const handleDelBtnClick = (event: any) => {
        if (messageElement?.current) {
            messageElement.current.style.maxHeight = '0px';
        }
    }

    return (
        <div ref={messageElement} style={{ overflow: 'hidden' }}
            className={className?.length > 0 ? className.join(' ') : 'card message-component'}
            onClick={handleClick}>
            <div className="message-component__avatar">
                <Image width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }}
                    src="/cat-avatar.gif" alt="avatar"
                    blurDataURL="/cat-avatar-blur.png"
                    placeholder="blur" />
            </div>
            <div className="message-component__main">
                <small ref={usernameElement}
                    className="message-component__username"
                    style={{ display: 'block', overflow: 'hidden' }}>
                    {username}
                </small>
                <p className="message-component__content" style={{ whiteSpace: 'pre-wrap' }}
                    dangerouslySetInnerHTML={{ __html: content ?? "" }} />
                <small ref={timeElement}
                    style={{ display: 'block', overflow: 'hidden' }}>
                    {time ? FormatTime(time.toString()) : ''}
                </small>
                <button ref={showMoreBtn}
                    style={{ display: 'block', overflow: 'hidden', padding: '0' }}
                    className="btn message-component__show-more-btn"
                    onClick={handleMoreBtnClick}>
                    <FontAwesomeIcon ref={showMoreBtnIcon}
                        icon={faCaretDown} />
                </button>
                <div ref={submenuControl}
                    className="message-component__submenu-control">
                    <ul>
                        <li>
                            <button className="btn">Edit</button>
                        </li>
                        <li>
                            <button className="btn" onClick={handleDelBtnClick}>Delete</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default memo(Message);
