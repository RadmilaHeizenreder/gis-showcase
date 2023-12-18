import { useGeographic } from "ol/proj.js";
import {BaseMap} from "../base/baseMap";
import Feature from "ol/Feature";
import { Point } from "ol/geom";
import { Circle, Fill, Style } from "ol/style";
import { MyStyle } from "../styles/mystyle";

export class MapContainer extends BaseMap{
  constructor(target) {
    super(target)
    this.locationCoords = undefined;
    this.locationLayer = undefined;
    useGeographic();
  }

  /**
   * 
   * @param coords from myForm address input
   * get a point on map 
   */
  setLocation(coords) {
    const feature = new Feature({
      geometry: new Point(coords)
    })
    const style = new Style({
      image: new Circle({
        radius: 7,
        fill: new Fill({ color: "#f40418db" }),
      }),
    })
    this.locationLayer = this.addDataToMap([feature], style)
    this.locationCoords = coords

    const view = this.map.getView()
    view.animate({center: this.locationCoords, duration: 500})
  }
  removeLocationFeature() {
    this.locationCoords = undefined
    this.removeFeautres(this.locationLayer)
  }

  /**
   * get all schools
   */
  getAllSchool(url){
    fetch(url)
    .then(res => {
      return res.json()
    })
    .then(schools => {
      const features = schools.map(school => {
        return new Feature({
          geometry: new Point(school.geometry.coordinates),
          school
        })
      })
      this.addDataToMap(features, MyStyle.setStyle)
    })
  }

}