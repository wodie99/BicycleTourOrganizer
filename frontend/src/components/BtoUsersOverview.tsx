import {BtoDisplayItem} from "../model/BtoDisplayItem";
import BtoUserItemCard from "./BtoUserItemCard";
import "../style/BtoUsersOverview.css"

type BtoUsersOverviewProps = {
    btoDisplayItems: BtoDisplayItem[];
    username: string;
}

export default function BtoUsersOverview({btoDisplayItems, username}: BtoUsersOverviewProps) {

    return (<div className={"bto-users-overview"}>
            {username ?
                <div>
                    <h1>Darstellung eigener Aktionen - {username}:</h1>
                    {btoDisplayItems.filter((item) => (
                            item.category
                            && item.category === "action"
                            && item.actionOwner
                            && item.actionOwner === username))
                        .map(item => <BtoUserItemCard key={item.displayId} btoUserItem={item}/>)}
                    <hr/>
                    <h1>Noch offene Wahlmöglichkeit:</h1>
                    {btoDisplayItems.filter((item) => (
                        item.category
                        && item.category === "action"
                        && item.status === "VOTE"
                        && item.actionOwner
                        && !item.actionMembers.includes(username)
                        && !item.actionNotMembers.includes(username)))
                        .map(item => <BtoUserItemCard key={item.displayId} btoUserItem={item}/>)}
                    <hr/>
                    <h1>Aktionen an denen Du teilnimmst:</h1>
                    {btoDisplayItems.filter((item) => (
                            item.category
                            && item.category === "action"
                            && item.actionMembers
                            && item.actionMembers.includes(username)))
                        .map(item => <BtoUserItemCard key={item.displayId} btoUserItem={item}/>)}
                    <hr/>
                    <h1>Aktionen an denen Du nicht teilnimmst:</h1>
                    {btoDisplayItems.filter((item) => (
                        item.category
                        && item.category === "action"
                        && item.actionNotMembers
                        && item.actionNotMembers.includes(username)))
                        .map(item => <BtoUserItemCard key={item.displayId} btoUserItem={item}/>)}
                    <hr/>
                    <h2>Ende</h2>
                </div>
                :
                <div>
                    <p>Kein Username gefunden!</p>
                </div>
            }
        </div>
    )
}

