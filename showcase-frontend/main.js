import { MyForm } from "./src/js/myform";


const formData = await fetch(import.meta.env.VITE_FORMCONFIG);
const formJson = await formData.json();
const form = new MyForm(formJson, "map-container")