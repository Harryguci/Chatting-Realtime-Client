"use client"

import React, { FormEvent, FormEventHandler } from "react";
import Link from "next/link";
import '../../_assets/scss/components/login/style.scss';
import axios from "axios";
import { redirect } from "next/navigation";
const SignUp: React.FunctionComponent = () => {
    const [username, setUsername] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [repassword, setRePassword] = React.useState<string>("");
    const [agree, setAgree] = React.useState<boolean>(false);
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const { data, status } = await axios.post('https://localhost:3001/api/auth/signup', {
            username, password, email, roles: "user"
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });
        if (status === 200) {
            window.alert('Sign Up sucessfully');
            redirect('/auth/login')
        }
        if (data.error) {
            window.alert(data.error);
        }
    }
    return (
        <React.Fragment>
            <div className="" style={{
                height: '100vh',
                display: 'flex'
            }}>
                <section className="signup" style={{ margin: 'auto' }}>
                    <div className="container">
                        <div className="signup-content">
                            <div className="signup-form">
                                <h2 className="form-title">Sign up</h2>
                                <form method="POST" className="register-form" id="register-form" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                        <input type="text" name="name" id="name" placeholder="Your Name"
                                            value={username} onChange={e => setUsername(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email"><i className="zmdi zmdi-email"></i></label>
                                        <input type="email" name="email" id="email" placeholder="Your Email"
                                            value={email} onChange={e => setEmail(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="pass"><i className="zmdi zmdi-lock"></i></label>
                                        <input type="password" name="pass" id="pass" placeholder="Password"
                                            value={password} onChange={e => setPassword(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="re-pass"><i className="zmdi zmdi-lock-outline"></i></label>
                                        <input type="password" name="re_pass" id="re_pass" placeholder="Repeat your password"
                                            value={repassword} onChange={e => setRePassword(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <input type="checkbox" name="agree-term" id="agree-term" className="agree-term"
                                            checked={agree} onChange={e => setAgree(e.target.checked)} />
                                        <label htmlFor="agree-term" className="label-agree-term"><span>
                                            <span></span>
                                        </span>I agree all statements in  <Link href="#" className="term-service">Terms of service</Link>
                                        </label>
                                    </div>
                                    <div className="form-group form-button">
                                        <input type="submit" name="signup" id="signup" className="form-submit" value="Register" />
                                    </div>
                                </form>
                            </div>
                            <div className="signup-image">
                                <figure><img src="/signup-image.jpg" alt="sing up image" /></figure>
                                <Link href="/auth/login" className="signup-image-link btn bg-primary-gradient text-white">
                                    I am already member
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </React.Fragment>
    )
}


export default SignUp;
