# BicycleTourOrganizer  bto

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=wodie99_BicycleTourOrganizer-backend&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=wodie99_BicycleTourOrganizer-backend)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=wodie99_BicycleTourOrganizer-backend&metric=coverage)](https://sonarcloud.io/summary/new_code?id=wodie99_BicycleTourOrganizer-backend)

Der BicycleTourOrganizer hilft bei der Organisation mehrtägiger Radtouren einer Gruppe.  
Der Organizer ist nicht für die Auswahl der Radstrecke gedacht, sondern soll Hilfe bieten, z.B. bei der Organisation der Anreise, bei Übernachtungsbuchungen oder bei der Organisation von Besuchen von Veranstaltungen während der Tour.   
Die einzelnen, jeweils zu organisierenden Punkte werden als Aktionen bezeichnet.

Planung:
Nach dem Start der Applikation meldet sich der Anwender an. Es wird ihm dann eine Übersichtsseite angezeigt, auf der eine Kurzdarstellung der geplanten Tages-Etapen angezeigt wird.  
Unter der Übersicht des Tages werden dann mögliche Aktionen des Tages aufgelistete (Anzeige einer Aktionsüberschrift, Button für weitere Details und Kennzeichen des momentanen Status).  
Nach anklicken eines Aktion-Buttons, wird die Detailseite der Aktion angezeigt. Neben der Anzeige der momentan vorhandenen Details kann hier, je nach Status der Aktion, der Teilnehmer die Organisation der Aktion übernehmen, die eigene Teilnahme an einer Aktion anmelden oder auch mitteilen, dass man an dieser Aktion nicht teilnimmt.

Auf der benutzerspezifischen Seite, werden nochmals alle Aktionen des Benutzers angezeigt, gruppiert nach:
- Aktionen, zu denen der Benutzer noch keine Rückmeldung gegeben hat
- Aktionen, die der Benutzer selber organisiert
- Aktionen an denen der Benutzer teilnimmt
- Aktionen von denen sich der Benutzer abgemeldet hat

Momentan realisiert:
Die Daten für die App sind in der MongoDB gespeichert. Angezeigt wird ein Header mit einer einfachen Navigationsleiste. 
Von hier aus kann auf die Übersichtsseite, die userspezifische Seite und die Detailsspage für Aktionen gewechselt werden.
Die Bearbeitung der Aktionen erfolgt über die Detailspage. Hier wird je nach Status und Benutzer die momentan mögliche Art der Bearbeitung angezeigt.
Um die Benutzung verschiedener Benutzer zu ermöglichen muß sich der Benutzer in der App anmelden. Hierbei wird als Sicherheitsmechanismus Spring Security mit JWT eingesetzt.
Zum Wechsel des Benutzers kann die Logout-Funktion genutzt werden.

Hinzugekommen ist nun auch die Einrichtung eines Farbschemas und ein App-Logo.
Außerdem die Möglichkeit Bilder für die Infobereiche aus dem public-Folder zu laden aber auch, dass der Actionowner ein Bild über einen Link hinzufügen kann.

Der momentane Stand ist zu sehen: [Link zu Heroku] (https://projekt-bto.herokuapp.com/) (user: AntonA; passwort: test)