import {useContext, useState} from "react";
import {AuthContext} from "../context/AuthProvider";
import {getBtoStatusById} from "../service/api-service";
import {toast} from "react-toastify";


export default function useBtoItemStatus() {
    const [btoItemStatus, setBtoItemStatus] = useState<string>("")
    const {token} = useContext(AuthContext);

    const getStatusById = (id: string) => {
        getBtoStatusById(id, token)
            .then(status => {
                setBtoItemStatus(status)
                return status
            })
            .catch(() => toast.error("Connection failed!! Please retry later."))
    }
    return {btoItemStatus, getStatusById}
}
