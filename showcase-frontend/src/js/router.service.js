import Feature from "ol/Feature";
import { click } from "ol/events/condition";
import { LineString } from "ol/geom";
import Select from "ol/interaction/Select";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Openrouteservice from "openrouteservice-js";
import Collection from "ol/Collection";
import Modify from "ol/interaction/Modify";
import { GeoJSON } from "ol/format";
import { getLength } from "ol/sphere";
import { MyStyle } from "../styles/mystyle";

export class RouteService {
  constructor(map, apiRouterKey) {
    this.map = map;
    this.orsDirection = new Openrouteservice.Directions({
      api_key: apiRouterKey,
    });
    this.vectorSource = new VectorSource();
    this.routeLayer = this.map.addLayerToMap(
      this.vectorSource,
      MyStyle.setStyle
    );
    this.selectedRoute = undefined;
    this.routeResponse = undefined;
    this.selectedFeautres = new Collection();
  }

  async calculateRoute(startPoint, endPoint, profile, param) {
    try {
      if (!startPoint) {
        alert("Bitte geben Sie Ihre Wohnadresse ein!");
        return;
      }
      if (this.searchRouteByParam(this.routeLayer, param)) {
        console.log("Die Route existiert bereits");
        return;
      }
      const response = await this.orsDirection.calculate({
        coordinates: [startPoint, endPoint],
        profile: profile,
        extra_info: ["waytype", "steepness"],
        format: "geojson",
        api_version: "v2",
        language: "de",
      });
      this.routeResponse = this.createRouteFeature(response, param);
      this.showRouteOnMap(this.routeResponse, param)
      return response;
    } catch (error) {
      console.log("formular error", error);
    }
  }
  createRouteFeature(response, param) {
    return response.features.map(
      (feature) =>
        new Feature({
          geometry: new LineString(feature.geometry.coordinates),
          segments: feature.properties.segments,
          param: param,
        })
    );
  }
  showRouteOnMap(geodata, param) {
    if (!geodata || geodata.length === 0) {
      console.error("Geodaten sind leer oder undefiniert");
      return;
    }
    const geometry = geodata[0].getGeometry();
    const [lastLon, lastLat] = geometry.getLastCoordinate();
    const [firstLon, firstLat] = geometry.getFirstCoordinate();

    const midCoords = [(firstLon + lastLon) / 2, (firstLat + lastLat) / 2];
    //createMeasureTooltip(mitdCoords, param)
    this.vectorSource.addFeatures(geodata);
  }
  /** search route on routeVector by parameter */
  searchRouteByParam(route, param) {
    const features = route.getSource().getFeatures();
    return features.find((feature) => feature.get("param") === param);
  }
}
