import axios from "axios";
import {BtoDisplayItem} from "../model/BtoDisplayItem";

export const getAllBtoDisplayItems: () => Promise<BtoDisplayItem[]> = () => {
    return axios.get("/api/btoItem/display")
        .then(response => response.data)
}