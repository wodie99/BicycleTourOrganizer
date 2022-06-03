import {BtoDisplayItem} from "../model/BtoDisplayItem";
import BtoUserItemCard from "./BtoUserItemCard";
import "../style/BtoUsersOverview.css"

type BtoUsersOverviewProps = {
    btoDisplayItems: BtoDisplayItem [];
    username: string;
}

export default function BtoUsersOverview({btoDisplayItems, username} : BtoUsersOverviewProps){
    return(
        <div className={"bto-users-overview"}>
            <h1>Darstellung eigener Aktionen - {username}:</h1>
            {btoDisplayItems.filter((item) => (item.category === "action"  &&  item.actionOwner === username))
                .map(item => <BtoUserItemCard btoUserItem={item} />)}
            <hr/>
            <h1>Aktionen an denen Du teilnimmst:</h1>
            {btoDisplayItems.filter((item) => (item.category === "action"  &&  item.actionMembers.includes(username)))
                .map(item => <BtoUserItemCard btoUserItem={item} />)}
            <hr/>
            <h1>Aktionen an denen Du nicht teilnimmst:</h1>
            {btoDisplayItems.filter((item) => (item.category === "action"  &&  item.actionNotMembers.includes(username)))
                .map(item => <BtoUserItemCard btoUserItem={item} />)}
            <hr/>
            <h2>Ende</h2>
        </div>
    )
}
