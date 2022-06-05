import axios from "axios";
import {BtoDisplayItem} from "../model/BtoDisplayItem";
import {VoteSend} from "../model/VoteSend";

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

export const getUsername: (token?: string) =>
    Promise<string> = (token) => {
    return axios.get("/api/user/me", token
        ? {headers: {"Authorization": token}}
        : {})
        .then(response => response.data)
}

export const putVote: (id: string, voteSend: VoteSend, token?: string) =>
    Promise<BtoDisplayItem> = (id, voteSend, token) => {
    return axios.put(`/api/btoItem/vote/${id}`,voteSend, token
        ? {headers: {"Authorization": token}}
        : {})
        .then(response => response.data)
}
