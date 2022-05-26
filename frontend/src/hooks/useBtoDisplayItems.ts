import {useContext, useEffect, useState} from "react";
import {BtoDisplayItem} from "../model/BtoDisplayItem";
import {getAllBtoDisplayItems, putBtoItem} from "../service/api-service";
import {toast} from "react-toastify";
import {AuthContext} from "../context/AuthProvider";

export default function useBtoDisplayItems() {
    const [btoDisplayItems, setBtoDisplayitems] = useState<BtoDisplayItem[]>([]);
    const {token} = useContext(AuthContext);
    // const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBbnRvbkEiLCJleHAiOjE2NTM1ODU1MzEsImlhdCI6MTY1MzU3MTEzMX0.oZMx6ZJHNeEgTTsHWgOxByXnDuyRcE9y-uEdv44O0KA"


    useEffect(() => {
        getAllBtoDisplayItems(token)
            .then(allBtoDisplayItems => setBtoDisplayitems(allBtoDisplayItems))
            .catch(() => toast.error("Connection failed! Please retry later."))
    }, [token])

    const changeBtoItem = (updatedBtoItem: BtoDisplayItem) => {
        putBtoItem(updatedBtoItem, token)
            .then(updatedBtoItem => {
                setBtoDisplayitems(btoDisplayItems.map(item => item.id === updatedBtoItem.id ? updatedBtoItem : item))
                return updatedBtoItem
            })
            .catch(() => toast.error("Connection failed! Please retry later."))
    }

return {btoDisplayItems, changeBtoItem}
}

