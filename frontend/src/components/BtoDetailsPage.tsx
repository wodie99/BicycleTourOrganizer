import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {BtoDisplayItem} from "../model/BtoDisplayItem";
import {Markup} from "interweave";
import "../style/BtoDetailsPage.css"

type DetailsPageProps = {
    btoDisplayItems: BtoDisplayItem[];
}

export default function BtoDetailsPage({btoDisplayItems}: DetailsPageProps) {

    const {id} = useParams()
    const [btoItem, setBtoItem] = useState<BtoDisplayItem>()
    const navigate = useNavigate()

    useEffect(() => {
        let tempArray: BtoDisplayItem[] = (btoDisplayItems.filter((btoItem) => (btoItem.id === id)))
        setBtoItem(tempArray[0])
    }, [btoDisplayItems,id])

    const onClickBack = () => {
        navigate(`/`)
    }

    return (<div>
        {btoItem ?
            <div className={"details-page"}>
                <h1>{btoItem.title1}</h1>
                <h2>{btoItem.title2}</h2>
                <Markup content={btoItem.description}/>
                <hr/>
                <p>Status der Aktion: {btoItem.status}</p>
                <p>Teilnehmer: {btoItem.actionMembers} </p>
                <p> Absagen: {btoItem.actionNotMembers}</p>
            </div>
            :
            <div className={"details-page-error"}>
                <p>BtoItem not Found</p>
            </div>
        }
        <div>
            <button onClick={onClickBack}>zurück</button>
        </div>
    </div>)
}