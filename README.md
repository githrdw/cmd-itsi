
# Challenge 1 ITSI
> Ruben de Wit // 18054048

# Opdracht
Ruimteschepen van SpaceX vervoeren passagiers naar Mars maar de vloten beschikken nog niet over een intuïtief systeem. Er is gevraagd een dashboard te ontwerpen voor SpaceX, wat de naam Interplanetary Transport System Interface moet krijgen.
Het dashboard moet informatie weergeven over de reis naar- en aankomst op Mars.

# Uitwerking
Ontwerpkeuzes
-------------
Dit dashboard is ontworpen voor astronauten van een ruimteschip. Omdat het besturen van een ruimteschip cruciale momenten kent (naar het schijnt) is er gekozen voor een operational dashboard.
Dit type dashboard toont realtime resultaten en statussen van het systeem zodat er snel ingegrepen kan worden.

Daarnaast is er rekening gehouden met de prioritering van elementen (links naar rechts), is er genoeg whitespace (eigenlijk darkspace in dit geval) en is de applicatie responsive.

Omdat er in het algemeen Engels gecommuniceerd wordt in de ruimtevaart is er voor gekozen dit dashboard ook in het Engels te ontwerpen.

Backend
-------
Om realtime datavisualisatie mogelijk te maken heb ik gekozen voor een WebSockets koppeling.
Het voordeel van deze dataprovider is dat de backend zelf kan beslissen wat de interval is voor het versturen van data.
Voor deze opdracht is er een externe server opgericht die de code in de map `websocket/` uitvoert in een NodeJS omgeving.
De externe websocket is te vinden op wss://school.hrdw.nl/itsi/websocket.
Voor deze opdracht wordt elke seconde een JSON-object gestuurd met onder andere de attributen speed, fuel en eta.

Frontend
--------
Om de realtime data weer te geven heb ik er voor gekozen een klasse te maken.
Deze klasse (ReactiveDOM) is in staat de inhoud van HTML elementen (die een bepaald data-attribuut bevatten) te updaten via een functie.

Daarnaast is er voor het tonen van grafieken gekozen voor het framework Chart.js.
Dit is gekozen omdat het een relatief simpel en snel framework (in tegenstelling tot bijvoorbeeld ECharts, welke dan wel weer ondersteuning heeft voor 3D canvas).
Ondanks dat de documentatie niet altijd even duidelijk was, was de broncode van het framework goed leesbaar wanneer ik ergens tegen aan liep.

Ten slotte is er ook een ItsiChart-klasse waarmee ik het maken van een grafiek heb geprobeerd te standaardiseren om zo het uitbreiden en onderhouden van dit dashboard eenvoudiger te maken.
Dat bleek echter nog een flinke klus omdat grafiek-types onderling aardig verschillen.
Desondanks ben ik best tevreden met het resultaat.