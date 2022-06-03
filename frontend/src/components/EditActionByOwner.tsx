import {BtoDisplayItem} from "../model/BtoDisplayItem";

type SetActionOwnerProps = {
    btoDisplayItem: BtoDisplayItem;
    username: string;
}

export default function EditActionByOwner({btoDisplayItem, username}: SetActionOwnerProps) {

    return (
        <div>
            <h1>Hier ist die Komponente EditActionByOwner</h1>
            <p>username: {username}, status: {btoDisplayItem.status}</p>
        </div>
    )
}
