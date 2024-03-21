# GIS Showcase

Dieses Repository enthält den Code und die zugehörigen Ressourcen für das Showcase, das ein Teil meiner Bachelorarbeit zum Thema "Integration eines Geoinformationssystems (GIS) in digitale Formulare" ist. Ziel dieser Arbeit ist es, eine Brücke zwischen der geografischen Datenvisualisierung und der digitalen Formularverarbeitung zu schlagen, um die Interaktion mit räumlichen Daten in Verwaltungsprozessen zu bieten.

## Technologien

Für die Umsetzung dieses Showcases wurden folgende Technologien und Bibliotheken verwendet:

- **Form.io**: Eine leistungsstarke Bibliothek zur Erstellung und Verwaltung von digitalen Formularen.
- **OpenLayers**: Eine umfangreiche Bibliothek für die Integration und Manipulation von Karten in Webanwendungen.
- **OpenRouteService-js**: Ein JavaScript-Client für die Nutzung der OpenRouteService API zur Routenberechnung und -visualisierung.

## Struktur des Repositories

- `./showcase-frontend/`: Enthält den Quellcode des Showcases, inklusive der Integration des GIS in die Formulare.
- `./showcase-backend/`: Enthält die Geschäftslogik des Showcases.
- `./showcase-backend/src/school-address/bootstrap/geodaten_schulen.geojson`: Schuldaten, die für die Darstellung der Schulen auf der Karte sind.
- `./showcase-frontend/src/data/schulantrag.json`: Formular zur Schulanmeldung, das mit Hilfe der Formio-Bibliothek gerendert wird. Variante: Integration durch die htmlelement - Komponente
- `./showcase-frontend/src/data/gis-componente.json`: Formular zur Schulanmeldung, das mit Hilfe der Formio-Bibliothek gerendert wird. Variante: Integration durch die custom - Komponente

## Installation

#### Klone Repository:
- run `git clone https://github.com/RadmilaHeizenreder/gis-showcase.git .` in `./`

#### Installiere Abhängigkeiten:
- run `npm install` in `./showcase-backend` 
- run `npm install` in `./showcase-frontend`

#### Starte die Anwendung:
- run `npm run dev` in `./showcase-backend` 
- run `npm run start` in `./showcase-frontend`

#### Starte mit docker compose
- run `docker compose up -d` in `./`
