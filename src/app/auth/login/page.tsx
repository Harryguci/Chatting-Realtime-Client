"use client"

import React, { FormEvent } from "react";
import Link from "next/link";
import '../../_assets/scss/components/login/style.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faTiktok } from '@fortawesome/free-brands-svg-icons';
import axios from "axios";
import { redirect } from "next/navigation";

const Login: React.FunctionComponent = () => {
    const [username, setUsername] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [remember, setRemember] = React.useState<boolean>(false)
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
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const { data, status } = await axios.post('https://localhost:3001/api/auth/login', {
            username, password
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });

        if (status === 200) {
            let token: string | undefined = data.accessToken;
            console.log('token', token);

            if (!token) return window.alert('Can not get the token');
            localStorage.setItem('accessToken', token);
            sessionStorage.setItem('accessToken', token);

            redirect("/chat");
        }

        if (data.error) {
            window.alert(data.error)
        }
    }
    return (
        <React.Fragment>
            <div className="" style={{ height: '100vh', display: 'flex' }}>
                <section className="sign-in" style={{ margin: 'auto' }}>
                    <div className="container">
                        <div className="signin-content">
                            <div className="signin-image">
                                <figure><img src="/signin-image.jpg" alt="sing up image" /></figure>
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
        </React.Fragment>
    )
}


export default Login;
