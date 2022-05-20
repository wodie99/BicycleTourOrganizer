import { Markup } from "interweave";
import {BtoDisplayItem} from "../model/BtoDisplayItem";

type BtoUserItemsCardProps = {
    btoUserItem: BtoDisplayItem;
}

export default function BtoUserItemCard({btoUserItem}: BtoUserItemsCardProps) {

    console.log(btoUserItem.actionMembers)
    console.log(btoUserItem.actionNotMembers)

    return(
        <div className={"bto-user-item-card"}>
            <h2>Aktion: {btoUserItem.title1}</h2>
            <h3>{btoUserItem.title2}</h3>
            <h4>Status der Aktion: {btoUserItem.status}</h4>
            <h4>Teilnehmer: {btoUserItem.actionMembers}</h4>
            <h4>Absagen: {btoUserItem.actionNotMembers}</h4>
            <Markup content = {btoUserItem.description} />
        </div>
    )
}