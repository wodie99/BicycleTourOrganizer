import {BtoDisplayItem} from "../model/BtoDisplayItem";
import {FormEvent, useState} from "react";
import {toast} from "react-toastify";
import "./EditActionByOwner.css"
import {Markup} from "interweave";

type SetActionOwnerProps = {
    btoDisplayItem: BtoDisplayItem;
    changeBtoItem: (updatedBtoItem: BtoDisplayItem) => void;
    username: string;
}

export default function EditActionByOwner({btoDisplayItem, changeBtoItem, username}: SetActionOwnerProps) {
    const [status, setStatus] = useState(btoDisplayItem.status)
    const [description2, setDescription2] = useState(btoDisplayItem.description2)
    const [actionOwner, setActionOwner] = useState(btoDisplayItem.actionOwner)

    const onUpdate = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (status === "NEW") {
            setActionOwner("")
        }
        const updatedItem = {
            description2: description2,
            actionOwner: actionOwner,
            status: status
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
                    <h1>{btoDisplayItem.title1}</h1>
                    <label>Überschrift_2</label>
                    <h2>{btoDisplayItem.title2}</h2>
                    <label>Beschreibung_1: </label>
                    <Markup content={btoDisplayItem.description}/>
                    <label>Beschreibung nach PREP4VOTE: </label>
                    <textarea
                        value={description2}
                        onChange={event => setDescription2(event.target.value)}
                    />
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


