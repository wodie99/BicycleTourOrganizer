import {BtoDisplayItem} from "../model/BtoDisplayItem";
import BtoDisplayItemCard from "./BtoDisplayItemCard";
import BtoUserItemCard from "./BtoUserItemCard";

type BtoDisplayItemsOverviewProps = {
    btoDisplayItems: BtoDisplayItem []
}

export default function BtoDisplayItemsOverview({btoDisplayItems} : BtoDisplayItemsOverviewProps){
    return(
        <div>
            <h1><u>Übersichtsseite</u></h1>
            {btoDisplayItems.map(item => <BtoDisplayItemCard btoDisplayItem={item} />)}
            <hr/><hr/>
            <h1><u>Beispiel User Seite (hier z.B. User "U11")</u></h1>
            <h1>Darstellung eigener Aktionen:</h1>
            {btoDisplayItems.filter((item) => (item.category === "action"  &&  item.actionOwner === "U11"))
                .map(item => <BtoUserItemCard btoUserItem={item} />)}
            <hr/>
            <h1>Aktionen an denen Du teilnimmst:</h1>
            {btoDisplayItems.filter((item) => (item.category === "action"  &&  item.actionMembers.includes("U11")))
                .map(item => <BtoUserItemCard btoUserItem={item} />)}
            <hr/>
            <h1>Aktionen an denen Du nicht teilnimmst:</h1>
            {btoDisplayItems.filter((item) => (item.category === "action"  &&  item.actionNotMembers.includes("U11")))
                .map(item => <BtoUserItemCard btoUserItem={item} />)}
            <hr/>
            <h2>Ende</h2>

        </div>
    )
}