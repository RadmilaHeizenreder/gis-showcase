import {BaseButton} from "./src/base/baseButton";
import { MyForm } from "./src/js/myform";
import { Control } from "ol/control";


const urlGetAllSchools = import.meta.env.VITE_HOST_SCHOOLS;
const formData = await fetch(import.meta.env.VITE_FORMCONFIG);
const formJson = await formData.json();
const form = new MyForm(formJson, "map-container")
form.map.getAllSchool(urlGetAllSchools)


const routeBtn = new BaseButton("draw-line-btn", "route")
form.map.addControlBtn(new Control({ element: routeBtn.button }))
