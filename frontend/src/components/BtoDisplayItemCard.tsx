import {BtoDisplayItem} from "../model/BtoDisplayItem";

type BtoDisplayItemsCardProps = {
    btoDisplayItem: BtoDisplayItem;
}

export default function BtoDisplayItemCard({btoDisplayItem}: BtoDisplayItemsCardProps) {

    return(
        <div className={"bto-display-item-card"}>
            <h1>{btoDisplayItem.titel1}</h1>
            <h2>{btoDisplayItem.titel2}</h2>

        </div>
    )

}