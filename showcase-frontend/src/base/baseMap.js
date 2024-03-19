import Map from "ol/Map";
import View from "ol/View";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { useGeographic } from "ol/proj";
import { ScaleLine, FullScreen, ZoomSlider } from "ol/control";


/**
 * visualizes a map and extends all methods and functions of the ol.Map
 * @extends Map
 */
export class BaseMap extends Map {
  /**
   * Constructs a new BaseMap object.
   * @param {string} target - The target element ID where the map will be rendered.
   */
  constructor(target) {
    super({
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
      controls: [
        new FullScreen(),
        new ScaleLine(),
        new ZoomSlider()
      ]
    });
    useGeographic();
  }

  /**
   * Adds features to the map.
   * @param {Array} features - The features to be added to the map.
   * @param {Object} style - The style to be applied to the features (optional).
   * @returns {Object} - The source object containing the added features.
   */
  addFeaturesToMap(features, style = null) {
    const source = new VectorSource({
      features: features,
    });
    this.addLayerToMap(source, style);
    return { source };
  }

  /**
   * Adds a layer to the map.
   * @param {Object} source - The source object containing the layer features.
   * @param {Object} style - The style to be applied to the layer (optional).
   * @returns {Object} - The added layer object.
   */
  addLayerToMap(source, style = null) {
    const layer = new VectorLayer({
      source: source,
      visible: true,
      updateWhileAnimating: true,
      style: style,
    });
    this.addLayer(layer);
    return layer;
  }

  /**
   * Removes features from the specified source.
   * @param {Object} source - The source object from which features will be removed.
   */
  removeFeatures(source) {
    if (source && source.source) {
      source.source.clear();
    }
  }
}
