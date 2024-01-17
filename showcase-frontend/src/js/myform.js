import { Formio } from "@formio/js";
import { MapContainer } from "./mapcontainer";
import { GisTools } from "./gis-tools";
import { Utils } from "@formio/js";

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
      await Utils.eachComponent(this.form.components, component => {
        console.log(component);
      })
      const component = await Utils.getComponent(this.form.components, 'address1')
      console.log(component);

      if (
        htmlComponent &&
        htmlComponent.component.content.includes('div class="map"')
      ) {
        this.showAddressInput();
      }
      this.submitEvent();
    } catch (e) {
      console.log("formular error", e);
    }
  }

  showAddressInput() {
    try {
      this.form.on("change", async (event) => {
        const { changed, data } = event;
        if (changed?.component.key === "address1") {
          // Entferne zuerst den aktuellen Punkt von der Karte, falls vorhanden
          this.map.removeLocationFeature();
          // this.gisTools.gisContainer.style.display = "none";
          const { address1 } = data;
          if (address1?.lon && address1?.lat) {
            const { road, house_number, postcode, city } = address1.address;
            const address = `${road} ${house_number}, ${postcode} ${city}`;
            // Setze einen Punkt auf der Karte, wenn address1 gefüllt ist
            const webMercatorCoords = [
              parseFloat(address1.lon),
              parseFloat(address1.lat),
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
      console.error("Fehler: ", error);
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
