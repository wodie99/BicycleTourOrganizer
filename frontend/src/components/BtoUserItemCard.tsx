import { Markup } from "interweave";
import {BtoDisplayItem} from "../model/BtoDisplayItem";

type BtoUserItemsCardProps = {
    btoUserItem: BtoDisplayItem;
}

export default function BtoUserItemCard({btoUserItem}: BtoUserItemsCardProps) {

    return(
        <div className={"bto-user-item-card"}>
            <h2>{btoUserItem.titel1}</h2>
            <h3>{btoUserItem.titel2}</h3>
            <h4>{btoUserItem.category}</h4>
            <Markup content = {btoUserItem.description} />
        </div>
    )
}