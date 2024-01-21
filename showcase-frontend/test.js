import {MyForm} from "./src/js/myform";

const urlGetAllSchools = import.meta.env.VITE_HOST_SCHOOLS;
const formData = await fetch(import.meta.env.VITE_FORMCONFIG);
const formJson = await formData.json();

const form = new MyForm(formJson);
form.getSchools(urlGetAllSchools)

