import {BtoDisplayItem} from "../model/BtoDisplayItem";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

type SetActionOwnerProps = {
    btoItem: BtoDisplayItem;
    username: string;
    changeBtoItem: (updatedBtoItem: BtoDisplayItem) => void;
    btoItemStatus: string;
    getStatusById: (id: string) => void;
}

export default function SetActionOwner({
                                           btoItem,
                                           username,
                                           changeBtoItem,
                                           btoItemStatus,
                                           getStatusById
                                       }: SetActionOwnerProps) {
    const navigate = useNavigate()

    useEffect(() => {
        getStatusById(btoItem.id)
    }, [btoItem.id])

    const onClickYes = () => {
        if (btoItem) {
            getStatusById(btoItem.id)
            if (btoItemStatus !== "") {
                getStatusById(btoItem.id)
                if (btoItemStatus === "NEW") {
                    const updatedItem = {
                        actionOwner: username,
                        status: "PREP4VOTE",
                    }
                    changeBtoItem({...btoItem, ...updatedItem})
                    toast.info("Status wird gespeichert")
                } else {
                    toast.warning("ActionOwner wurde bereits gesetzt!")
                }
            } else {
                toast.warning("Timeout - bitte nochmals drücken!")
            }
        } else {
            toast.error("ID wurde nicht gefunden!")
        }
    }

    const onClickNo = () => {
        navigate(-1)
    }

    const onClickBack = () => {
        navigate(-1)
    }

    return (<div>
            <h1>Auswahl ActionOwner</h1>
            <label>Möchten Sie gerne ActionOwner werden?</label>
            <button onClick={onClickYes}>ja</button>
            <button onClick={onClickNo}>nein</button>
            <p>
                <button onClick={onClickBack}>zurück</button>
            </p>
        </div>
    )
}
