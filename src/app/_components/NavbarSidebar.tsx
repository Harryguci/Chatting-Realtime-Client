'use client'

import React, { useEffect, useLayoutEffect } from "react";
import Link from "next/link";
import '../_assets/scss/components/navbar_sidebar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { usePathname } from "next/navigation";

interface NavbarItem {
    href: string | undefined | null,
    children: React.FunctionComponent | any,
    prop: object | null | undefined
}

export default function NavbarSidebar() {
    const pathname: string | null = usePathname();
    const navSlider = React.useRef<HTMLLIElement>(null);
    const [navState, setNavState] = React.useState<Array<NavbarItem>>([
        {
            href: '/',
            children: <Link href='/'>Home</Link>,
            prop: {
                className: 'nav__item'
            },
        },
        {
            href: '/dashboard',
            children: <Link href='/dashboard'>Dashboard</Link>,
            prop: {
                className: 'nav__item'
            },
        },
        {
            href: '/chat',
            children: <Link href='/chat'>Chat</Link>,
            prop: {
                className: 'nav__item'
            },
        },
        {
            href: '/setting',
            children: <Link href='/setting'>Setting</Link>,
            prop: {
                className: 'nav__item'
            },
        }
    ]);

    const navElement = React.useRef<HTMLUListElement>(null);

    useLayoutEffect(() => {
        let indexCurrent = -1;
        navState.forEach((item, index) => {
            if (item.href === pathname)
                indexCurrent = index
            navElement.current?.children[index].classList.remove('active');
        });

        navElement.current?.children[indexCurrent].classList.add('active');
    }, [pathname])

    useEffect(() => {
        const page: string | null = pathname;
        sessionStorage.setItem('current-page', pathname ?? "")

        if (navSlider && navSlider.current) {
            const navItem = document.querySelector('nav .nav__item');
            var style = null
            if (navItem)
                style = window.getComputedStyle(navItem);

            if (style) {
                navSlider.current.style.height = style.height;
                console.log(`set navslider's height = ${style.height}px`);
            }
        }

        if (page) {
            var currentPageIndex: number = -1;

            navState.forEach((item, index) => {
                if (item.href === page)
                    currentPageIndex = index;
                return item;
            });

            if (style && navSlider.current) {
                var item: any = navElement.current?.children[currentPageIndex];
                navSlider.current.style.top = item?.offsetTop + 'px';
            }
        }
    }, [pathname]);

    return (
        <React.Fragment>
            <nav className="navbar-sidebar">
                <div className="user-info">
                    <div className="thumbnail user-info__avatar-thumb">
                        <img src="/Harryguci-Logo-Primary.svg" alt="avatar" />
                    </div>
                    <div className="user-info__description">
                        <p className="text-center text-bold">
                            <Link href={'/#username'}
                                className="d-flex"
                                style={{ justifyContent: 'center', gap: '5px' }}>Username
                                <FontAwesomeIcon icon={faArrowDown}
                                    style={{ width: '15px' }} />
                            </Link>
                        </p>
                    </div>
                </div>
                <ul className="nav" ref={navElement}>
                    {navState && navState.map(item => (
                        <li key={item.href} {...item.prop}>
                            {item.children}
                        </li>
                    ))}
                    {/* <li className={pathname === '/' ? "nav__item active" : 'nav__item'}>
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
                    </li> */}
                    <li ref={navSlider} className="slider"></li>
                </ul>

                <div className="control-panel" style={{ marginBottom: '0', marginTop: 'auto' }}>
                    <Link href={'/auth/login'} className="btn">Login</Link>
                    <Link href={'/auth/signup'} className="btn">Sign Up</Link>
                </div>
            </nav>
        </React.Fragment>
    )
}