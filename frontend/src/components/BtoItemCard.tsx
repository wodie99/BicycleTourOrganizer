import { Markup } from "interweave";
import {BtoDisplayItem} from "../model/BtoDisplayItem";

type BtoItemsCardProps = {
    btoDisplayItem: BtoDisplayItem;
}

export default function BtoItemCard({btoDisplayItem}: BtoItemsCardProps) {

    return(
        <div className={"bto-item-card"}>
            <h1>{btoDisplayItem.title1}</h1>
            <h2>{btoDisplayItem.title2}</h2>
            <Markup content = {btoDisplayItem.description} />
        </div>
    )
}