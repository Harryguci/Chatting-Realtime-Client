import React from "react";
import Link from "next/link";
const Login: React.FunctionComponent<{
    className: string | undefined,
    style: object | undefined,
    id: string | undefined
}> = ({ }) => {

    return (
        <React.Fragment>
            <h1>Login Page</h1>
            <nav style={{ display: 'flex', gap: '1rem' }}>
                <Link href="/auth/signup">Sign Up</Link>
                <Link href="/chat">Home</Link>
            </nav>
        </React.Fragment>
    )
}


export default Login;
