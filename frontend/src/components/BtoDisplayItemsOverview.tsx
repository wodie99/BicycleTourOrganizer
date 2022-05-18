import {BtoDisplayItem} from "../model/BtoDisplayItem";
import BtoDisplayItemCard from "./BtoDisplayItemCard";


type BtoDisplayItemsOverviewProps = {
    btoDisplayItems: BtoDisplayItem []
}

export default function BtoDisplayItemsOverview({btoDisplayItems} : BtoDisplayItemsOverviewProps){
    return(
        <div>
            {btoDisplayItems.map(item => <BtoDisplayItemCard btoDisplayItem={item} />)}

        </div>
    )
}