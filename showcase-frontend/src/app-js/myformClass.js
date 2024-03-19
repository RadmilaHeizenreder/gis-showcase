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

      this.form.on("change", (event) => {
        if (event.changed.component.key === "wohnortdeskindes-address") {
          console.log("change address", event.data["wohnortdeskindes-address"]);
          this.showChildAddress(this.map, event);
        }
        if (event.changed.component.key === "grade-level") {
          console.log("change level", event.data["grade-level"]);
          this.showSchoolsOfKind(this.map, event, urlSchoolOfKind);
        }
      });
      this.submitEvent();
    } catch (e) {
      console.log("formular error", e);
    }
  }

  /**
   * Shows the address input on the form and updates the map based on the address changes.
   */
  showChildAddress(map, event) {
    try {
      map.removeLocationFeature();
      const address = event.data["wohnortdeskindes-address"];
      if (address?.lon && address?.lat) {
        const webMercatorCoords = [
          parseFloat(address.lon),
          parseFloat(address.lat),
        ];
        map.setLocationFeature(webMercatorCoords);
      }
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
  async showSchoolsOfKind(map, event, url) {
    try {
      map.map.removeFeatures(map.featuresSchoolSource);
      const level = event.data["grade-level"];
      if (map.locationCoords && typeof level === "number") {
        const res = await fetch(url + `/${level}`);
        const schools = await res.json();
        map.createSchoolFeatures(schools);
      }
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
