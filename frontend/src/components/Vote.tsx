import {BtoDisplayItem} from "../model/BtoDisplayItem";
import {useNavigate} from "react-router-dom";
import {VoteSend} from "../model/VoteSend";
import useBtoItemStatus from "../hooks/useBtoItemStatus";
import {toast} from "react-toastify";

type VoteProps = {
    btoItem: BtoDisplayItem;
    username: string;
    updateVote: (id: string, voteSend: VoteSend) => void;
}

export default function Vote({btoItem, username, updateVote}: VoteProps) {

    const navigate = useNavigate()
    const {btoItemStatus, getStatusById} = useBtoItemStatus()

    const onClickBack = () => {
        navigate(`/`)
    }

    const onClickYes = () => {
        if (btoItem) {
            getStatusById(btoItem.id)
            if (btoItemStatus === "VOTE") {
                const vote = "YES"
                if (!btoItem.actionMembers.includes(username)) {
                    updateVote(btoItem.id, {username,vote})
                } else {
                    toast.info("Status ist bereits gespeichert")
                }
            } else {
                toast.warning("Wahl bereits beendet!")
            }
        } else {
            toast.error("ID wurde nicht gefunden!")
        }
    }

    const onClickNo = () => {
        if (btoItem) {
            getStatusById(btoItem.id)
            if (btoItemStatus === "VOTE") {
                const vote = "NO"
                if (!btoItem.actionNotMembers.includes(username)) {
                    updateVote(btoItem.id, {username,vote})
                } else {
                    toast.info("Status ist bereits gespeichert")
                }
            } else {
                toast.warning("Wahl bereits beendet!")
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
