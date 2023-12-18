import { Formio } from "@formio/js";
import { MapContainer } from "./mapcontainer";

export class MyForm {
  constructor(formJson, target) {
    this.form = this.initForm(formJson);
    this.map = new MapContainer(target);
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

      if(htmlComponent && htmlComponent.component.content.includes('div class="map"')){
        this.getAddressInput()
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
        if (
          event.data.address1 &&
          event.data.address1.lon &&
          event.data.address1.lat
        ) {
          // Setze einen Punkt auf der Karte, wenn address1 gefüllt ist
          const webMercatorCoords = [
            parseFloat(event.data.address1.lon),
            parseFloat(event.data.address1.lat),
          ];
          this.map.setLocation(webMercatorCoords);
        } else {
          // Entferne den Punkt von der Karte, wenn address1 leer ist
          this.map.removeLocationFeature();
        }
      }
    });
  }
  updateAddressInput() {
    this.form.on('change', async event => {
      if(event.changed && event.changed.component.key === 'address1'){
        this.map.setLocation(addressCoords)
      }
    })
  }
  
}
