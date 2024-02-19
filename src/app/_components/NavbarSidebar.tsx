'use client'

import React from "react";
import Link from "next/link";
import '../_assets/scss/components/navbar_sidebar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { useRouter, usePathname } from "next/navigation";
export default function NavbarSidebar() {
    const pathname = usePathname();

    return (
        <React.Fragment>
            <nav className="navbar-sidebar">
                <div className="user-info">
                    <div className="thumbnail user-info__avatar-thumb">
                        <img src="/HR-Logo-new.png" alt="avatar" />
                    </div>
                    <div className="user-info__description">
                        <p className="text-center text-bold">
                            <Link href={'/#username'} className="d-flex" style={{ justifyContent: 'center', gap: '5px' }}>Username
                                <FontAwesomeIcon icon={faArrowDown} style={{ width: '15px' }} />
                            </Link>
                        </p>
                    </div>
                </div>
                <ul className="nav">
                    <li className={pathname === '/' ? "nav__item active" : 'nav__item'}>
                        <Link href='/'>Home</Link>
                    </li>
                    <li className={pathname === '/dashboard' ? "nav__item active" : 'nav__item'}>
                        <Link href='/dashboard'>Dashboard</Link>
                    </li>
                    <li className={pathname === '/chat' ? "nav__item active" : 'nav__item'}>
                        <Link href='/chat'>Chat</Link>
                    </li>
                    <li className={pathname === '/setting' ? "nav__item active" : 'nav__item'}>
                        <Link href='/setting'>Setting</Link>
                    </li>
                </ul>

                <div className="control-panel" style={{ marginBottom: '0', marginTop: 'auto' }}>
                    <Link href={'/#logout'} className="btn">Logout</Link>
                </div>
            </nav>
        </React.Fragment>
    )
}