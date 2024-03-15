"use client"

import { GlobalContext } from "@/app/Context/store";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

function Logout() {
    const router = useRouter();
    const { setData: setUserData } = useContext(GlobalContext);

    useEffect(() => {
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('accessToken');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('accessToken');
        setUserData({
            username: '',
            roles: '',
            email: ''
        })
        router.push('/auth/login');
    });

    return () => {
        <>
            <p>Redirecting..</p>
        </>
    }
}

export default Logout;