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

  /** add feautes to map
   * if one feature than addDataToMap([feature], style)
   * return source
   */
  addDataToMap(features, style = null) {
    const source = new VectorSource({
      features: features,
    });
    const layer = new VectorLayer({
      source: source,
      visible: true,
      updateWhileAnimating: true,
      style: style,
    });
    this.addNewLayer(layer);
    return { source };
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

  /** view */
  getView() {
    this.map.getView();
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
  
  addBtn(btn) {
    this.map.addControl(btn);
  }
}
