import Map from "ol/Map";
import View from "ol/View";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { useGeographic } from "ol/proj";


export class BaseMap {
  constructor(target) {
    this.map = new Map({
      target: target,
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

  /** Adds features to the map.
   * @param {Array<Feature>} features - The features to be added to the map.
   * @param {Object} [styleOptions=null] - The style options for the features.
   * if one feature than addDataToMap([feature], style)
   * @returns {Object} - An object containing the vector source.
   */
  addDataToMap(features, style = null) {
    const source = new VectorSource({
      features: features,
    });
    this.addLayerToMap(source, style)
    return { source };
  }
  addLayerToMap(source, style=null) {
    const layer = new VectorLayer({
      source: source,
      visible: true,
      updateWhileAnimating: true,
      style: style,
    });
    this.addNewLayer(layer);
    return layer
  }
  removeFeautres(source) {
    if (source && source.source) {
      source.source.clear();
    }
  }

  /** new layer */
  addNewLayer(layer) {
    this.map.addLayer(layer);
  }
  removeLayer(layer) {
    this.map.removeLayer(layer);
  }

  /** drawing */
  addInteractionDraw(draw) {
    this.map.addInteraction(draw);
  }
  removeInteractionDraw(draw) {
    this.map.removeInteraction(draw);
  }

  /** overlay */
  addOverlayToMap(overlay) {
    this.map.addOverlay(overlay);
  }
  getOverlays() {
    this.map.getOverlays();
  }
  removeOverlay(overlay) {
    this.map.removeOverlay(overlay);
  }
  
  addControlBtn(button) {
    this.map.addControl(button);
  }
}
