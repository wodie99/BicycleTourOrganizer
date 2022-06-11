import {Markup} from "interweave";
import {BtoDisplayItem} from "../model/BtoDisplayItem";
import "../style/BtoItemCard.css"
import {useNavigate} from "react-router-dom";

type BtoItemCardProps = {
    btoDisplayItem: BtoDisplayItem;
}

export default function BtoItemCard({btoDisplayItem}: BtoItemCardProps) {
    const navigate = useNavigate();

    return (<div>
            {btoDisplayItem.category === "action" ?
                <div className={"bto-item-action-card"}>
                    <div className={"action-title1"}>Aktion: {btoDisplayItem.title1}</div>
                    <div className={"action-title2"}> {btoDisplayItem.title2}</div>
                    {btoDisplayItem.pictureLink && (btoDisplayItem.pictureLink.length > 0) ?
                        <div className={"picture-frame"}>
                            <img className={"picture-action"} src={`${btoDisplayItem.pictureLink}`}
                                 alt="Bild aus der Stadt"/>
                        </div>
                        :
                        <></>
                    }
                    <p className={"action-status"}>Status: {btoDisplayItem.status} </p>
                    <button onClick={() => navigate(`btoItem/${btoDisplayItem.id}`)}>Details</button>
                </div>
                :
                <div className={"bto-item-card"}>
                    <h1>{btoDisplayItem.title1}</h1>
                    <h2>{btoDisplayItem.title2}</h2>
                    <div className={"picture-frame"}>
                        <img className={"picture-info"} src={`/images${btoDisplayItem.pictureLink}`} alt="Bild aus der Stadt"/>
                    </div>
                    <Markup content={btoDisplayItem.description}/>
                </div>
            }
        </div>
    )
}
