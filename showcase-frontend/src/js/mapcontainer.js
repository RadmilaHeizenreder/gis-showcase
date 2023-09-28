import Map from "ol/Map";
import View from "ol/View";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import { useGeographic } from "ol/proj.js";

export class MapContainer {
  constructor() {
    this.map = new Map({
      target: "map-container",
      view: new View({
        center: [848815.9677932085, 6793107.086027243],
        zoom: 14,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
          visible: true,
        }),
      ],
    });
    useGeographic();
  }

  showPoint(coords) {

    // neur Vector erstellen
    // und dann als MyLocation die coords
    
  }
}