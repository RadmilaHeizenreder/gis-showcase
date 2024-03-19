import { BaseMap } from "../base/baseMap";
import Feature from "ol/Feature";
import { Point } from "ol/geom";
import { MyStyle } from "../styles/mystyle";
import { PopUp } from "../base/basePopup";
import { Filter } from "../base/baseFilter";
import { RouteService } from "./routerClass";
import { BaseButton } from "../base/baseButton";

/**
 * Represents a MapContainer class that manages the map and its features.
 */
export class MapContainer {
  locationCoords = undefined;
  locationLayer = undefined;
  popupOverlay = undefined;
  popupData = undefined;
  featuresSchoolSource = undefined;
  featuresSchool = [];
  myFilter = null;
  data = {};

  /**
   * Creates an instance of MapContainer.
   * @param {string} target - The target element ID where the map will be rendered.
   * @example <div class="map" id="map-container"></div>
   */
  constructor(target, options = null, form=null) {
    this.form = form
    this.map = new BaseMap(target); //MapContainer uses BaseMap class
    this.route = new RouteService(this.map, options);
    this.getPopupOverlayData();
  }

  /**
   * Sets the location feature on the map.
   * @param {Array<number>} coords - The coordinates of the location from the form's input field.
   */
  setLocationFeature(coords) {
    const feature = new Feature({
      geometry: new Point(coords),
    });
    this.locationLayer = this.map.addFeaturesToMap(
      [feature],
      MyStyle.setLocationStyle
    );
    this.locationCoords = coords;

    const view = this.map.getView();
    view.animate({ center: this.locationCoords, duration: 500 });
  }

  /**
   * Removes the location feature from the map.
   */
  removeLocationFeature() {
    this.locationCoords = undefined;
    this.map.removeFeatures(this.locationLayer);
  }

  /**
   * Fetches schools data from the specified URL and adds it to the map.
   * @param {string} url - The URL to fetch the schools data from.
   * @returns {Promise<void>} - A promise that resolves when the schools data is fetched and added to the map.
   */
  async getAllSchool(url) {
    try {
      const res = await fetch(url);
      const schools = await res.json();
      this.createSchoolFeatures(schools);
    } catch (error) {
      console.log("Fehler beim Abrufen der Daten", error);
    }
  }

  async createSchoolFeatures(schools) {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    this.featuresSchool = schools.map((school) => {
      return new Feature({
        geometry: new Point(school.geometry.coordinates),
        school,
      });
    });
    if (this.locationCoords) {
      this.showFilter(this.featuresSchool, this.locationCoords);
    }
    this.featuresSchoolSource = this.map.addFeaturesToMap(
      this.featuresSchool,
      MyStyle.setStyle
    );
  }

  showFilter(feature, coords) {
    if (this.myFilter) {
      this.map.removeControl(this.myFilter);
    }
    this.myFilter = new Filter({
      map: this.map,
      myLocationCoords: coords,
      features: feature,
    });
    this.map.addControl(this.myFilter);
  }

  /**
   * Sets up the popup overlay for the school information and handles the click event on the map.
   */
  getPopupOverlayData() {
    this.popupOverlay = new PopUp();
    this.createPopupButtons();
    this.map.on("singleclick", (event) => {
      const features = this.map.getFeaturesAtPixel(event.pixel);
      const schoolFeature = features.find((feature) => feature.values_.school);
      if (schoolFeature) {
        this.popupOverlay.showPopupOverlay(schoolFeature, event.coordinate);
        this.map.addOverlay(this.popupOverlay);
        this.popupData = schoolFeature.getProperties().school;
      } else {
        this.popupOverlay.hidePopup();
      }
    });
  }

  createPopupButtons() {
    const routeBtn = new BaseButton("draw-line-btn", "Route");
    const firstChooseBtn = new BaseButton("choice-line-btn choice1", "1.Wahl");
    const secondChooseBtn = new BaseButton("choice-line-btn choice2", "2.Wahl");
    /** adds the buttons on the popupOverlay*/
    this.popupOverlay.appendElementToPopupContainer(routeBtn.button);
    this.popupOverlay.appendElementToPopupContainer(firstChooseBtn.button);
    this.popupOverlay.appendElementToPopupContainer(secondChooseBtn.button);

    routeBtn.button.onclick = async () => {
      await this.calculateOneRoute("foot-walking");
    };
    firstChooseBtn.button.onclick = async () => {
      this.handleChooseBtn("foot-walking", 1);
    };
    secondChooseBtn.button.onclick = async () => {
      this.handleChooseBtn("foot-walking", 2);
    };
  }

  /**
   * Calculates a single route using the specified profile.
   * @param {Route} route - The route object.
   * @param {string} profile - The profile to use for route calculation.
   * @returns {Promise<void>} - A promise that resolves when the route calculation is complete.
   */
  async calculateOneRoute(profile) {
    await this.route.calculateRoute(
      this.locationCoords,
      this.popupData.geometry.coordinates,
      profile,
      this.popupData.id
    );
  }

  /**
   * Handles the click event of the choose button.
   * @param {Object} form - The form object.
   * @param {Object} route - The route object.
   * @param {string} profile - The profile of the route (foot-walking).
   * @param {number} prio - The priority value.
   * @returns {Promise<void>} - A promise that resolves when the function finishes executing.
   */
  async handleChooseBtn(profile, prio) {
    let routeToSave = this.route.searchRouteByParam(
      this.route.routeLayer,
      this.popupData.id
    );
    if (!routeToSave) {
      await this.calculateOneRoute(profile)
      routeToSave = this.route.routeResponse[0];
    } else {
      this.route.setRoutePriorityAndStyle(routeToSave, prio);
    }
    this.chooseSchool(routeToSave, prio);
  }

  /**
   * Chooses a school and sets the route and description in the form.
   * @param {Form} form - The form object.
   * @param {Route} route - The route object.
   * @param {RouteFeature} routeFeature - The route feature object.
   * @param {string} schoolId - The ID of the school.
   * @param {number} prio - The priority of the school.
   */
  chooseSchool(routeFeature, prio) {
    try {
      const schoolAddress = this.popupData.name + ", " + this.popupData.address;
      const routeGeometry = this.route.getGeoJson(routeFeature);
      this.data = {
        schoolId: this.popupData.id,
        schoolAddress: schoolAddress,
        routeFeature: routeGeometry,
        prio: prio,
      };
      this.setRouteAndDescription(this.data);
    } catch (error) {
      console.error("Schule nicht übernommen:", error);
    }
  }

  setRouteAndDescription(data) {
    if (this.form) {
      console.log(data);
      const schoolKey = `choice${data.prio}`;
      const routeKey = `route${data.prio}`;
      const schoolIdKey = `schoolId${data.prio}`;

      const schoolField = this.form.getComponent(schoolKey); // die Adresse der Schule
      const routeHidden = this.form.getComponent(routeKey); // route vom myLocation bis zur Schule
      const schoolIdHidden = this.form.getComponent(schoolIdKey); // id der gewählte Schule
      if (schoolField && routeHidden) {
        schoolField.setValue(data.schoolAddress);
        routeHidden.setValue(data.routeFeature);
        schoolIdHidden.setValue(data.schoolId);
      }
    }
  }
}
