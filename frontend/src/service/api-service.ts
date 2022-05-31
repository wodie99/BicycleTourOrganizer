import axios from "axios";
import {BtoDisplayItem} from "../model/BtoDisplayItem";

export const getAllBtoDisplayItems: (token?: string) => Promise<BtoDisplayItem[]> = (token) => {
    return axios.get("/api/btoItem", token
        ? {headers: {"Authorization": token}}
        : {})
        .then(response => response.data)
}

export const putBtoItem: (updatedBtoItem: BtoDisplayItem, token?: string) =>
    Promise<BtoDisplayItem> = (updatedBtoItem, token) => {
    return axios.put("/api/btoItem", updatedBtoItem, token
        ? {headers: {"Authorization": token}}
        : {})
        .then(response => response.data)
}

export const getBtoStatusById: (id: string, token?: string) =>
    Promise<string> = (id, token) => {
    return axios.get(`/api/btoItem/status/${id}`, token
        ? {headers: {"Authorization": token}}
        : {})
        .then(response => response.data)
}
