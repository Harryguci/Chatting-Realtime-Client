import { MouseEventHandler } from "react"; }

export default interface IBtnCircle {
    onClick: MouseEventHandler | undefined,
    className: string | undefined,
    id: string | undefined,
    type: 'button' | 'reset' | 'submit' | undefined,
}