import {BtoDisplayItem} from "../model/BtoDisplayItem";

type SetActionOwnerProps = {
    btoDisplayItem: BtoDisplayItem;
    username: string;
}

export default function ShowDummyText({btoDisplayItem, username}: SetActionOwnerProps) {

    return (
        <div>
            <p>Hier ist die Komponente ShowDummyText</p>
            <p>username: {username}, status: {btoDisplayItem.status}</p>
        </div>
    )
}
