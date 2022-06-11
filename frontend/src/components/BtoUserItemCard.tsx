import {Markup} from "interweave";
import {BtoDisplayItem} from "../model/BtoDisplayItem";
import "../style/BtoUserItemCard.css"

type BtoUserItemsCardProps = {
    btoUserItem: BtoDisplayItem;
}

export default function BtoUserItemCard({btoUserItem}: BtoUserItemsCardProps) {
    return (
        <div>
            <div className={"content"}>
                <h1>{btoUserItem.title1}</h1>
                <h2>{btoUserItem.title2}</h2>
                <Markup content={btoUserItem.description}/>
                <hr/>
                <Markup content={btoUserItem.description2}/>
            </div>
            <p>Status der Aktion: {btoUserItem.status}<br/>
            Teilnehmer: {btoUserItem.actionMembers} <br/>
            Absagen: {btoUserItem.actionNotMembers}</p>
        </div>
    )
}
