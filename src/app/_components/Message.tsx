import React from "react";
import '../_assets/scss/components/message_component.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
function FormatTime(time: string): string {
    let str = time;
    str = str.replace('T', ' ').substring(0, 16);

    return str;
}
function Message({ type, username, content, time }
    : {
        type: 'left' | 'right', username: string | undefined,
        content: string | undefined,
        time: string | Date | undefined,
    }): React.ReactElement {

    const [className, setClassName] = React.useState(['card', 'message-component'])
    const [showInfo, setShowInfo] = React.useState(false);

    const timeElement: any = React.useRef(null);
    const usernameElement: any = React.useRef(null);
    const showMoreBtn: any = React.useRef(null);
    const showMoreBtnIcon: any = React.useRef(null);
    const submenuControl: any = React.useRef(null);

    const messageElement: any = React.useRef(null);


    React.useEffect(() => {
        if (type) {
            setClassName(['card', 'message-component', type])
        }
    }, [type]);

    React.useEffect(() => {
        if (showInfo && timeElement && timeElement.current) {
            timeElement.current.style.maxHeight = '50px';
        }
        else if (timeElement && timeElement.current) {
            timeElement.current.style.maxHeight = '0px';
        }

        if (showInfo && usernameElement && usernameElement.current) {
            usernameElement.current.style.maxHeight = '50px';
        }
        else if (usernameElement && usernameElement.current) {
            usernameElement.current.style.maxHeight = '0px';
        }

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
                <img src="/HR-Logo-new.png" alt="avatar" />
            </div>
            <div className="message-component__main">
                <small ref={usernameElement}
                    className="message-component__username"
                    style={{ display: 'block', overflow: 'hidden' }}>
                    {username}
                </small>
                <p className="message-component__content" dangerouslySetInnerHTML={{ __html: content ?? "" }} />
                <small ref={timeElement}
                    style={{ display: 'block', overflow: 'hidden' }}>
                    {/* {time?.toLocaleString()} */}
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

export default React.memo(Message);
