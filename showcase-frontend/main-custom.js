import { BaseButton } from "./src/base/baseButton";
import { MyForm } from "./src/base/gis-component/gisMyForm";
/**
 * This is the main JavaScript file for the GIS frontend project.
 * It imports various modules and classes, creates a form with a map, and handles button clicks and route calculations.
 * @module main
 */
const formData = await fetch(import.meta.env.VITE_GIS);
const formJson = await formData.json();


/** create form with map and show schools address */
const form = new MyForm(formJson);

if(form.map) {
  const deleteBtn = new BaseButton("delete-line-btn", "X");
  deleteBtn.button.style.display = "none";
  form.map.map.addControl(deleteBtn.button );  
}
