import { Circle, Fill, Style, Stroke } from "ol/style";

export class MyStyle {
  static setStyle(feature) {
    const geometryType = feature.getGeometry().getType();
    switch (geometryType) {
      case "Point":
        return new Style({
          image: new Circle({
            radius: 5,
            fill: new Fill({ color: "#000000" }),
          }),
        });
      case "LineString":
        return new Style({
          stroke: new Stroke({
            color: "#4804f4db",
            width: 2,
          }),
        });
      default:
        return new Style();
    }
  }
  static setStyleOnPrio(feature) {
    let color;
    const prio = feature.get('route').prio
    switch (prio){
      case 1:
        return new Style({
          stroke: new Stroke({
            color: "#26bb0cc7",
            width: 4
          })
        })
      case 2:
        return new Style({
          stroke: new Stroke({
            color: "#f40418db",
            width: 4
          })
        })
      default:
        return new Style({
          stroke: new Stroke({
            color: "#fff000",
            width: 2
          })
        })
    }
    // return new Style({
    //   stroke: new Stroke({
    //     color: color,
    //     width: 4
    //   })
    // })
  }
  static setLocationStyle(){
    return new Style({
      image: new Circle({
        radius: 7,
        fill: new Fill({ color: "#f40418db" }),
      }),
    });
  }
}
