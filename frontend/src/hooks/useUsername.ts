import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthProvider";
import {getUsername} from "../service/api-service";
import {toast} from "react-toastify";

export default function useUsername() {
    const [username, setUsername] = useState<string>("");
    const {token} = useContext(AuthContext);

    useEffect(() => {
        if (token) {
            getUsername(token)
                .then(name => {
                    setUsername(name)
                    toast.info("Username wurde gesetzt zu " + {username})
                    return name
                })
        }
    }, [username, token])

    return {username, setUsername}
}

