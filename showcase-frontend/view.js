import { MapContainer } from "./src/app-js/mapcontainerClass";
import Feature from "ol/Feature";
import LineString from "ol/geom/LineString";
import { MyStyle } from "./src/styles/mystyle";
import { BaseButton } from "./src/base/baseButton";
import { Control } from "ol/control";

const apiRouteKey = import.meta.env.VITE_API_KEY;
const urlGetSchoolsAddress = import.meta.env.VITE_HOST_SCHOOLS;
const urlGetAllRoutes = import.meta.env.VITE_HOST_ROUTES;
let featuresVector = null;

const mapView = new MapContainer("map-test");
mapView.getAllSchool(urlGetSchoolsAddress);

const allRouteBtn = new BaseButton("ol-control draw-line-btn", "Routes");
mapView.map.addControl(new Control({ element: allRouteBtn.button }));

allRouteBtn.className = "ol-control draw-line-btn";
allRouteBtn.innerHTML = "Routes";
// mapView.map.addControl(allRouteBtn);

allRouteBtn.button.onclick = async () => {
  if (allRouteBtn.button.innerHTML === "X") {
    mapView.map.removeFeatures(featuresVector);
    allRouteBtn.button.innerHTML = "routes";
  } else {
    await fetch(urlGetAllRoutes)
      .then((response) => {
        return response.json();
      })
      .then((routes) => {
        allRouteBtn.button.innerHTML = "X";
        getRoutes(routes);
      })
      .catch((error) => console.log("Fehler beim Abrufen der Daten", error));
  }
};

if (mapView.popupOverlay) {
  const routeBtn = document.createElement("button");
  routeBtn.className = "ol-control draw-line-btn";
  routeBtn.innerHTML = "Route";
  mapView.popupOverlay.appendElementToPopupContainer(routeBtn);
  // hier kommt event - zeige routen der jeweilige Schule
  routeBtn.onclick = async () => {
    if (mapView.popupData) {
      let schoolId = mapView.popupData.id;
      if (routeBtn.innerHTML === "X") {
        mapView.map.removeFeatures(featuresVector);
        routeBtn.innerHTML = "routes";
      } else {
        await fetch(urlGetAllRoutes + `/${schoolId}/school`)
          .then((response) => {
            return response.json();
          })
          .then((routes) => {
            routeBtn.innerHTML = "X";
            getRoutes(routes);
          })
          .catch((error) =>
            console.log("Fehler beim Abrufen der Daten", error)
          );
      }
    }
  };
}

function getRoutes(json) {
  const features = json.map((route) => {
    return new Feature({
      geometry: new LineString(route.route.coordinates),
      route,
    });
  });
  featuresVector = mapView.map.addFeaturesToMap(
    features,
    MyStyle.setStyleOnPrio
  );
}
