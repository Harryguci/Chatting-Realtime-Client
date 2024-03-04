'use client'

import { MouseEventHandler, ReactNode, memo, useState } from "react";
import '../_assets/scss/components/btn_circle.scss';
import IBtnCircle from "../_interfaces/IButtonCircle";;

function BtnCircle({ onClick, className, id, type, children, ref }: {
    onClick: MouseEventHandler | undefined,
    className: string | undefined,
    id: string | undefined,
    type: 'button' | 'reset' | 'submit' | undefined,
    children: any,
    ref: any
}) {
    const [classNameState] = useState(className ? 'btn btn_circle ' + className : 'btn btn_circle');
    return (
        <button
            ref={ref}
            id={id ? id : ''}
            className={classNameState}
            type={type ? type : 'button'}
            onClick={onClick}>
            {children}
        </button>
    )
}

export default memo(BtnCircle);
