import axios from "axios";
import {BtoDisplayItem} from "../model/BtoDisplayItem";

export const getAllBtoDisplayItems: () => Promise<BtoDisplayItem[]> = () => {
    return axios.get("/api/btoItem")
        .then(response => response.data)
}

export const putBtoItem: (updatedDisplayItem: BtoDisplayItem) => Promise<BtoDisplayItem> = (updatedBtoItem) => {
    return axios.put("/api/btoItem", updatedBtoItem)
        .then(response => response.data)
}
