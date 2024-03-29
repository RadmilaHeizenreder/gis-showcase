import { BaseButton } from "./src/base/baseButton";
import { MyForm } from "./src/app-js/myformClass";
/**
 * This is the main JavaScript file for the GIS frontend project.
 * It imports various modules and classes, creates a form with a map, and handles button clicks and route calculations.
 * @module main
 */
const apiRouteKey = import.meta.env.VITE_API_KEY;
const formData = await fetch(import.meta.env.VITE_FORMCONFIG);
const formJson = await formData.json();


/** create form with map and show schools address */
const form = new MyForm("map-container", apiRouteKey, formJson);

if(form.map) {
  const deleteBtn = new BaseButton("delete-line-btn", "X");
  deleteBtn.button.style.display = "none";
  form.map.map.addControl(deleteBtn.button );  
}
