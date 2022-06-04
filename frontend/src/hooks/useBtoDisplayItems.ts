import {useContext, useEffect, useState} from "react";
import {BtoDisplayItem} from "../model/BtoDisplayItem";
import {getAllBtoDisplayItems, putBtoItem, putVote} from "../service/api-service";
import {toast} from "react-toastify";
import {AuthContext} from "../context/AuthProvider";
import {VoteSend} from "../model/VoteSend";

export default function useBtoDisplayItems() {
    const [btoDisplayItems, setBtoDisplayitems] = useState<BtoDisplayItem[]>([]);
    const {token} = useContext(AuthContext);

    useEffect(() => {
        if (token) {
            getAllBtoDisplayItems(token)
                .then(allBtoDisplayItems => setBtoDisplayitems(allBtoDisplayItems))
                .catch(() => toast.error("Connection failed!!! Please retry later."))
        }
    }, [token])

    const changeBtoItem = (updatedBtoItem: BtoDisplayItem) => {
        putBtoItem(updatedBtoItem, token)
            .then(updatedBtoItem => {
                setBtoDisplayitems(btoDisplayItems.map(item => item.id === updatedBtoItem.id ? updatedBtoItem : item))
                return updatedBtoItem
            })
            .catch(() => toast.error("Connection failed!! Please retry later."))
    }


    const updateVote = (id:string, voteSend: VoteSend) => {
        putVote(id,voteSend,token)
            .then(updatedBtoItem => {
                setBtoDisplayitems(btoDisplayItems.map(item => item.id === updatedBtoItem.id ? updatedBtoItem : item))
                return updatedBtoItem
            })
            .catch(() => toast.error("Connection failed!! Please retry later."))
    }

    return {btoDisplayItems, changeBtoItem, updateVote}
}

