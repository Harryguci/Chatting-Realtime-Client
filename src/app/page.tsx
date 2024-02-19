import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="d-flex" style={{ gap: '5px' }}>
        <Link className="btn" href="/dashboard">Dashboard</Link>
        <Link className="btn" href="/chat">Chat</Link>
      </div>
    </main>
  );
}
