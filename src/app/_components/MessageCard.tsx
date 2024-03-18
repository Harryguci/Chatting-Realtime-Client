import { Fragment, ReactNode, memo, useEffect } from "react"
import '../_assets/scss/components/message_card.scss';
import { useRouter } from "next/navigation";
import { useRef } from "react";
function MessageCard({ content, user, href }: { content: string, user: any, href: string }): ReactNode {
    const cardRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        if (cardRef != null && cardRef.current != null) {
            cardRef.current.onclick = () => {
                router.push(href);
            };
        }

        return () => {
            if (cardRef != null && cardRef.current != null)
                cardRef.current.onclick = () => { };
        }
    }, [cardRef.current]);

    return (
        <Fragment>
            <div ref={cardRef} className="card message-card box-shadow-1">
                <div className="message-card__head">
                    <div className="message-card__head__avatar">
                        <img src={user.avatar || "/cat-avatar.gif"} alt="avatar" />
                    </div>
                    <div className="message-card__head__user-info">
                        <p className="text-blue" style={{ fontWeight: 'bold' }}>{user.username}</p>
                    </div>
                    <div className="message-card__head__state" dangerouslySetInnerHTML={{ __html: user.lastLogin }}></div>
                </div>
                <div className="message-card__content">
                    <div className="message-card__content__paragraph" style={{ whiteSpace: 'pre-wrap' }}
                        dangerouslySetInnerHTML={{ __html: content.substring(0, 200).concat('...') ?? "" }}>
                    </div>
                    <span className="message-card__content__noti">3</span>
                </div>
            </div>
        </Fragment>
    )
}

export default memo(MessageCard);
