import {FormEvent, useContext, useState} from "react";
import {AuthContext} from "../context/AuthProvider";

type LoginPageProps = {
    username: string;
    setUsername:  (username:string) => void;
}
export  default function LoginPage({username, setUsername}: LoginPageProps) {
    const [password, setPassword] = useState<string>("");

    const {login} = useContext(AuthContext)

    const onSubmit = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        login({username: username, password: password})
    }

    return <div>
        <h1>...</h1>
        <h1>...</h1>
        <form onSubmit={onSubmit}>
            <input type={"text"} value={username} placeholder={"Username"} onChange={(event) => setUsername(event.target.value) }/>
            <input type={"password"} value={password} placeholder={"Password"} onChange={(event) => setPassword(event.target.value)}/>
            <button type={"submit"}>Login</button>
        </form>
    </div>
}