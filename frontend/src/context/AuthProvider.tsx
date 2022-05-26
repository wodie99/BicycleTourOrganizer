import {createContext, ReactElement, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";

// const AUTH_KEY = "AuthToken"

export const AuthContext = createContext<{ token: string | undefined, login: (credentials: {username: string, password: string}) => void }>
    ({token: undefined, login: () => {toast.error("Login not initialized")}})

export type AuthProviderProps = {
    children : ReactElement
}

export default function AuthProvider({children}: AuthProviderProps){
    const [token, setToken] = useState<string>()
    const navigate = useNavigate()

    const login = (credentials: {username: string, password: string}) => {
        axios.post("/auth/login", credentials)
            .then(response => response.data)
            .then((token) => setToken(token))
            .then(() => navigate("/"))
            .catch(() => toast.error("Login failed. Credentials invalid?"))
    }

    return <div>
        <AuthContext.Provider value={{token, login}}>
            {children}
        </AuthContext.Provider>
    </div>

}
