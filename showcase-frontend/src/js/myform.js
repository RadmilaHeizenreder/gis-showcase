import { Formio } from "@formio/js";
import { MapContainer } from "./mapcontainer";
import { GisTools } from "./gis-tools";

export class MyForm {
  constructor(formJson, targetMap, targetGis) {
    this.form = this.initForm(formJson);
    this.map = new MapContainer(targetMap);
    this.gisTools = new GisTools(targetGis);
  }

  async initForm(formJson) {
    try {
      this.form = await Formio.createForm(
        document.getElementById("formio"),
        formJson
      );
      const htmlComponent = this.form.components.find((component) => {
        return component.type === "htmlelement";
      });

      if (
        htmlComponent &&
        htmlComponent.component.content.includes('div class="map"')
      ) {
        this.getAddressInput();
      }

      //submit()
    } catch (e) {
      console.log("formular error", e);
    }
  }

  getAddressInput() {
    this.form.on("change", async (event) => {
      if (event.changed && event.changed.component.key === "address1") {
        // Entferne zuerst den aktuellen Punkt von der Karte, falls vorhanden
        this.map.removeLocationFeature();
        // this.gisTools.gisContainer.style.display = "none";
        if (
          event.data.address1 &&
          event.data.address1.lon &&
          event.data.address1.lat
        ) {
          const enteredValue = event.data.address1.address; // Hier den eingegebenen Wert erhalten
          const address =
            enteredValue.road +
            ", " +
            enteredValue.house_number +
            ", " +
            enteredValue.postcode +
            ", " +
            enteredValue.town;
          // Setze einen Punkt auf der Karte, wenn address1 gefüllt ist
          const webMercatorCoords = [
            parseFloat(event.data.address1.lon),
            parseFloat(event.data.address1.lat),
          ];
          this.map.setLocation(webMercatorCoords);
          // this.gisTools.gisContainer.style.display = "block";
          this.gisTools.addInputFieldValue(address)
        } else {
          // Entferne den Punkt von der Karte, wenn address1 leer ist
          this.map.removeLocationFeature();
          // this.gisTools.gisContainer.style.display = "none";
        }
      }
    });
  }
  updateAddressInput() {
    this.form.on("change", async (event) => {
      if (event.changed && event.changed.component.key === "address1") {
        this.map.setLocation(addressCoords);
      }
    });
  }
  addresse;
}
