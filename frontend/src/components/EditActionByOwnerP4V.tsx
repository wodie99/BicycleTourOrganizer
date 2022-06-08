import {BtoDisplayItem} from "../model/BtoDisplayItem";
import {FormEvent, useState} from "react";
import {toast} from "react-toastify";
import "./EditActionByOwnerP4V.css"
import {Markup} from "interweave";

type SetActionOwnerP4VProps = {
    btoDisplayItem: BtoDisplayItem;
    changeBtoItem: (updatedBtoItem: BtoDisplayItem) => void;
    username: string;
}

export default function EditActionByOwnerP4V({btoDisplayItem, changeBtoItem, username}: SetActionOwnerP4VProps) {

    const [title1, setTitle1] = useState(btoDisplayItem.title1)
    const [title2, setTitle2] = useState(btoDisplayItem.title2)
    const [status, setStatus] = useState(btoDisplayItem.status)
    const [actionOwner, setActionOwner] = useState(btoDisplayItem.actionOwner)
    const [description, setDescription] = useState(btoDisplayItem.description)


    const onUpdate = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!title1) {
            toast.error("Title1 is required");
            return
        }
        if (status === "NEW") {
            setActionOwner("")
        }
        const updatedItem = {
            title1: title1,
            title2: title2,
            description: description,
            status: status,
            actionOwner: actionOwner
        }
        changeBtoItem({...btoDisplayItem, ...updatedItem})
    }
    return (
        <div>
            <h1>Editpage für ActionOwner</h1>
            <p>username: {username}</p>
            <div>
                <form onSubmit={onUpdate} className={"input-elements"}>
                    <label>Die Felder Überschrift_1, Überschrift_2 und Beschreibung_1 sind nur im Status 'Vorbereitung
                        zur Wahl' editierbar</label>
                    <label>Überschrift_1</label>
                    <input type={"text"} placeholder="Add a new item" value={title1}
                           onChange={event => setTitle1(event.target.value)}/>
                    <label>Überschrift_2</label>
                    <input type={"text"} placeholder="Add a new item" value={title2}
                           onChange={event => setTitle2(event.target.value)}/>
                    <label>Beschreibung_1: </label>
                    <textarea
                        value={description}
                        onChange={event => setDescription(event.target.value)}
                    />
                    <label>Beschreibung - Edit after Vote: </label>
                    <Markup content={btoDisplayItem.description2}/>
                    <label>Status: </label>
                    <select
                        value={status}
                        onChange={event => setStatus(event.target.value)}
                    >
                        <option selected value="{status}">{status}</option>
                        <option value="NEW">Zurücksetzen auf Auswahl ActionOwner</option>
                        <option value="PREP4VOTE">Vorbereitungen zur Wahl</option>
                        <option value="VOTE">Wahl</option>
                        <option value="PREP4FINISH">Bearbeitung nach Wahl</option>
                        <option value="FINISH">Beendet</option>
                    </select>
                    <p>.</p>
                    <input type={"submit"} value={"Einträge übernehmen"}/>
                </form>

            </div>
        </div>
    )
}

