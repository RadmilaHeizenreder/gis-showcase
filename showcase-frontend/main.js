import { BaseButton } from "./src/base/baseButton";
import { MyForm } from "./src/js/myform";
import {RouteService} from "./src/js/router.service";

const urlGetAllSchools = import.meta.env.VITE_HOST_SCHOOLS;
const formData = await fetch(import.meta.env.VITE_FORMCONFIG);
const formJson = await formData.json();

const form = new MyForm(formJson, "map-container", "tools-container");
form.map.getAllSchool(urlGetAllSchools);

const apiRouteKey = import.meta.env.VITE_API_KEY;
const route = new RouteService(form.map, apiRouteKey)

// const routeBtn = new BaseButton("draw-line-btn", "route")
// form.map.addControlBtn(routeBtn.button)

// const routeBtnGis = new BaseButton("draw-line-btn", "route")
// form.gisTools.addButton(routeBtnGis.button)

const routeBtnPopup = new BaseButton("draw-line-btn", "route");
form.map.popupOverlay.appendElementToPopupContainer(routeBtnPopup.button);

routeBtnPopup.button.onclick = async () => {
    if(!form.map.locationCoords) {
        alert("Bitte geben Sie Ihre Wohnadresse ein!")
        return
    }
    const startPoint = form.map.locationCoords
    const endPoint = form.map.popupData.geometry.coordinates

    await route.calculateRoute(startPoint, endPoint, "foot-walking", form.map.popupData.id)
    route.showRouteOnMap(route.routeResponse, form.map.popupData.id)
}
