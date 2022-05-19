import {BtoDisplayItem} from "../model/BtoDisplayItem";
import BtoDisplayItemCard from "./BtoDisplayItemCard";
import BtoUserItemCard from "./BtoUserItemCard";


type BtoDisplayItemsOverviewProps = {
    btoDisplayItems: BtoDisplayItem []
}

export default function BtoDisplayItemsOverview({btoDisplayItems} : BtoDisplayItemsOverviewProps){
    return(
        <div>
            <h1>Übersichtsseite</h1>
            {btoDisplayItems.map(item => <BtoDisplayItemCard btoDisplayItem={item} />)}
            <h1>BeispielUserSeite</h1>
            {btoDisplayItems.filter((item) => item.category === "action")
                .map(item => <BtoUserItemCard btoUserItem={item} />)}

        </div>
    )
}