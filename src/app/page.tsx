"use client"
import Link from "next/link";
import { useEffect, ReactNode } from "react";

export default function Home(): ReactNode {
  useEffect(() => {
    document.title = 'Home page';
  }, []);

  return (
    <main>
      <div className="d-flex" style={{ gap: '5px' }}>
        <Link className="btn" href="/dashboard">Dashboard</Link>
        <Link className="btn" href="/chat">Chat</Link>
      </div>
    </main>
  );
}
