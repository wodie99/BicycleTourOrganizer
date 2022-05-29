import {createContext, ReactElement, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";

const AUTH_KEY = "AuthToken"

export const AuthContext = createContext<{ token: string | undefined, login: (credentials: {username: string, password: string}) => void, logout:() => void  }>
    ({token: undefined, login: () => {toast.error("Login not initialized")},logout: () => {toast.info("und Tschüss ...")}})

export type AuthProviderProps = {
    children : ReactElement
}

export default function AuthProvider({children}: AuthProviderProps){
    const [token, setToken] = useState<string | undefined>(localStorage.getItem(AUTH_KEY) ?? undefined)
    const navigate = useNavigate()

    const login = (credentials: {username: string, password: string}) => {
        axios.post("/auth/login", credentials)
            .then(response => response.data)
            .then((newToken) => {
                setToken(newToken)
                localStorage.setItem(AUTH_KEY, newToken)
            })
            .then(() => navigate("/"))
            .catch(() => toast.error("Login failed. Credentials invalid?"))
    }

    const logout = () => {
        localStorage.removeItem(AUTH_KEY);
        setToken("")
    }

    return <div>
        <AuthContext.Provider value={{token, login, logout}}>
            {children}
        </AuthContext.Provider>
    </div>

}
