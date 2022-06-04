import {BtoDisplayItem} from "../model/BtoDisplayItem";
import BtoUserItemCard from "./BtoUserItemCard";
import "../style/BtoUsersOverview.css"
import useUsername from "../hooks/useUsername";

type BtoUsersOverviewProps = {
    btoDisplayItems: BtoDisplayItem [];
}

export default function BtoUsersOverview({btoDisplayItems}: BtoUsersOverviewProps) {
    const {username} = useUsername()
    console.log("Username aus BtoUserOverview: ", {username})

    return (<div className={"bto-users-overview"}>
            {username ?
                <div>
                    <h1>Darstellung eigener Aktionen - {username}:</h1>
                    {btoDisplayItems
                        .filter((item) => (item.category === "action" && item.actionOwner === username))
                        .map(item => <BtoUserItemCard btoUserItem={item}/>)}
                    <hr/>
                    <h1>Aktionen an denen Du teilnimmst:</h1>
                    {btoDisplayItems
                        .filter((item) => (item.category === "action"
                            && item.actionMembers && item.actionMembers.includes(username)))
                        .map(item => <BtoUserItemCard btoUserItem={item} />)}
                    <hr/>
                    <h1>Aktionen an denen Du nicht teilnimmst:</h1>
                    {btoDisplayItems.filter((item) => (item.category === "action"
                        &&  item.actionNotMembers &&  item.actionNotMembers.includes(username)))
                        .map(item => <BtoUserItemCard btoUserItem={item} />)}
                    <hr/>
                    <h2>Ende</h2>
                    <h1>Test</h1>
                </div>
                :
                <div>
                    <h1>Kein Username</h1>
                </div>
            }
        </div>
    )
}

