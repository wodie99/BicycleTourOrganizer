import {BtoDisplayItem} from "../model/BtoDisplayItem";
import BtoDisplayItemCard from "./BtoItemCard";
import "../style/BtoItemsOverview.css"

type BtoItemsOverviewProps = {
    btoDisplayItems: BtoDisplayItem []
}

export default function BtoItemsOverview({btoDisplayItems} : BtoItemsOverviewProps){
    return(
        <div className={"bto-item-overview"}>
            <h1><u>Übersichtsseite</u></h1>
            {btoDisplayItems.map(item => <BtoDisplayItemCard btoDisplayItem={item} />)}
            <hr/><hr/>
        </div>
    )
}