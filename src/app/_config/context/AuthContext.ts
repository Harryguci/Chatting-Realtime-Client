import { createContext } from "react";
import IAccount from "@/app/_interfaces/IAccount";

const AuthContext = createContext<IAccount | undefined>(undefined)

export default AuthContext;
