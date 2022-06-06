import {Markup} from "interweave";
import {BtoDisplayItem} from "../model/BtoDisplayItem";

type BtoUserItemsCardProps = {
    btoUserItem: BtoDisplayItem;
}

export default function BtoUserItemCard({btoUserItem}: BtoUserItemsCardProps) {
    return (
        <div className={"bto-user-item-card"}>
            <h2>Aktion: {btoUserItem.title1}</h2>
            <h3>{btoUserItem.title2}</h3>
            <div>
                <Markup content={btoUserItem.description}/>
            </div>
            <h4>Status der Aktion: {btoUserItem.status}</h4>
            <span><b>Teilnehmer: {btoUserItem.actionMembers} </b></span>
            <span><b> Absagen: {btoUserItem.actionNotMembers}</b></span>

        </div>
    )
}
