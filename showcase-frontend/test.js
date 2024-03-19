import { BaseButton } from "./src/base/baseButton";
import { MyForm } from "./src/js/myform";
import { Control } from "ol/control";
import {PopUp} from "./src/js/popup.overlay";

const urlGetAllSchools = import.meta.env.VITE_HOST_SCHOOLS;
const formData = await fetch(import.meta.env.VITE_FORMCONFIG);
const formJson = await formData.json();

const form = new MyForm();
await form.initForm(formJson);
// const myMap = form.mapElement.getMap();
// const popup = form.mapElement.getPopUpOverlay();
form.getSchools(urlGetAllSchools);

const routeBtn = new BaseButton("draw-line-btn", "route");

