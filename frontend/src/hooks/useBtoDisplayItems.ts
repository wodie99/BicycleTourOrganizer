import {useEffect, useState} from "react";
import {BtoDisplayItem} from "../model/BtoDisplayItem";
import {getAllBtoDisplayItems} from "../service/api-service";

export default function useBtoDisplayItems() {
    const [btoDisplayItems, setBtoDisplayitems] = useState<BtoDisplayItem[]>([]);

    useEffect(()=>{
        getAllBtoDisplayItems()
            .then(allBtoDisplayItems => setBtoDisplayitems(allBtoDisplayItems))
            .catch(() => alert("Connection failed! Please retry later."))

    },[])

    return {btoDisplayItems}
}
