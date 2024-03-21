import { FormEvent, Fragment, memo, MouseEventHandler, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import '../_assets/scss/components/create_new_form.scss';
import axios from "axios";
import { server } from "@/config";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import BackgroundDark from "./BackgroundDark";
import ISearchResult from "../_interfaces/ISearchResult";
import swal from "sweetalert";
import { DataType } from "../Context/store";

function CreateNewChatForm({ className, close, bgShadow, currentUser }: {
    className: string,
    close: MouseEventHandler | any
    bgShadow?: boolean,
    currentUser: DataType | undefined
}): ReactNode {
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await getUserAsync();
    }

    const [classNameAttr, setClassNameAttr] = useState<string[]>(["form", "card", "box-shadow-1", "create-new-form"]);
    const [username, setUsername] = useState<string | undefined>("");
    const [email, setEmail] = useState<string | undefined>("");
    const [listUsers, setListUsers] = useState<ISearchResult[]>([]);

    const usernameLabelRef = useRef<HTMLLabelElement>(null);
    const emailLabelRef = useRef<HTMLLabelElement>(null);

    useEffect(() => {
        if (className) {
            setClassNameAttr(prev => [...prev, className]);
        }
    }, [className]);

    useEffect(() => {
        document.addEventListener('keydown', (ev: KeyboardEvent) => {
            if (ev.key === 'Escape') {
                close();
            }
        })

        return () => {
            document.removeEventListener('keydown', (ev: KeyboardEvent) => {
                if (ev.key === 'Escape') {
                    close();
                }
            })
        }
    }, [])

    const getUserAsync = async () => {
        var query: { username: string | undefined, email: string | undefined } = { username: undefined, email: undefined };
        if (username) query.username = username;
        if (email) query.email = email;

        const token = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

        var txt = `${query.username ? `username=${query.username}` : ''}`;
        if (query.email)
            if (txt) txt += `&email=${query.email}`;
            else txt += `email=${query.email}`

        await axios.get(`${server}/api/Accounts/FindUser?${txt}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response: any) => {
                console.log(response.data);
                var users = Array.from(response.data.result);
                var friends = Array.from(response.data.listFriend);

                var listSearchResult: ISearchResult[] = [];

                users.forEach((user: any, index) => {
                    let t: ISearchResult = {
                        username: user.username,
                        roles: user.roles || 'user',
                        email: user.email || '',
                        isFriend: false
                    }
                    if (!friends.find((fr: any) => fr.username === user.username)) {
                        t.isFriend = true;
                    }

                    listSearchResult.push(t)
                });

                setListUsers([...listSearchResult]);
            })
            .catch(error => console.error(error));
    }


    useEffect(() => {
        if (usernameLabelRef.current && username) usernameLabelRef.current.style.opacity = '1';
        else if (usernameLabelRef.current) usernameLabelRef.current.style.opacity = '0.5';
    }, [username])

    useEffect(() => {
        if (emailLabelRef.current && email) emailLabelRef.current.style.opacity = '1';
        else if (emailLabelRef.current) emailLabelRef.current.style.opacity = '0.5';
    }, [email]);

    const handleClose = useCallback((ev: any) => close(ev), []);
    const HandleAddFriend = async (friend: string) => {
        const token = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');
        const data = await axios.post(`${server}/api/FriendRequests`, {
            id: '',
            user1: currentUser?.username,
            user2: friend
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => response.data)
            .catch(error => {
                swal(error.message, {
                    title: 'Error',
                    //@ts-ignore
                    buttons: {
                        Ok: 'Ok',
                    },
                    icon: 'error'
                });
            })
        if (data) {
            swal('Gửi yêu cầu thành công', {
                title: 'Add Friend',
                //@ts-ignore
                buttons: {
                    Ok: 'Ok',
                },
                icon: 'success'
            });
        }
    }
    return (
        <Fragment>
            {bgShadow && <BackgroundDark style={{}} onClick={handleClose} />}
            <form onSubmit={handleSubmit} className={classNameAttr.join(" ")}>
                <button type="button"
                    style={{ fontSize: '20px' }}
                    className="btn close-btn"
                    onClick={close}>
                    <FontAwesomeIcon icon={faSquareXmark} />
                </button>
                <h3 className="text-center" style={{ margin: '1rem 0' }}>Find User</h3>
                <div className="">
                    <label ref={usernameLabelRef} htmlFor="username">Username</label>
                    <input className="form-control" type="text" name="username" id="username"
                        value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="">
                    <label ref={emailLabelRef} htmlFor="email">Email</label>
                    <input className="form-control" type="email" name="email" id="email"
                        value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="" style={{ margin: '2rem 0 0 0', display: 'flex', justifyContent: 'end' }}>
                    <button className="btn bg-white-smoke rounded-1" type="submit">Find</button>
                </div>

                <div className="result-wrapper">
                    {listUsers?.length > 0 && <>
                        <h3>Results</h3>
                        <ul className="result-wrapper__list">
                            {listUsers.map((user, index) => (
                                <li key={user.username} className="result-wrapper__item rounded-1">
                                    <div className="">
                                        <Link href={`/account/${user.username}`}>
                                            <p style={{ fontWeight: 'bold' }}>{user.username}</p>
                                        </Link>
                                        <small>{user.email}</small>
                                    </div>
                                    {user.isFriend &&
                                        <button onClick={e => HandleAddFriend(user.username)}
                                            className="btn add-btn bg-primary-gradient rounded-1">Add</button>}
                                </li>
                            ))}
                        </ul>
                    </>}
                </div>
            </form>
        </Fragment>
    )
}

export default memo(CreateNewChatForm);
