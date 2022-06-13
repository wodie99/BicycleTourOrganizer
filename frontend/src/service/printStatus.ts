export default function printStatus(status: string) {
    switch (status) {
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

