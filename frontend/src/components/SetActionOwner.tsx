import {BtoDisplayItem} from "../model/BtoDisplayItem";

type SetActionOwnerProps = {
    btoDisplayItem: BtoDisplayItem;
    username: string;
}

export default function SetActionOwner({btoDisplayItem, username}: SetActionOwnerProps) {

    return (
        <div>
            <p>Hier ist die Komponente SetActionOwner</p>
            <p>username: {username}, status: {btoDisplayItem.status}</p>
        </div>
    )
}
