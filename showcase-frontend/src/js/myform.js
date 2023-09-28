import { Formio } from '@formio/js';
import {MapContainer} from "./mapcontainer";

export class MyForm {
  
  constructor() {
    this.initForm();
    this.map = new MapContainer()
  }

  async initForm() {
    try {
      const form = await Formio.createForm(document.getElementById("formio"), {
        components: [
          {
            label: "Anrede",
            widget: "choicesjs",
            tooltip: "Bitte geben Sie Anrede des Kindes an.",
            tableView: true,
            data: {
              values: [
                {
                  label: "Frau",
                  value: "1",
                },
                {
                  label: "Herr",
                  value: "2",
                },
                {
                  label: "Divers",
                  value: "3",
                },
                {
                  label: "Keine Angaben",
                  value: "999",
                },
              ],
            },
            validate: {
              required: true,
            },
            key: "Anrede",
            type: "select",
            applyMaskOn: "change",
            input: true,
          },
          {
            label: "Address",
            tableView: false,
            provider: "nominatim",
            key: "address1",
            type: "address",
            providerOptions: {
              params: {
                autocompleteOptions: {},
              },
            },
            validate: {
              required: true,
            },
            input: true,
            components: [
              {
                label: "Address 1",
                tableView: false,
                key: "address1",
                type: "textfield",
                input: true,
                customConditional:
                  "show = _.get(instance, 'parent.manualMode', false);",
              },
              {
                label: "Address 2",
                tableView: false,
                key: "address2",
                type: "textfield",
                input: true,
                customConditional:
                  "show = _.get(instance, 'parent.manualMode', false);",
              },
              {
                label: "City",
                tableView: false,
                key: "city",
                type: "textfield",
                input: true,
                customConditional:
                  "show = _.get(instance, 'parent.manualMode', false);",
              },
              {
                label: "State",
                tableView: false,
                key: "state",
                type: "textfield",
                input: true,
                customConditional:
                  "show = _.get(instance, 'parent.manualMode', false);",
              },
              {
                label: "Country",
                tableView: false,
                key: "country",
                type: "textfield",
                input: true,
                customConditional:
                  "show = _.get(instance, 'parent.manualMode', false);",
              },
              {
                label: "Zip Code",
                tableView: false,
                key: "zip",
                type: "textfield",
                input: true,
                customConditional:
                  "show = _.get(instance, 'parent.manualMode', false);",
              },
            ],
          },
          {
            label: "HTML",
            tag: "div",
            attrs: [
              {
                attr: "",
                value: "",
              },
            ],
            content: '<h2>Map</h2>\n<div class="map" id="map-container"></div>',
            refreshOnChange: false,
            key: "html",
            // "customConditional": "document.addEventListener('customEvent', () => {\n  console.log('Ich bin in html-component');\n  \n  \n});",
            type: "htmlelement",
            input: false,
            tableView: false,
          },
        ],
      })
        // .then((form) => { // weil oben await ist schon da
          // Event-Listener für Formulardatenänderungen
          form.on("change", async (event) => {
            if (event.changed && event.changed.component.key === "address1") {
              const enteredValue = event.data.address1.address; // Hier den eingegebenen Wert erhalten
              console.log(
                "Eingegebene Adresse:",
                enteredValue.road,
                enteredValue.house_number + ",",
                enteredValue.postcode,
                enteredValue.town
              );
              address = event.data.address1;
              console.log(address);
              console.log("Adress ... -", address.address);

              const longitude = parseFloat(address.lon);
              const latitude = parseFloat(address.lat);
              // console.log(longitude, latitude);
              const webMercatorCoords = [longitude, latitude];
              this.map.showPoint(webMercatorCoords);
            }
          });
        // })
    } catch (e) {
      console.log("formular errro", e);
    }
  }
}
