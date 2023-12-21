import { useGeographic } from "ol/proj.js";
import { BaseMap } from "../base/baseMap";
import Feature from "ol/Feature";
import { Point } from "ol/geom";
import { MyStyle } from "../styles/mystyle";
import { PopUp } from "../base/basePopup";

export class MapContainer extends BaseMap {
  constructor(target) {
    super(target);
    this.locationCoords = undefined;
    this.locationLayer = undefined;
    this.popupOverlay = undefined;
    this.popupData = undefined
    this.getPopupOverlayData();
    useGeographic();
  }

  /**
   * Sets your address on the map.
   * @param {Array<number>} coords - The coordinates of the location from form's inputfield.
   */
  setLocationFeature(coords) {
    const feature = new Feature({
      geometry: new Point(coords),
    });
    this.locationLayer = this.addDataToMap([feature], MyStyle.setLocationStyle);
    this.locationCoords = coords;

    const view = this.map.getView()
    view.animate({ center: this.locationCoords, duration: 500 });
  }
  removeLocationFeature() {
    this.locationCoords = undefined;
    this.removeFeautres(this.locationLayer);
  }

  /**
   * Fetches schools data from the specified URL and adds it to the map.
   * @param {string} url - The URL to fetch the schools data from.
   * @returns {Promise<void>} - A promise that resolves when the schools data is fetched and added to the map.
   */
  getAllSchool(url) {
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((schools) => {
        const features = schools.map((school) => {
          return new Feature({
            geometry: new Point(school.geometry.coordinates),
            school,
          });
        });
        this.addDataToMap(features, MyStyle.setStyle);
      })
      .catch((error) => console.log("Fehler beim Abrufen der Daten", error));
  }
  getPopupOverlayData() {
    this.popupOverlay = new PopUp();
    this.map.on("singleclick", (event) => {
      const features = this.map.getFeaturesAtPixel(event.pixel);
      const schoolFeature = features.find((feature) => feature.values_.school);
      if (schoolFeature) {
        this.popupOverlay.showPopupOverlay(schoolFeature, event.coordinate);
        this.addOverlayToMap(this.popupOverlay.popupOverlay)
        this.popupData = schoolFeature.getProperties().school
      } else {
        this.popupOverlay.hidePopupOverlay();
      }
    });
  }
}
