import { Components } from "@formio/js";
import { MapContainer } from "../../app-js/mapcontainerClass";
const apiRouteKey = import.meta.env.VITE_API_KEY;

export default class CustomMapContainer extends Components.components
  .container {
  constructor(component, options, data) {
    super(component, options, data);
    this.map = null;
  }

  // Erstelle das HTML für die Komponente.
  render() {
    return super.render(`
      <div>
        <div class="html-container"><div id="${
          this.component.mapId || "map-container"
        }" class="map"></div></div>
      </div>
    `);
  }

  attach(element) {
    this.map = new MapContainer(
      this.component.mapId || "map-container",
      apiRouteKey,
      this.parent.parent
    );
    super.attach(element);
    return element;
  }

  // Definiere das Schema der Komponente für den Formio-Builder.
  static schema() {
    return Components.schema({
      label: "Map Container",
      type: "customMap",
      key: "myMap",
      mapId: "map-container", // Standardmäßige ID für den Map-Container
      components: [], // Hier kann man Kind-Komponenten definieren
    });
  }

  static get builderInfo() {
    return {
      title: "Custom Map Container",
      group: "advanced",
      icon: "map",
      weight: 70,
      schema: CustomMapContainer.schema(),
    };
  }
}
// Registrieren der benutzerdefinierten Komponente in Formio
Components.addComponent("customMap", CustomMapContainer);
