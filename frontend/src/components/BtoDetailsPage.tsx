import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {BtoDisplayItem} from "../model/BtoDisplayItem";
import {Markup} from "interweave";
import "../style/BtoDetailsPage.css"
import useBtoItemStatus from "../hooks/useBtoItemStatus";
import SetActionOwner from "./SetActionOwner";
import EditActionByOwner from "./EditActionByOwner";
import ShowDummyText from "./ShowDummyText";

type DetailsPageProps = {
    btoDisplayItems: BtoDisplayItem[];
    changeBtoItem: (updatedBtoItem: BtoDisplayItem) => void;
    username: string;
}

export default function BtoDetailsPage({btoDisplayItems, changeBtoItem, username}: DetailsPageProps) {

    const {id} = useParams()
    const [btoItem, setBtoItem] = useState<BtoDisplayItem>()
    const {btoItemStatus, getStatusById} = useBtoItemStatus()
    const navigate = useNavigate()

    useEffect(() => {
        setBtoItem(btoDisplayItems.find((btoItem) => (btoItem.id === id)))
    }, [btoDisplayItems, id])

    const onClickBack = () => {
        navigate(`/`)
    }

    const onClickStatus = () => {
        if (id) {
            getStatusById(id)
        }
    }

    const onClickMember = () => {
        if (btoItem) {
            if (!btoItem.actionMembers.includes(username)) {
                btoItem.actionMembers = [...btoItem.actionMembers, username]
            }
            if (btoItem.actionNotMembers.includes(username)) {
                btoItem.actionNotMembers = remove(btoItem.actionNotMembers, username)
            }
            changeBtoItem(btoItem)
        }
    }

    const onClickNoMember = () => {
        if (btoItem) {
            if (!btoItem.actionNotMembers.includes(username)) {
                btoItem.actionNotMembers = [...btoItem.actionNotMembers, username]
            }
            if (btoItem.actionMembers.includes(username)) {
                btoItem.actionMembers = remove(btoItem.actionMembers, username)
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

    return (
        <div>
            {btoItem ?
                <div className={"details-page"}>
                    {btoItem.actionOwner === username ?
                        <EditActionByOwner btoDisplayItem={btoItem} username={username}/>
                        :
                        <div>
                            <h1>{btoItem.title1}</h1>
                            <h2>{btoItem.title2}</h2>
                            <Markup content={btoItem.description}/>
                            <hr/>
                            <p>Status der Aktion: {btoItem.status}</p>
                            <p>AktionOwner: {btoItem.actionOwner}</p>
                            <p>Teilnehmer: {btoItem.actionMembers}</p>
                            <p>Nicht teilnehmen: {btoItem.actionNotMembers}</p>
                        </div>
                    }
                    {btoItem.status === "NEW" ?
                        <SetActionOwner btoDisplayItem={btoItem} username={username}/> : <></>
                    }
                    {btoItem.status === "PREP4VOTE" ?
                        <ShowDummyText btoDisplayItem={btoItem} username={username}/> : <></>
                    }
                    {btoItem.status === "PREP4FINISH" ?
                        <ShowDummyText btoDisplayItem={btoItem} username={username}/> : <></>
                    }
                    {btoItem.status === "FINISH" ?
                        <ShowDummyText btoDisplayItem={btoItem} username={username}/> : <></>
                    }
                    {btoItem.status === "VOTE" ?
                        <div className={"details-part2"}>
                            <span> Teilnehmen? </span>
                            <button onClick={onClickMember}>ja</button>
                            <button onClick={onClickNoMember}>nein</button>
                            <span className={"space-between"}>oder:</span>
                            <button onClick={onClickBack}>zurück</button>
                        </div>
                        :
                        <div>
                            <p>AktionOwner: {btoItem.actionOwner}</p>
                            <p>Im Momente keine Wahl da Status: {btoItem.status} </p>
                            <span className={"space-between"}>oder:</span>
                            <button onClick={onClickBack}>zurück</button>
                        </div>
                    }
                </div>
                :
                <div className={"details-page-error"}>
                    <p>BtoItem not Found</p>
                </div>
            }
            <div>
                <button onClick={onClickStatus}>aktuellerStatus:</button>
                <span>{btoItemStatus}</span>
            </div>
        </div>
    )
}
