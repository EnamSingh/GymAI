import { authClient } from "../lib/auth";
import type { User} from "../types";
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface AuthContextType {
    user: User | null;
    }
const AuthContext = createContext<AuthContextType | null>(null)

export default function AuthProivder({ children}: {children: ReactNode}){
    const [neonUser, setNeonUser] = useState<any>(null);

    useEffect(() =>{
        async function loadUser(){
            try{
                const result = await authClient.getSession()
                if (result && result.data?.user){
                    setNeonUser(result.data.user);
                }
                else{
                    setNeonUser(null);
                }

            } catch (err){
                setNeonUser(null);

            }
        }
        loadUser()

    }, []);
    return <AuthContext.Provider  value={{user: neonUser}}> {children}</AuthContext.Provider>

}
export function useAuth(){
    const context = useContext(AuthContext);
    if (!context){
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;

}