import { Formio } from "@formio/js";
import { MapContainer } from "./mapcontainerClass";
const urlSchoolOfKind = import.meta.env.VITE_HOST_SCHOOLS;
const urlSubmission = import.meta.env.VITE_HOST_SUBMISSION;
/**
 * Represents a form with map functionality as GIS in a Formio.Components.HTMLElement.
 * @class
 */
export class MyForm {
  map = undefined;

  /**
   * Creates an instance of MyForm.
   * @constructor
   * @param {Object} formJson - The JSON object representing the form.
   * @param {string} targetMap - The target map element ID.
   */
  constructor(targetMap, options = null, formJson) {
    this.form = this.initForm(targetMap, options, formJson);
  }

  /**
   * Creates the form and renders it on the user interface.
   * @async
   * @param {Object} formJson - The JSON object representing the form.
   * @returns {Promise<Object>} - A promise that resolves to the initialized form object.
   */
  async initForm(targetMap, options, formJson) {
    try {
      this.form = await Formio.createForm(
        document.getElementById("formio"),
        formJson
      );

      this.map = new MapContainer(targetMap, options, this.form);

      const childAddressComponent = this.form.getComponent(
        "wohnortdeskindes-address"
      );
      if (childAddressComponent) {
        this.showChildAddress(childAddressComponent);
      }

      const gradeLevelComponent = this.form.getComponent("grade-level");
      if (gradeLevelComponent) {
        this.showSchoolsOfKind(gradeLevelComponent, urlSchoolOfKind);
      }
      console.log(this.form._form);
      this.submitEvent();
    } catch (e) {
      console.log("formular error", e);
    }
  }

  /**
   * Shows the address input on the form and updates the map based on the address changes.
   */
  showChildAddress(addressComponent) {
    try {
      addressComponent.on("change", (changed) => {
        this.map.removeLocationFeature();
        const address = changed.data["wohnortdeskindes-address"];
        if (address?.lon && address?.lat) {
          const webMercatorCoords = [
            parseFloat(address.lon),
            parseFloat(address.lat),
          ];
          this.map.setLocationFeature(webMercatorCoords);
        } else {
          this.map.removeLocationFeature();
          this.map.map.removeFeatures(this.map.featuresSchoolSource);
        }
      });
    } catch (error) {
      console.error("Fehler: ", error);
    }
  }
  /**
   * Shows schools of a specific grade level based on user input.
   *
   * @param {Object} gradeComponente - The grade component object.
   * @param {string} url - The URL to fetch the schools data from.
   */
  showSchoolsOfKind(gradeComponente, url) {
    try {
      gradeComponente.on("change", async (changed) => {
        // this.map.map.removeFeatures(this.map.featuresSchoolSource);
        const level = changed.data["grade-level"];
        if (this.map.locationCoords && typeof level === "number") {
          const res = await fetch(url + `/${level}`);
          const schools = await res.json();
          this.map.createSchoolFeatures(schools);
        }
      });
    } catch (error) {
      console.error("Fehler: ", error);
    }
  }

  /**
   * Handles the form submission event.
   */
  submitEvent() {
    this.form.on("submit", async (submit) => {
      console.log("submission", submit);
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
      try {
        const response = await fetch(urlSubmission, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submitData),
        });
        if (response) {
          alert("Der Antrag wurde abgeschickt");
        }
      } catch (error) {
        console.log("Fehler beim Antrag senden", error);
      }
    });
  }
}
