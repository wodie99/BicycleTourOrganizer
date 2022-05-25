import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {BtoDisplayItem} from "../model/BtoDisplayItem";
import {Markup} from "interweave";
import "../style/BtoDetailsPage.css"

type DetailsPageProps = {
    btoDisplayItems: BtoDisplayItem[]
    changeBtoItem: (updatedBtoItem: BtoDisplayItem) => void
}

export default function BtoDetailsPage({btoDisplayItems, changeBtoItem}: DetailsPageProps) {

    const {id} = useParams()
    const [btoItem, setBtoItem] = useState<BtoDisplayItem>()
    const navigate = useNavigate()
    const dummyUser = "U11"

    useEffect(() => {
        let tempArray: BtoDisplayItem[] = (btoDisplayItems.filter((btoItem) => (btoItem.id === id)))
        setBtoItem(tempArray[0])
    }, [btoDisplayItems, id])

    const onClickBack = () => {
        navigate(`/`)
    }

    const onClickMember = () => {
        if (btoItem) {
            if (!btoItem.actionMembers.includes(dummyUser)) {
                btoItem.actionMembers = [...btoItem.actionMembers, dummyUser]
            }
            if (btoItem.actionNotMembers.includes(dummyUser)) {
                btoItem.actionNotMembers = remove(btoItem.actionNotMembers, dummyUser)
            }
            changeBtoItem(btoItem)
        }
    }

    const onClickNoMember = () => {
        if (btoItem) {
            if (!btoItem.actionNotMembers.includes(dummyUser)) {
                btoItem.actionNotMembers = [...btoItem.actionNotMembers, dummyUser]
            }
            if (btoItem.actionMembers.includes(dummyUser)) {
                btoItem.actionMembers = remove(btoItem.actionMembers, dummyUser)
            }
            changeBtoItem(btoItem)
        }
    }

    function remove(arr: string[], item: string) {
        var index = arr.indexOf(item);
        return [
            ...arr.slice(0, index),
            ...arr.slice(index + 1)
        ];
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
            <span> Teilnehmen? </span>
            <button onClick={onClickMember}>ja</button>
            <button onClick={onClickNoMember}>nein</button>
        </div>
    </div>)
}