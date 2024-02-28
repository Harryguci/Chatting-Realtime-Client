import React from "react";
import Link from "next/link";
const SignUp: React.FunctionComponent<{
    className: string | undefined,
    style: object | undefined,
    id: string | undefined
}> = ({ }) => {

    return (
        <React.Fragment>
            <h1>Sign Up Page</h1>
            <nav style={{ display: 'flex', gap: '1rem' }}>
                <Link href="/auth/login">Login</Link>
                <Link href="/chat">Home</Link>
            </nav>
        </React.Fragment>
    )
}


export default SignUp;
