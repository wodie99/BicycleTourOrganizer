import {Markup} from "interweave";
import {BtoDisplayItem} from "../model/BtoDisplayItem";
import "../style/BtoUserItemCard.css"

type BtoUserItemsCardProps = {
    btoUserItem: BtoDisplayItem;
}

export default function BtoUserItemCard({btoUserItem}: BtoUserItemsCardProps) {
    const printStatus = () => {
        if (btoUserItem) {
            switch (btoUserItem.status) {
                case "NEW":
                    return "Suche nach neuem Actionowner"
                case "PREP4VOTE":
                    return "Vorbereitung zur Wahl"
                case "VOTE":
                    return "Durchführung der Wahl"
                case "PREP4FINISH":
                    return "Durchführung der Aktion"
                default:
                    return "Aktion beendet"
            }
        }
    }
    return (
        <div>
            <div className={"content"}>
                <h1>{btoUserItem.title1}</h1>
                <h2>{btoUserItem.title2}</h2>
                <Markup content={btoUserItem.description}/>
                <hr/>
                <Markup content={btoUserItem.description2}/>
            </div>
            <div className={"actionInfo"}>
                <p>AktionOwner: {btoUserItem.actionOwner} <br/>
                    Status der Aktion: {printStatus()}</p>
            </div>
            <div className={"voteField"}>
                <p>Nimmt an der Aktion teil:</p>
                <ul>
                    {btoUserItem.actionMembers.map((member) => (
                        <li> {member} </li>
                    ))}
                </ul>
                <p>Nimmt an der Aktion nicht teil:</p>
                <ul>
                    {btoUserItem.actionNotMembers.map((member) => (
                        <li> {member} </li>
                    ))}
                </ul>
            </div>
        </div>

    )
}
