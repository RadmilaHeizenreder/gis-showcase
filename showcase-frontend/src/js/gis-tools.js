export class GisTools {
  constructor(target) {
    this.gisContainer = document.getElementById(target);
    this.addHeader("GIS");
    this.inputField = this.addInputField();
    this.addInputField();
  }
  addButton(btn) {
    this.gisContainer.appendChild(btn);
  }
  addHeader(text) {
    const header = document.createElement("h5");
    header.textContent = text;
    if (this.gisContainer) {
      this.gisContainer.appendChild(header);
    } else {
      console.log("kein Header");
    }
  }
  addInputField() {
    const inputField = document.createElement("input");
    inputField.type = "text";
    // inputField.value = value
    if (this.gisContainer) {
      this.gisContainer.appendChild(inputField);
      return inputField;
    } else {
      console.log("kein Input");
    }
  }
  addInputFieldValue(value) {
    this.inputField.value = value;
  }
}
