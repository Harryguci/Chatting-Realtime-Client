import { Fragment, ReactNode, memo } from "react"

function MessageCard({ content, user }: { content: string, user: any }): ReactNode {

    return (
        <Fragment>
            <div className="card message-card">
                <div className="message-card__head">
                    <div className="message-card__head__avatar">
                        <img src={user.avatar || "cat-avatar.gif"} alt="avatar" />
                    </div>
                    <div className="message-card__head__user-info">
                        <p style={{ fontWeight: 'bold' }}>{user.username}</p>
                    </div>
                    <div className="message-card__head__state">
                        {user.lastLogin}
                    </div>
                </div>
                <div className="message-card__content">
                    <div className="message-card__content__paragraph"
                        dangerouslySetInnerHTML={{ __html: content ?? "" }}>
                    </div>
                    <span className="message-card__content__noti"></span>
                </div>
            </div>
        </Fragment>
    )
}

export default memo(MessageCard);
