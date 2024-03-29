import { ReactNode } from "react"
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Chat page",
    description: "Generated by create next app",
};

export default function Template({ children }: { children: ReactNode }) {
    return <div style={{ position: 'relative', height: '100%', background: '#ffffff' }}>
        <div className="chat-container"
            style={{ position: 'relative', height: '100vh', overflowY: 'auto' }}>
            {children}
        </div>
    </div>
}