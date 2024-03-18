import { memo } from "react";

function Button(props: any) {
    const className = props.className ? `btn ${props.className}` : 'btn';
        
    return (
        <button className={className}
            {...props}>{props.children}
        </button>
    )
}

export default memo(Button);
