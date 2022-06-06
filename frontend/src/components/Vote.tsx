import {BtoDisplayItem} from "../model/BtoDisplayItem";
import {useNavigate} from "react-router-dom";
import {VoteSend} from "../model/VoteSend";
import {toast} from "react-toastify";
import {useEffect} from "react";

type VoteProps = {
    btoItem: BtoDisplayItem;
    username: string;
    updateVote: (id: string, voteSend: VoteSend) => void;
    btoItemStatus: string;
    getStatusById: (id: string) => void;
}

export default function Vote({btoItem, username, updateVote, btoItemStatus, getStatusById}: VoteProps) {

    const navigate = useNavigate()

    const onClickBack = () => {
        navigate(`/`)
    }

    useEffect(() => {
        getStatusById(btoItem.id)
    }, [btoItem.id])

    const onClickYes = () => {
        if (btoItem) {
            getStatusById(btoItem.id)
            if (btoItemStatus !== "") {
                getStatusById(btoItem.id)
                if (btoItemStatus === "VOTE") {
                    const vote = "YES"
                    if (!btoItem.actionMembers || !btoItem.actionMembers.includes(username)) {
                        updateVote(btoItem.id, {username, vote})
                        toast.info("Neuer Status wird gespeichert")
                    } else {
                        toast.info("Status ist bereits gespeichert")
                    }
                } else {
                    toast.warning("Wahl bereits beendet!")
                }
            } else {
                toast.warning("Timeout - bitte nochmals drücken!")
            }
        } else {
            toast.error("ID wurde nicht gefunden!")
        }
    }

    const onClickNo = () => {
        if (btoItem) {
            getStatusById(btoItem.id)
            if (btoItemStatus !== "") {
                getStatusById(btoItem.id)
                if (btoItemStatus === "VOTE") {
                    const vote = "NO"
                    if (!btoItem.actionNotMembers || !btoItem.actionNotMembers.includes(username)) {
                        updateVote(btoItem.id, {username, vote})
                        toast.info("Status wird gespeichert")
                    } else {
                        toast.info("Status ist bereits gespeichert")
                    }
                } else {
                    toast.warning("Wahl bereits beendet!")
                }
            } else {
                toast.warning("Timeout - bitte nochmals drücken!")
            }
        } else {
            toast.error("ID wurde nicht gefunden!")
        }
    }

    return (<div>
            <p>Status der Aktion: {btoItem.status}</p>
            <p>AktionOwner: {btoItem.actionOwner}</p>
            <p>Teilnehmer: {btoItem.actionMembers}</p>
            <p>Nicht teilnehmen: {btoItem.actionNotMembers}</p>
            <span> Teilnehmen? </span>
            <button onClick={onClickYes}>ja</button>
            <button onClick={onClickNo}>nein</button>
            <span className={"space-between"}>oder:</span>
            <button onClick={onClickBack}>zurück</button>
        </div>
    )
}
