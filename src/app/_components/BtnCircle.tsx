'use client'

import { MouseEventHandler, ReactNode, memo, useState } from "react";
import '../_assets/scss/components/btn_circle.scss';
import IBtnCircle from "../_interfaces/IButtonCircle";;

function BtnCircle({ onClick, className, id, type, children }: {
    onClick: MouseEventHandler | undefined,
    className: string | undefined,
    id: string | undefined,
    type: 'button' | 'reset' | 'submit' | undefined,
    children: any
}) {
    const [classNameState] = useState(className ? 'btn btn_circle' + className : 'btn btn_circle');
    return (
        <button
            id={id ? id : ''}
            type={type ? type : 'button'}
            className={classNameState}
            onClick={onClick}>
            {children}
        </button>
    )
}

export default memo(BtnCircle);
