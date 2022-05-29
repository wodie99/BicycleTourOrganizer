import {useContext} from "react";
import {AuthContext} from "../context/AuthProvider";
import {useNavigate} from "react-router-dom";
import "../style/LogoutPage.css"

type LogoutPageProps = {
    setUsername: (arg0: string) => void;
}

export  default function LogoutPage({setUsername}: LogoutPageProps) {

    const {logout} = useContext(AuthContext)
    const navigate = useNavigate()

    const onClickBack = () => {
        navigate(-1)
    }

    const onClickLogout = () => {
        logout()
        setUsername("")
    }

    return <div className={"logout-page"}>
        <p>Möchten Sie sich abmelden?</p>
        <button onClick={onClickLogout}>Logout</button>
        <button onClick={onClickBack}>zurück</button>
    </div>
}


