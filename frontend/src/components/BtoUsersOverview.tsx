import {BtoDisplayItem} from "../model/BtoDisplayItem";
import BtoUserItemCard from "./BtoUserItemCard";
import "../style/BtoUsersOverview.css"

type BtoUsersOverviewProps = {
    btoDisplayItems: BtoDisplayItem []
}

export default function BtoUsersOverview({btoDisplayItems} : BtoUsersOverviewProps){
    return(
        <div className={"bto-users-overview"}>
            <h1>Darstellung eigener Aktionen (Bsp. U11):</h1>
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