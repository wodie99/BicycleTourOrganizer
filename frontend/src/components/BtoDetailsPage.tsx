import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {BtoDisplayItem} from "../model/BtoDisplayItem";
import {Markup} from "interweave";
import "../style/BtoDetailsPage.css"
import useBtoItemStatus from "../hooks/useBtoItemStatus";
import SetActionOwner from "./SetActionOwner";
import EditActionByOwner from "./EditActionByOwner";
import Vote from "./Vote";
import {VoteSend} from "../model/VoteSend";
import {toast} from "react-toastify";
import EditActionByOwnerP4V from "./EditActionByOwnerP4V";
import printStatus from "../service/printStatus";

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
        navigate(-1)
    }

    return (
        <div>
            {btoItem ?
                <div className={"details-page"}>
                    {btoItem.actionOwner === username ? (
                            btoItem.status === "PREP4VOTE" ?
                                <EditActionByOwnerP4V
                                    btoDisplayItem={btoItem}
                                    changeBtoItem={changeBtoItem}/>
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
                                {btoItem.pictureLink && (btoItem.pictureLink.length > 0) ?
                                    <div className={"picture-frame"}>
                                        <img className={"picture-detail"} src={`${btoItem.pictureLink}`}
                                             alt="Bild aus der Stadt"/>
                                    </div>
                                    :
                                    <></>
                                }
                                <Markup content={btoItem.description}/>
                                <hr/>
                                <Markup content={btoItem.description2}/>
                            </div>
                        </div>
                    }
                    <div className={"actionInfo"}>
                        <p>AktionOwner: {btoItem.actionOwner} <br/>
                            Status der Aktion: {printStatus(btoItem.status)}</p>
                    </div>

                    {btoItem.status !== "NEW" && btoItem.status !== "PREP4VOTE" ?
                        <div className={"voteField"}>
                            <p>Nimmt an der Aktion teil:</p>
                                <ul>
                                    {btoItem.actionMembers.map((member) => (
                                        <li> {member} </li>
                                    ))}
                                </ul>
                            <p>Nimmt an der Aktion nicht teil:</p>
                            <ul>
                                {btoItem.actionNotMembers.map((member) => (
                                    <li> {member} </li>
                                ))}
                            </ul>
                        </div>
                        :
                        <></>
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
                            <p>Im Momente keine Wahl! </p>
                            <button onClick={onClickBack}>zurück</button>
                        </div>
                    }
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

