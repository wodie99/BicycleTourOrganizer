import {BtoDisplayItem} from "../model/BtoDisplayItem";
import {useNavigate} from "react-router-dom";

type VoteProps = {
    btoItem: BtoDisplayItem;
    username: string;
    changeBtoItem: (updatedBtoItem: BtoDisplayItem) => void;
}

export default function Vote({btoItem, username, changeBtoItem}: VoteProps) {

    const navigate = useNavigate()


    const onClickBack = () => {
        navigate(`/`)
    }

    const onClickMember = () => {
        if (btoItem) {
            if (!btoItem.actionMembers.includes(username)) {
                btoItem.actionMembers = [...btoItem.actionMembers, username]
            }
            if (btoItem.actionNotMembers.includes(username)) {
                btoItem.actionNotMembers = remove(btoItem.actionNotMembers, username)
            }
            changeBtoItem(btoItem)
        }
    }

    const onClickNoMember = () => {
        if (btoItem) {
            if (!btoItem.actionNotMembers.includes(username)) {
                btoItem.actionNotMembers = [...btoItem.actionNotMembers, username]
            }
            if (btoItem.actionMembers.includes(username)) {
                btoItem.actionMembers = remove(btoItem.actionMembers, username)
            }
            changeBtoItem(btoItem)
        }
    }

    function remove(arr: string[], item: string) {
        var index = arr.indexOf(item);
        return [
            ...arr.slice(0, index),
            ...arr.slice(index + 1)
        ];
    }

    return (<div>
            <span> Teilnehmen? </span>
            <button onClick={onClickMember}>ja</button>
            <button onClick={onClickNoMember}>nein</button>
            <span className={"space-between"}>oder:</span>
            <button onClick={onClickBack}>zurück</button>
        </div>
    )
}
