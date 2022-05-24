import {BtoDisplayItem} from "../model/BtoDisplayItem";
import BtoDisplayItemCard from "./BtoItemCard";
import "../style/BtoItemsOverview.css"

type BtoItemsOverviewProps = {
    btoDisplayItems: BtoDisplayItem []
}

export default function BtoItemsOverview({btoDisplayItems} : BtoItemsOverviewProps){
    return(
        <div className={"bto-item-overview"}>
            {btoDisplayItems.map(item => <BtoDisplayItemCard btoDisplayItem={item} />)}
        </div>
    )
}