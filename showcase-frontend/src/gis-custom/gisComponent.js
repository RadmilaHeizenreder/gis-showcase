import { Components } from "@formio/js";
import { MapContainer } from "../js/mapcontainer";

export default class CustomMapComponent extends Components.components.field {
  constructor(component, options, data) {
    super(component, options, data);
    this.map = null;
  }

  render() {
    return super.render(`
      <div>
        <h3>${this.component.label}</h3>
        <div ref="myMapContainer" class="map" id="${this.component.key}-map-container"></div>
    `);
  }

  attach(element) {
    super.attach(element);

    this.map = new MapContainer(`${this.component.key}-map-container`);
    return element;
  }
  getMap() {
    if (this.map) {
      return this.map
    }
  }
}

// Registrieren des benutzerdefinierten Komponenten
Components.addComponent("customMap", CustomMapComponent);

// function isComponentRegistered(key) {
//   return Components.components.hasOwnProperty(key);
// }

// // Verwende die Funktion, um zu überprüfen, ob GisComponent registriert ist
// const isGisComponentRegistered = isComponentRegistered("customMap");
// console.log("Ist GisComponent registriert?", isGisComponentRegistered);
