'use client'
import { useEffect } from "react"

export default function Template({ children }: { children: React.ReactNode }) {

    useEffect(() => {
        document.title = 'Chat page';
    }, []);

    return <div style={{ position: 'relative', height: '100%', background: '#ffffff' }}>
        {children}
    </div>
}