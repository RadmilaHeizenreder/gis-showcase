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
      this.submitEvent()
    } catch (e) {
      console.log("formular error", e);
    }
  }

  getAddressInput() {
    try {
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
            console.log(enteredValue);
            const address =
              enteredValue.road +
              ", " +
              enteredValue.house_number +
              ", " +
              enteredValue.postcode + enteredValue.city;
            // Setze einen Punkt auf der Karte, wenn address1 gefüllt ist
            const webMercatorCoords = [
              parseFloat(event.data.address1.lon),
              parseFloat(event.data.address1.lat),
            ];
            this.map.setLocationFeature(webMercatorCoords);
            // this.gisTools.gisContainer.style.display = "block";
            this.gisTools.addInputFieldValue(address);
          } else {
            this.map.removeLocationFeature();
            // this.gisTools.gisContainer.style.display = "none";
            // alle erstellten routen müssen entfernt werden
          }
        }
      });
    } catch (error) {
      console.error("Fehler: ", error)
    }
    
  }
  updateAddressInput() {
    this.form.on("change", async (event) => {
      if (event.changed && event.changed.component.key === "address1") {
        this.map.setLocationFeature(addressCoords);
      }
    });
  }
  submitEvent() {
    this.form.on("submit", async (submit) => {
      const submitData = {
        submission: {
          anrede: submit.data.anrede,
          addresse: submit.data.address1,
        },
        routes: [
          {
            schoolId: submit.data.schoolId1,
            route: JSON.parse(submit.data.route1),
            prio: submit.data.prio1,
          },
          {
            schoolId: submit.data.schoolId2,
            route: JSON.parse(submit.data.route2),
            prio: submit.data.prio2,
          },
        ],
      };
      await fetch("http://localhost:3031/submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      })
        .then((response) => {
          return response;
        })
        .catch((err) => console.error("Fehler: ", err));
    });
  }
}
