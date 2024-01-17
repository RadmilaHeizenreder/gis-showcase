// https://help.form.io/developers/form-development/custom-components#header-component
import { Formio } from "@formio/js";
import {MapContainer} from "../js/mapcontainer";
const HtmlElement = Formio.Components.components.htmlelement;

export default class GisComponent extends HtmlElement {
//   static schema(...extend) {
//     return HtmlElement.schema({
//       type: "giscomponent",
//       label: "GIS",
//       key: "giscontainer",
//       mapContainerId: "map-container",
//     });
//   }
//   static get builderInfo() {
//     return {
//       title: "GIS Component",
//       icon: "code",
//       group: "layout",
//       documentation: "userguide/#html-element-component",
//       weight: 2,
//       schema: GisComponent.schema(),
//     };
//   }
  constructor(component, options, data) {
    super(component, options, data);
    this.baseMap = undefined;
  }

  // Überschreibe die build-Methode, um dein eigenes HTML zu erstellen
  build() {
    // Erstelle den Container
    this.createElement();

    const mapContainerDiv = this.ce("div", {
      class: "map",
      id: this.component.mapContainerId,
    });
    const content = this.ce("h1", null, {
        innerHTML: 'Hallo World!'
      });
    mapContainerDiv.appendChild(content)

    // Füge das mapContainer-Element zum Element der Klasse hinzu
    this.element.appendChild(mapContainerDiv);
    // this.baseMap = new MapContainer(this.component.mapContainerId)
  }
}

// Registriere deine neue Komponente bei Formio
Formio.Components.addComponent("giscomponent", GisComponent);

function isComponentRegistered(key) {
  return Formio.Components.components.hasOwnProperty(key);
}

// Verwende die Funktion, um zu überprüfen, ob GisComponent registriert ist
const isGisComponentRegistered = isComponentRegistered("giscomponent");
console.log("Ist GisComponent registriert?", isGisComponentRegistered);
