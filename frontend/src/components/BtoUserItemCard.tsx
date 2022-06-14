import {Markup} from "interweave";
import {BtoDisplayItem} from "../model/BtoDisplayItem";
import "../style/BtoUserItemCard.css"
import {useNavigate} from "react-router-dom";
import printStatus from "../service/printStatus";

type BtoUserItemsCardProps = {
    btoUserItem: BtoDisplayItem;
}

export default function BtoUserItemCard({btoUserItem}: BtoUserItemsCardProps) {
    const navigate = useNavigate();

    return (
        <div className={"bto-user-item-card"}>
            <div className={"content"}>
                <h1>{btoUserItem.title1}</h1>
                <h2>{btoUserItem.title2}</h2>
                <Markup content={btoUserItem.description}/>
                <hr/>
                <Markup content={btoUserItem.description2}/>
                <p className={"action-status"}>Status: {printStatus(btoUserItem.status)} </p>
                <button onClick={() => navigate(`../btoItem/${btoUserItem.id}`)}>Details</button>
            </div>
        </div>

    )
}
