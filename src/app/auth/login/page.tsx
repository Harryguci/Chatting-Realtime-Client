"use client"

import { Fragment, useState, Dispatch, SetStateAction, useContext } from "react";
import swal from "sweetalert";
import axios from "axios";
import Link from "next/link";
import '../../_assets/scss/components/login/style.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { useRouter } from 'next/navigation'
import { DataType, GlobalContext } from "@/app/Context/store";
import { server } from "@/config";
import Image from "next/image";
import AccountValid from "@/app/_helper/ValidationAccount";

const Login: React.FunctionComponent = () => {
    const { setData }: {
        setData:
        Dispatch<SetStateAction<DataType | undefined>>
    } = useContext(GlobalContext);

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [remember, setRemember] = useState<boolean>(false)

    const styleSocialLink = {
        display: 'flex',
        background: '#8888ff',
        aspectRatio: '1/1',
        borderRadius: '5px',
        width: '30px',
        height: '30px',
        justifyContent: 'center',
        alignItems: 'center'
    }
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validRes: AccountValid = AccountValid.ValidationAccount({ username, password });

        if (!validRes.Ok) {
            swal({
                title: "Error!",
                text: `${validRes.inCorrectProps} không đúng định dạng`,
                icon: "error",
                buttons: ["Try again!"],
            });
            return;
        }
        const data = await axios.post(`${server}/api/auth/login`, {
            username, password
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }).then(response => response.data)
            .then(data => {
                let token: string | undefined = data.token;
                console.log('token', token);

                if (!token) return window.alert('Can not get the token');
                localStorage.setItem('accessToken', token);
                sessionStorage.setItem('accessToken', token);

                const user = {
                    username: username,
                    roles: 'user',
                    email: ''
                }

                localStorage.setItem('currentUser', JSON.stringify(user));
                sessionStorage.setItem('currentUser', JSON.stringify(user));

                setData(user)

                return data;
            }).catch(error => {
                console.log(JSON.stringify(error))

                swal({
                    title: "Error!",
                    text: error.message,
                    icon: "error",
                    buttons: ["Try again!"],
                });
            });

        if (data) router.push("/chat")
    }
    return (
        <Fragment>
            <div className="" style={{ height: '100vh', display: 'flex' }}>
                <section className="sign-in" style={{ margin: 'auto' }}>
                    <div className="container">
                        <div className="signin-content">
                            <div className="signin-image">
                                <figure>
                                    <Image
                                        src="/signin-image.jpg" alt="sing up image"
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                        style={{ width: '100%', height: 'auto' }}
                                        blurDataURL="/Harryguci-Logo-Primary-blur.png"
                                        placeholder="blur" />
                                </figure>
                                <Link href="/auth/signup" className="signup-image-link btn bg-primary-gradient text-white">
                                    Create an account
                                </Link>
                            </div>

                            <div className="signin-form">
                                <h2 className="form-title">Login</h2>
                                <form method="POST" className="register-form" id="login-form" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label><i className="zmdi zmdi-account material-icons-name"></i></label>
                                        <input type="text" name="your_name" id="your_name" placeholder="Your Name"
                                            value={username} onChange={e => setUsername(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label><i className="zmdi zmdi-lock"></i></label>
                                        <input type="password" name="your_pass" id="your_pass" placeholder="Password"
                                            value={password} onChange={e => setPassword(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <input type="checkbox" name="remember-me" id="remember-me" className="agree-term"
                                            checked={remember} onChange={e => setRemember(e.target.checked)} />
                                        <label className="label-agree-term"><span><span></span></span>Remember me</label>
                                    </div>
                                    <div className="form-group form-button">
                                        <input type="submit" name="signin" id="signin" className="form-submit" value="Log in" />
                                    </div>
                                </form>
                                <div className="social-login">
                                    <span className="social-label">Or login with</span>
                                    <ul className="socials">
                                        <li>
                                            <Link href="#" style={styleSocialLink}>
                                                <FontAwesomeIcon className="text-white" icon={faFacebookF} />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#" style={{ ...styleSocialLink, background: '#0eeeff' }}>
                                                <FontAwesomeIcon className="text-white" icon={faTwitter} />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#" style={{ ...styleSocialLink, background: '#666666' }}>
                                                <FontAwesomeIcon className="text-white" icon={faTiktok} />
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Fragment>
    )
}


export default Login;
