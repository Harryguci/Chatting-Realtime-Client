"use client"

import { useState, createContext, Dispatch, SetStateAction, ReactNode, useEffect, useMemo } from "react";
import { EmptyAccount } from "../_interfaces/IAccount";
export type DataType = {
    username: string,
    roles: string,
    email: string | undefined
}

interface ContextProps {
    userId: string,
    setUserId: Dispatch<SetStateAction<string>>
    data: DataType | undefined,
    setData: Dispatch<SetStateAction<DataType | undefined>>
}

export const GlobalContext = createContext<ContextProps>({
    userId: '',
    setUserId: (): string => '',
    data: undefined,
    setData: (): DataType | undefined => undefined,
})

export const GlobalContextProvider: any = ({ children }: { children: ReactNode }) => {
    const [userId, setUserId] = useState<string>("");
    const [data, setData] = useState<DataType | undefined>();

    const persistentUserData = useMemo((): string | null => {
        if (typeof window !== 'undefined') {
            var obj = JSON.parse(localStorage.getItem('currentUser') ?? JSON.stringify(EmptyAccount));

            return JSON.stringify({
                username: obj.username,
                roles: obj.roles,
                email: obj.email
            });
        }
        else
            return JSON.stringify(EmptyAccount);
    }, []);

    useEffect(() => {
        const raw = persistentUserData;
        if (raw) setData(JSON.parse(raw))
    }, [])

    return (
        <GlobalContext.Provider value={{ userId, setUserId, data, setData }}>
            {children}
        </GlobalContext.Provider>
    )
}