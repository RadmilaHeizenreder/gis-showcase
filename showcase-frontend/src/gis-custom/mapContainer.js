// src/components/OpenLayersMap.js

import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

export default class OpenLayersMap {
    constructor(elementId) {
        this.mapElementId = elementId;
        this.map = null;
        this.initializeMap();
    }

    initializeMap() {
        this.map = new Map({
            target: this.mapElementId,
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            view: new View({
                center: [0, 0], // Koordinaten für die Startposition der Karte
                zoom: 2        // Start-Zoomlevel
            })
        });
    }
}
