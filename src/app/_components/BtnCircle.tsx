'use client'

import { MouseEventHandler, memo, useState } from "react";
import '../_assets/scss/components/btn_circle.scss';

function BtnCircle({ onClick, className, id, type, children, ref, style }: {
    onClick: MouseEventHandler | undefined,
    className: string | undefined,
    id: string | undefined,
    type: 'button' | 'reset' | 'submit' | undefined,
    children: any,
    ref: any,
    style: any
}) {
    const [classNameState] = useState<string>(className ? 'btn btn_circle ' + className : 'btn btn_circle');
    return (
        <button
            ref={ref}
            id={id ? id : ''}
            style={style}
            className={classNameState}
            type={type ? type : 'button'}
            onClick={onClick}>
            {children}
        </button>
    )
}

export default memo(BtnCircle);
