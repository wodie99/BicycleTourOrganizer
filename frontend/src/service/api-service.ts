import axios from "axios";
import {BtoDisplayItem} from "../model/BtoDisplayItem";

export const getAllBtoDisplayItems: () => Promise<BtoDisplayItem[]> = () => {
    return axios.get("/api/btoItem")
        .then(response => response.data)
}