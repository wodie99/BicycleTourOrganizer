import { Markup } from "interweave";
import {BtoDisplayItem} from "../model/BtoDisplayItem";

type BtoDisplayItemsCardProps = {
    btoDisplayItem: BtoDisplayItem;
}

export default function BtoDisplayItemCard({btoDisplayItem}: BtoDisplayItemsCardProps) {

    return(
        <div className={"bto-display-item-card"}>
            <h1>{btoDisplayItem.title1}</h1>
            <h2>{btoDisplayItem.title2}</h2>
            <Markup content = {btoDisplayItem.description} />
        </div>
    )
}