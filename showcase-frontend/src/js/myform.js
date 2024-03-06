import { Formio, Utils } from "@formio/js";
import CustomMapComponent from "../gis-custom/gisComponent";
Formio.use(CustomMapComponent);

export class MyForm {
  constructor(formJson) {
    this.mapElement = undefined;
    this.form = this.initForm(formJson);
  }

  async initForm(formJson) {
    try {
      this.form = await Formio.createForm(
        document.getElementById("formio"),
        formJson
      );
      this.mapElement = this.form.getComponent("myMap");

      // await Utils.eachComponent(this.form.components, (component) => {
      //   console.log(component);
      // });

      if (this.mapElement && this.mapElement.getMap()) {
        // this.mapElement = this.mapElement.getMap();
        this.showAddressInput();
      }
      this.submitEvent();
    } catch (e) {
      console.log("formular error", e);
    }
  }
  getMapContainer() {
    this.form.then(() => {
      console.log("myMap", this.mapElement);
      return this.mapElement;
    });
    // return this.mapElement
}
  getSchools(url) {
    this.form.then(() => {
      if (this.mapElement && this.mapElement.getMap()) {
        this.mapElement = this.mapElement.getMap();
        this.mapElement.getAllSchool(url);
      }
    });
  }

  showAddressInput() {
    try {
      this.form.on("change", async (event) => {
        const { changed, data } = event;
        if (changed?.component.key === "address1") {
          // Entferne zuerst den aktuellen Punkt von der Karte, falls vorhanden
          this.mapElement.removeLocationFeature();
          console.log("showAddressInput", this.mapElement);
          const { address1 } = data;
          if (address1?.lon && address1?.lat) {
            const { road, house_number, postcode, city } = address1.address;
            const address = `${road} ${house_number}, ${postcode} ${city}`;
            // Setze einen Punkt auf der Karte, wenn address1 gefüllt ist
            const webMercatorCoords = [
              parseFloat(address1.lon),
              parseFloat(address1.lat),
            ];
            this.mapElement.setLocationFeature(webMercatorCoords);
          } else {
            this.mapElement.removeLocationFeature();
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
        this.mapElement.setLocationFeature(addressCoords);
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
