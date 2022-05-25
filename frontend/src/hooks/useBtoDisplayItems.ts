import {useEffect, useState} from "react";
import {BtoDisplayItem} from "../model/BtoDisplayItem";
import {getAllBtoDisplayItems, putBtoItem} from "../service/api-service";

export default function useBtoDisplayItems() {
    const [btoDisplayItems, setBtoDisplayitems] = useState<BtoDisplayItem[]>([]);

    useEffect(() => {
        getAllBtoDisplayItems()
            .then(allBtoDisplayItems => setBtoDisplayitems(allBtoDisplayItems))
            .catch(() => alert("Connection failed! Please retry later."))
    }, [])

    const changeBtoItem = (updatedBtoItem: BtoDisplayItem) => {
        putBtoItem(updatedBtoItem)
            .then(updatedBtoItem => {
                setBtoDisplayitems(btoDisplayItems.map(item => item.id === updatedBtoItem.id ? updatedBtoItem : item))
                return updatedBtoItem
            })
            .catch(() => alert("Connection failed! Please retry later."))
    }

return {btoDisplayItems, changeBtoItem}
}
