import { memo } from "react";

function BackgroundDark({ onClick, style }: { onClick: any, style: any }) {
    return (
        <div className="bg-dark" onClick={onClick}
            style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.2)', ...style }}></div>
    )
}

export default memo(BackgroundDark);
