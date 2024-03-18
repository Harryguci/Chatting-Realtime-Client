'use client'

import { Fragment, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import swal from "sweetalert";
import Link from "next/link";
import '../_assets/scss/components/navbar_sidebar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { usePathname } from "next/navigation";
import { GlobalContext } from "../Context/store";
import { useRouter } from "next/navigation";
import NotificationPopup from "./NotificationPopup";
import axios from "axios";
interface NavbarItem {
    href: string | undefined | null,
    children: React.FunctionComponent | any,
    prop: object | null | undefined
}

export default function NavbarSidebar() {
    const { data: userData, setData: setUserData } = useContext(GlobalContext);
    const router = useRouter();

    const pathname: string | null = usePathname();
    const navSlider = useRef<HTMLLIElement>(null);
    const [navState, setNavState] = useState<Array<NavbarItem>>([
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
    const navElement = useRef<HTMLUListElement>(null);

    useLayoutEffect(() => {
        let indexCurrent = -1;

        navState.forEach((item, index) => {
            if (pathname?.toLowerCase()?.startsWith(item.href ?? ""))
                indexCurrent = index

            navElement.current?.children[index]
                .classList.remove('active');
        });
        if (indexCurrent >= 0)
            navElement.current?.children[indexCurrent]
                .classList.add('active');

        return () => {
            navState.forEach((item, index) => {
                navElement.current?.children[index].classList.remove('active');
            })
        }
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
            }
        }

        if (page) {
            var currentPageIndex: number = -1;

            navState.forEach((item, index) => {
                if (item.href && page.includes(item.href))
                    currentPageIndex = index;
                return item;
            });

            if (style && navSlider.current) {
                var item: any = navElement.current?.children[currentPageIndex];
                navSlider.current.style.top = item?.offsetTop + 'px';
            }
        }
    }, [pathname]);

    const handleLogout = (event: any) => {
        swal("Are you sure to want to Logout?", {
            icon: 'warning',
            // @ts-ignore
            buttons: {
                cancel: "Hủy",
                accept: "Ok",
            },
            dangerMode: true,
        })
            .then(async (value) => {
                switch (value) {
                    case "accept":
                        var token = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken')
                        localStorage.removeItem('accessToken');
                        sessionStorage.removeItem('accessToken');
                        localStorage.removeItem('currentUser');
                        sessionStorage.removeItem('currentUser');
                        setUserData({
                            username: '',
                            roles: '',
                            email: ''
                        })

                        var data = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/Auth/Logout`, {}, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }).then(response => response.data).catch(error => error);
                        console.log(data);

                        router.push('/auth/login')
                        break;

                    case "cancel":
                        break;

                    default:
                }
            });
    }

    return (
        <Fragment>
            {pathname && !['/auth/login', '/auth/signup'].includes(pathname.toLowerCase()) &&
                <nav className="navbar-sidebar">
                    <NotificationPopup />
                    <div className="user-info">
                        <div className="thumbnail user-info__avatar-thumb">
                            <img src="/Harryguci-Logo-Primary.svg" alt="avatar" />
                        </div>
                        <div className="user-info__description">
                            <p className="text-center text-bold">
                                <Link href={userData ? `/account/${userData?.username}` : "#"}
                                    className="d-flex"
                                    style={{ justifyContent: 'center', gap: '5px' }}>{userData?.username || 'Username'}
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
                        <li ref={navSlider} className="slider"></li>
                    </ul>

                    <div className="control-panel" style={{ marginBottom: '0', marginTop: 'auto' }}>
                        {!userData && (
                            <>
                                <Link href={'/auth/login'} className="btn">Login</Link>
                                <Link href={'/auth/signup'} className="btn">Sign Up</Link>
                            </>
                        )}

                        {userData &&
                            <button className="btn"
                                style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                                onClick={handleLogout}>
                                <FontAwesomeIcon icon={faRightFromBracket} />{" "}Logout
                            </button>}
                    </div>
                </nav>}
        </Fragment>
    )
}