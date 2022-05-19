import { Markup } from "interweave";
import {BtoDisplayItem} from "../model/BtoDisplayItem";

type BtoUserItemsCardProps = {
    btoUserItem: BtoDisplayItem;
}

export default function BtoUserItemCard({btoUserItem}: BtoUserItemsCardProps) {

    return(
        <div className={"bto-user-item-card"}>
            <h1>{btoUserItem.titel1}</h1>
            <h2>{btoUserItem.titel2}</h2>
            <h3>{btoUserItem.category}</h3>
            <Markup content = {btoUserItem.description} />
        </div>
    )
}