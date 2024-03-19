import Feature from "ol/Feature";
import { click } from "ol/events/condition";
import { LineString } from "ol/geom";
import Select from "ol/interaction/Select";
import VectorSource from "ol/source/Vector";
import Openrouteservice from "openrouteservice-js";
import Collection from "ol/Collection";
import Modify from "ol/interaction/Modify";
import { GeoJSON } from "ol/format";
import { getLength } from "ol/sphere";
import { MyStyle } from "../styles/mystyle";
import { BaseTooltip } from "../base/baseTooltip";
import { Control } from "ol/control";
import { BaseButton } from "../base/baseButton";

/**
 * Represents a service for calculating and displaying routes on a map.
 * @class
 */
export class RouteService {
  selectedRoute = undefined;
  routeResponse = undefined;
  tooltip = undefined;
  totalDistance = 0;

  constructor(map, apiRouterKey) {
    this.map = map;
    this.vectorSource = new VectorSource();
    this.routeLayer = map.addLayerToMap(this.vectorSource, MyStyle.setStyle);
    this.orsDirection = new Openrouteservice.Directions({
      api_key: apiRouterKey,
    });
    
    this.selectedFeatures = new Collection();
    this.modify = this.initModify();
    this.select = this.initSelect();
  }

  /**
   * Calculates a route based on the given start and end points, profile, parameter, and priority.
   * @param {string} startPoint - The starting point of the route.
   * @param {string} endPoint - The ending point of the route.
   * @param {string} profile - The profile to be used for route calculation.
   * @param {number} param - This parameter is used to identify the object to which the route belongs. (In this case is a schoolId.)
   * @param {number|null} prio - The priority of the object (optional). (In this case is a priority of the chosen school)
   * @returns {Promise<void>} - A promise that resolves when the route calculation is complete.
   */
  async calculateRoute(startPoint, endPoint, profile, param, prio = null) {
    try {
      if (!startPoint) {
        alert("Bitte geben Sie Ihre Wohnadresse ein!");
        return;
      }
      if (this.searchRouteByParam(this.routeLayer, param)) {
        console.log("Die Route existiert bereits");
        this.setRoutePriorityAndStyle(this.routeLayer, prio);
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
      this.routeResponse = this.createRouteFeature(response, param, prio);
      this.routeLayer.setStyle((feature) =>
        MyStyle.setStyleOnPrio(feature, feature.get("prio"))
      );
      this.showRouteOnMap(this.routeResponse, param);
      // return response;
    } catch (error) {
      console.log("formular error", error);
    }
  }

  /**
   * Creates route features based on the response, parameter, and priority. Is used in calculateRoute(...)
   * @param {Object} response - The response object containing features.
   * @param {number} param - This parameter is used to identify the object to which the route belongs. (In this case is a schoolId.)
   * @param {number} prio - The priority of the object (optional). (In this case is a priority of the chosen school)
   * @returns {Array<Feature>} An array of route features.
   */
  createRouteFeature(response, param, prio) {
    return response.features.map(
      (feature) =>
        new Feature({
          geometry: new LineString(feature.geometry.coordinates),
          segments: feature.properties.segments,
          param: param,
          prio: prio,
        })
    );
  }

  /**
   * Displays a route on the map. Is used in calculateRoute(...)
   * @param {Array} geodata - The geodata representing the route.
   * @param {number} param - This parameter is used to pass i to the measure tooltip.
   * @returns {void}
   */
  showRouteOnMap(geodata, param) {
    if (!geodata || geodata.length === 0) {
      console.error("Geodaten sind leer oder undefiniert");
      return;
    }
    const geometry = geodata[0].getGeometry();
    const [lastLon, lastLat] = geometry.getLastCoordinate();
    const [firstLon, firstLat] = geometry.getFirstCoordinate();

    const midCoords = [(firstLon + lastLon) / 2, (firstLat + lastLat) / 2];
    this.createTooltipRoute(midCoords, param); //param wird dem Routelänge übergeben
    this.vectorSource.addFeatures(geodata);
  }

  /**
   * Searches for a route by a given parameter.
   * @param {Object} route - The route object.
   * @param {string} param - The parameter to search for.
   * @returns {Object|undefined} - The route feature that matches the parameter, or undefined if not found.
   */
  searchRouteByParam(route, param) {
    const features = route.getSource().getFeatures();
    return features.find((feature) => feature.get("param") === param);
  }
  /**
   * Converts a feature object to GeoJSON format.
   * @param {ol.Feature} feature - The feature object to convert.
   * @returns {Object} The GeoJSON representation of the feature.
   */
  getGeoJson(feature) {
    const geoJSONFormat = new GeoJSON();
    return geoJSONFormat.writeGeometry(feature.getProperties().geometry);
  }
  /**
   * Sets the priority and style of a route.
   * @param {Object} route - The route object.
   * @param {number} prio - The priority value of object.
   */
  setRoutePriorityAndStyle(route, prio) {
    route.set("prio", prio);
    route.setStyle(MyStyle.setStyleOnPrio(route, prio));
  }
  /**
   * Initializes the select interaction for the router class.
   * @returns {Select} The select interaction object.
   */
  initSelect() {
    const select = new Select({
      condition: click,
      layers: [this.routeLayer],
    });
    const deleteBtn = new BaseButton("delete-line-btn", "X");
    deleteBtn.button.style.display = "none";
    this.map.addControl(new Control({ element: deleteBtn.button }));

    select.on("select", (event) => {
      if (event.selected.length > 0) {
        this.selectedRoute = event.selected[0].values_;
        this.selectedFeatures.push(event.selected[0]);
        deleteBtn.button.style.display = "block";
        deleteBtn.button.onclick = () => {
          deleteBtn.button.style.display = "none";
          this.deleteSelectedRoute();
        };
      } else {
        deleteBtn.button.style.display = "none";
      }
      if (event.deselected.length > 0) {
        this.selectedFeatures.remove(event.deselected[0]);
      }
    });
    this.map.addInteraction(select);
    return select;
  }

  /**
   * Initializes the modify functionality for the router class.
   * @returns {Modify} The modify interaction object.
   */
  initModify() {
    //modify the draw
    const modify = new Modify({
      source: this.vectorSource,
      features: this.selectedFeatures,
    });

    modify.on("modifyend", (event) => {
      const modifiedFeatures = event.features.getArray();
      modifiedFeatures.forEach((modifiedFeature) => {
        let index = this.routeResponse.findIndex(
          (feature) => feature.getId() === modifiedFeature.getId()
        );
        if (index !== -1) {
          this.routeResponse[index] = modifiedFeature;
        }
      });
      this.calculateTotalDistance(this.routeResponse);
      const lastCoordinate = this.routeResponse[0]
        .getGeometry()
        .getLastCoordinate();
      this.tooltip.updateMeasureTooltip(this.totalDistance, lastCoordinate);
    });
    this.map.addInteraction(modify);
    return modify;
  }

  /**
   * Calculates the total distance of a given route.
   * @param {Array} route - The route to calculate the distance for.
   */
  calculateTotalDistance(route) {
    this.totalDistance = 0;
    let line = 0;
    route.forEach((feature) => {
      line = getLength(feature.getGeometry(), {
        projection: "EPSG:4326",
      });
      this.totalDistance += line;
    });
    this.totalDistance = this.formatLength(line);
  }

  /**
   * Formats the length of a line.
   * @param {number} line - The length of the line in meters.
   * @returns {string} The formatted length with unit (meters or kilometers).
   */
  formatLength(line) {
    if (line > 100) {
      return Math.round((line / 1000) * 100) / 100 + " km";
    } else {
      return Math.round(line * 100) / 100 + " m";
    }
  }

  /**
   * Deletes the selected route by removing the selected features from the vector source,
   * hiding the tooltip overlay associated with each feature, and clearing the selected features.
   * Also resets the route response.
   */
  deleteSelectedRoute() {
    if (this.selectedFeatures.getLength() > 0) {
      this.selectedFeatures.forEach((feature) => {
        let param = feature.get("param");
        this.vectorSource.removeFeature(feature);
        this.tooltip.hideTooltipOverlayByParam(this.map, param);
      });
      this.selectedFeatures.clear();
      this.routeResponse = undefined;
    }
  }

  /**
   * Creates a measure tooltip route.
   * @param {Point} point - The point where the tooltip will be displayed.
   * @param {number} param - The parameter for creating the tooltip. In this case is a schoolId
   * @returns {void}
   */
  createTooltipRoute(point, param) {
    this.tooltip = new BaseTooltip(this.map);
    this.calculateTotalDistance(this.routeResponse);
    this.tooltip.createMeasureTooltip(this.map, param);
    this.tooltip.updateMeasureTooltip(this.totalDistance, point);
  }
}
