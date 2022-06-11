import {BtoDisplayItem} from "../model/BtoDisplayItem";
import BtoItemCard from "./BtoItemCard";
import "../style/BtoItemsOverview.css"

type BtoItemsOverviewProps = {
    btoDisplayItems: BtoDisplayItem[]
}

export default function BtoItemsOverview({btoDisplayItems} : BtoItemsOverviewProps){
    return(
        <div className={"bto-item-overview"}>
            {btoDisplayItems.sort((a,b) => a.displayId.localeCompare(b.displayId))
                .map(item => <BtoItemCard key={item.displayId} btoDisplayItem={item} />)}
        </div>
    )
}

