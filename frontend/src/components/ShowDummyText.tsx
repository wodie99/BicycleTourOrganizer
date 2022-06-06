import {BtoDisplayItem} from "../model/BtoDisplayItem";

type SetActionOwnerProps = {
    btoDisplayItem: BtoDisplayItem;
    username: string;
}

export default function ShowDummyText({btoDisplayItem, username}: SetActionOwnerProps) {

    return (
        <div>
            <h1>Infoansicht nach der Wahl</h1>
            <p>username: {username}, status: {btoDisplayItem.status}</p>
        </div>
    )
}
