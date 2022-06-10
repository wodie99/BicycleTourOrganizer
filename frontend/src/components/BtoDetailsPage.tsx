import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {BtoDisplayItem} from "../model/BtoDisplayItem";
import {Markup} from "interweave";
import "../style/BtoDetailsPage.css"
import useBtoItemStatus from "../hooks/useBtoItemStatus";
import SetActionOwner from "./SetActionOwner";
import EditActionByOwner from "./EditActionByOwner";
import ShowDummyText from "./ShowDummyText";
import Vote from "./Vote";
import {VoteSend} from "../model/VoteSend";
import {toast} from "react-toastify";
import EditActionByOwnerP4V from "./EditActionByOwnerP4V";

type DetailsPageProps = {
    btoDisplayItems: BtoDisplayItem[];
    changeBtoItem: (updatedBtoItem: BtoDisplayItem) => void;
    updateVote: (id: string, voteSend: VoteSend) => void;
    username: string;
}

export default function BtoDetailsPage({btoDisplayItems, changeBtoItem, updateVote, username}: DetailsPageProps) {

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

    return (
        <div>
            {btoItem ?
                <div className={"details-page"}>
                    {btoItem.actionOwner === username ? (
                            btoItem.status === "PREP4VOTE" ?
                                <EditActionByOwnerP4V
                                    btoDisplayItem={btoItem}
                                    changeBtoItem={changeBtoItem}
                                    username={username}/>
                                :
                                <EditActionByOwner
                                    btoDisplayItem={btoItem}
                                    changeBtoItem={changeBtoItem}/>
                        )
                        :
                        <div>
                            <div className={"content"}>
                                <h1>{btoItem.title1}</h1>
                                <h2>{btoItem.title2}</h2>
                                <Markup content={btoItem.description}/>
                                <hr/>
                                <Markup content={btoItem.description2}/>
                            </div>
                            <p>Status der Aktion: {btoItem.status}</p>
                            <p>AktionOwner: {btoItem.actionOwner}</p>
                            <p>Teilnehmer: {btoItem.actionMembers}</p>
                            <p>Nicht teilnehmen: {btoItem.actionNotMembers}</p>
                        </div>
                    }
                    {btoItem.status === "NEW" ?
                        <SetActionOwner
                            btoItem={btoItem}
                            username={username}
                            changeBtoItem={changeBtoItem}
                            btoItemStatus={btoItemStatus}
                            getStatusById={getStatusById}/>
                        : <></>
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
                        <div>
                            <Vote btoItem={btoItem}
                                  username={username}
                                  updateVote={updateVote}
                                  btoItemStatus={btoItemStatus}
                                  getStatusById={getStatusById}
                            />
                        </div>
                        :
                        <div>
                            <p>AktionOwner: {btoItem.actionOwner}</p>
                            <p>Im Momente keine Wahl da Status: {btoItem.status} </p>
                            <p>
                                <button onClick={onClickBack}>zurück</button>
                            </p>
                        </div>
                    }
                    <div>
                        <button onClick={onClickStatus}>aktuellerStatus:</button>
                        <span>{btoItemStatus}</span>
                    </div>
                </div>
                :
                <div className={"details-page-error"}>
                    <p>BtoItem not Found</p>
                    <>{() => toast.error("BtoItem not found")}</>
                </div>
            }
        </div>
    )
}
