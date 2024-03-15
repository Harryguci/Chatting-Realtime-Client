"use client"

import { useState, createContext, useContext, Dispatch, SetStateAction, ReactNode, FunctionComponent, useEffect } from "react";

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
    const persistentUserData = localStorage.getItem('currentUser');

    const [userId, setUserId] = useState<string>("");
    const [data, setData] = useState<DataType | undefined>(persistentUserData ? JSON.parse(persistentUserData) : undefined);

    return (
        <GlobalContext.Provider value={{ userId, setUserId, data, setData }}>
            {children}
        </GlobalContext.Provider>
    )
}