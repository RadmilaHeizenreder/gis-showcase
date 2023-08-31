function toogleContainers() {
  document.getElementById("info-container").style.display = "none";
  document.getElementById("antrag-container").style.display = "block";
  var event = new Event("customEvent");
  document.dispatchEvent(event);
}

Formio.createForm(document.getElementById("formio"), {
  components: [
    {
      "label": "Address",
      "tableView": false,
      "provider": "nominatim",
      "key": "address1",
      "type": "address",
      "providerOptions": {
        "params": {
          "autocompleteOptions": {}
        }
      },
      "input": true,
      "components": [
        {
          "label": "Address 1",
          "tableView": false,
          "key": "address1",
          "type": "textfield",
          "input": true,
          "customConditional": "show = _.get(instance, 'parent.manualMode', false);"
        },
        {
          "label": "Address 2",
          "tableView": false,
          "key": "address2",
          "type": "textfield",
          "input": true,
          "customConditional": "show = _.get(instance, 'parent.manualMode', false);"
        },
        {
          "label": "City",
          "tableView": false,
          "key": "city",
          "type": "textfield",
          "input": true,
          "customConditional": "show = _.get(instance, 'parent.manualMode', false);"
        },
        {
          "label": "State",
          "tableView": false,
          "key": "state",
          "type": "textfield",
          "input": true,
          "customConditional": "show = _.get(instance, 'parent.manualMode', false);"
        },
        {
          "label": "Country",
          "tableView": false,
          "key": "country",
          "type": "textfield",
          "input": true,
          "customConditional": "show = _.get(instance, 'parent.manualMode', false);"
        },
        {
          "label": "Zip Code",
          "tableView": false,
          "key": "zip",
          "type": "textfield",
          "input": true,
          "customConditional": "show = _.get(instance, 'parent.manualMode', false);"
        }
      ]
    },
    {
      "label": "HTML",
      "tag": "div",
      "attrs": [
        {
          "attr": "",
          "value": ""
        }
      ],
      "content": "<h2>Map</h2>\n<div class=\"map\" id=\"map-container\" style=\"height: 500px;width: 750;border: 5px solid #000;font-family: Arial, Helvetica, sans-serif;\"></div>",
      "refreshOnChange": false,
      "key": "html",
      // "customConditional": "document.addEventListener('customEvent', () => {\n  console.log('Ich bin in html-component');\n  \n  \n});",
      "type": "htmlelement",
      "input": false,
      "tableView": false
    },
  ],
})
  .then((form) => {
    // Event-Listener für Formulardatenänderungen
    form.on("change", async (event) => {
      if (event.changed && event.changed.component.key === "address1") {
        const enteredValue = event.data.address1.address; // Hier den eingegebenen Wert erhalten
        console.log(
          "Eingegebene Adresse:",
          enteredValue.road,
          enteredValue.house_number + ",",
          enteredValue.postcode,
          enteredValue.city
        );
        const address = event.data.address1
        console.log(address);

        const longitude = parseFloat(address.lon);
        const latitude = parseFloat(address.lat);
        console.log(longitude, latitude);
        const webMercatorCoords = [longitude, latitude]
        document.dispatchEvent(new CustomEvent('setMyLocation', { detail: { coords: webMercatorCoords } }))
        // hubraum, 21, Winterfeldtstraße, Schöneberg, Tempelhof-Schöneberg, Berlin, 10781, Deutschland

      }
    });
  })
  .catch((err) => {
    console.log(err);
  });

/* 
   {
      label: "Tabs",
      components: [
        {
          label: "Schulpflichtige Person",
          key: "tab1",
          components: [
            {
              title: "Schulpflichtige Person",
              breadcrumbClickable: true,
              buttonSettings: {
                previous: true,
                cancel: true,
                next: true,
              },
              navigateOnEnter: false,
              saveOnEnter: false,
              scrollToTop: false,
              collapsible: false,
              key: "panel-Schulpflichtige",
              type: "panel",
              label: "Schulpflichtige Person",
              persistent: true,
              clearOnHide: true,
              input: true,
              tree: true,
              tableView: true,
              inDataGrid: true,
              components: [
                {
                  title: "",
                  collapsible: false,
                  hideLabel: true,
                  key: "schulpflichtigePerson",
                  type: "panel",
                  label: "Panel",
                  input: false,
                  tableView: false,
                  components: [
                    {
                      label: "Columns",
                      input: false,
                      tableView: false,
                      key: "panelSchulpflichtigeColumns",
                      columns: [
                        {
                          components: [
                            {
                              label: "Anrede",
                              tooltip: "Bitte geben Sie Anrede des Kindes an.",
                              tableView: true,
                              data: {
                                values: [
                                  {
                                    value: 1,
                                    label: "Frau",
                                  },
                                  {
                                    value: 2,
                                    label: "Herr",
                                  },
                                  {
                                    value: 3,
                                    label: "Divers",
                                  },
                                  {
                                    value: 999,
                                    label: "Keine Angabe",
                                  },
                                ],
                              },
                              validate: {
                                required: true,
                              },
                              key: "anredeSchulpflichtige",
                              properties: {
                                "XDF-ID": "G05003718G05004392F05000352",
                              },
                              type: "select",
                              inputType: "textfield",
                              input: true,
                            },
                          ],
                          width: 6,
                          offset: 0,
                          push: 0,
                          pull: 0,
                          size: "md",
                          currentWidth: 6,
                        },
                        {
                          components: [],
                          width: 6,
                          offset: 0,
                          push: 0,
                          pull: 0,
                          size: "md",
                          currentWidth: 6,
                        },
                      ],
                      type: "columns",
                      hideLabel: true,
                    },
                    {
                      label: "Columns",
                      input: false,
                      tableView: false,
                      key: "panelG05003718G5004393Columns3",
                      columns: [
                        {
                          components: [
                            {
                              type: "textfield",
                              inputType: "textfield",
                              input: true,
                              tableView: true,
                              properties: {
                                "XDF-ID": "G05003718G05004392F60000227",
                              },
                              label: "Familienname",
                              tooltip:
                                "Geben Sie den Nachnamen, Familiennamen bzw. Zunamen an.",
                              key: "familiennameSchulpflichtige",
                              validate: {
                                required: true,
                                minLength: "1",
                                maxLength: "120",
                              },
                            },
                          ],
                          width: 6,
                          offset: 0,
                          push: 0,
                          pull: 0,
                          size: "md",
                          currentWidth: 6,
                        },
                        {
                          components: [
                            {
                              label: "Vornamen",
                              tooltip: "Geben Sie alle Vornamen des Kindes an.",
                              tableView: true,
                              validate: {
                                required: true,
                                minLength: "1",
                                maxLength: "80",
                              },
                              key: "vornameSchulpflichtige",
                              properties: {
                                "XDF-ID": "G05003718G05004392F60000228",
                              },
                              type: "textfield",
                              inputType: "textfield",
                              input: true,
                            },
                          ],
                          width: 6,
                          offset: 0,
                          push: 0,
                          pull: 0,
                          size: "md",
                          currentWidth: 6,
                        },
                      ],
                      type: "columns",
                      hideLabel: true,
                    },
                    {
                      label: "Columns",
                      columns: [
                        {
                          components: [
                            {
                              label: "Geburtsdatum",
                              format: "dd-MM-yyyy",
                              tableView: false,
                              datePicker: {
                                disableWeekends: false,
                                disableWeekdays: false,
                                minDate: "2006-01-01T00:00:00+01:00",
                                maxDate: "2018-12-31T12:00:00+01:00",
                              },
                              validate: {
                                required: true,
                              },
                              enableMinDateInput: false,
                              enableMaxDateInput: false,
                              key: "geburtsdatum",
                              type: "datetime",
                              input: true,
                              widget: {
                                type: "calendar",
                                displayInTimezone: "viewer",
                                locale: "en",
                                useLocaleSettings: false,
                                allowInput: true,
                                mode: "single",
                                enableTime: true,
                                noCalendar: false,
                                format: "dd-MM-yyyy",
                                hourIncrement: 1,
                                minuteIncrement: 1,
                                time_24hr: false,
                                minDate: "2006-01-01T00:00:00+01:00",
                                disableWeekends: false,
                                disableWeekdays: false,
                                maxDate: "2018-12-31T12:00:00+01:00",
                              },
                            },
                          ],
                          width: 6,
                          offset: 0,
                          push: 0,
                          pull: 0,
                          size: "md",
                          currentWidth: 6,
                        },
                        {
                          components: [
                            {
                              label: "Geburtsort/-land",
                              tableView: true,
                              validate: {
                                required: true,
                              },
                              key: "geburtsortLand",
                              type: "textfield",
                              input: true,
                            },
                          ],
                          width: 6,
                          offset: 0,
                          push: 0,
                          pull: 0,
                          size: "md",
                          currentWidth: 6,
                        },
                      ],
                      key: "columns",
                      type: "columns",
                      input: false,
                      tableView: false,
                    },
                    {
                      label: "Columns",
                      columns: [
                        {
                          components: [
                            {
                              label: "Konfession",
                              tableView: true,
                              key: "konfession",
                              type: "textfield",
                              input: true,
                            },
                          ],
                          width: 6,
                          offset: 0,
                          push: 0,
                          pull: 0,
                          size: "md",
                          currentWidth: 6,
                        },
                        {
                          components: [
                            {
                              label: "Staatsangehörigkeit",
                              tableView: true,
                              validate: {
                                required: true,
                              },
                              key: "staatsangehorigkeit",
                              type: "textfield",
                              input: true,
                            },
                          ],
                          width: 6,
                          offset: 0,
                          push: 0,
                          pull: 0,
                          size: "md",
                          currentWidth: 6,
                        },
                      ],
                      key: "columns1",
                      type: "columns",
                      input: false,
                      tableView: false,
                    },
                    {
                      label: "Columns",
                      columns: [
                        {
                          components: [
                            {
                              label:
                                "Rechtsstatus / Aufenthaltsstatus befristet bis",
                              format: "dd-MM-yyyy",
                              tableView: false,
                              datePicker: {
                                disableWeekends: false,
                                disableWeekdays: false,
                                minDate: "2022-12-31T12:00:00+01:00",
                              },
                              enableMinDateInput: false,
                              enableMaxDateInput: false,
                              key: "rechtsstatusAufenthaltsstatusBefristetBis",
                              type: "datetime",
                              input: true,
                              widget: {
                                type: "calendar",
                                displayInTimezone: "viewer",
                                locale: "en",
                                useLocaleSettings: false,
                                allowInput: true,
                                mode: "single",
                                enableTime: true,
                                noCalendar: false,
                                format: "dd-MM-yyyy",
                                hourIncrement: 1,
                                minuteIncrement: 1,
                                time_24hr: false,
                                minDate: "2022-12-31T12:00:00+01:00",
                                disableWeekends: false,
                                disableWeekdays: false,
                                maxDate: null,
                              },
                            },
                          ],
                          width: 6,
                          offset: 0,
                          push: 0,
                          pull: 0,
                          size: "md",
                          currentWidth: 6,
                        },
                        {
                          components: [],
                          width: 6,
                          offset: 0,
                          push: 0,
                          pull: 0,
                          size: "md",
                          currentWidth: 6,
                        },
                      ],
                      key: "columns2",
                      type: "columns",
                      input: false,
                      tableView: false,
                    },
                    {
                      title: "",
                      collapsible: false,
                      hideLabel: true,
                      key: "panel1",
                      type: "panel",
                      label: "Panel",
                      input: false,
                      tableView: false,
                      components: [
                        {
                          label: "Migrationshintergrund vorhanden?",
                          description:
                            "Wenn ja, bitte Geburtsland, Zuzugsjahr und Verkehrssprache angeben!",
                          tableView: false,
                          key: "checkbox",
                          type: "checkbox",
                          input: true,
                          defaultValue: false,
                        },
                        {
                          label: "Migrationshintergrund",
                          tableView: false,
                          key: "migrationshintergrund",
                          conditional: {
                            show: true,
                            conjunction: "all",
                            conditions: [
                              {
                                component: "checkbox",
                                operator: "isEqual",
                                value: "true",
                              },
                            ],
                          },
                          type: "container",
                          input: true,
                          components: [
                            {
                              label: "Columns",
                              columns: [
                                {
                                  components: [
                                    {
                                      label: "Geburtsland Vater",
                                      tableView: true,
                                      key: "geburtslandVater",
                                      type: "textfield",
                                      input: true,
                                    },
                                  ],
                                  width: 6,
                                  offset: 0,
                                  push: 0,
                                  pull: 0,
                                  size: "md",
                                  currentWidth: 6,
                                },
                                {
                                  components: [
                                    {
                                      label: "Geburtsland Mutter",
                                      tableView: true,
                                      key: "geburtslandMutter",
                                      type: "textfield",
                                      input: true,
                                    },
                                  ],
                                  width: 6,
                                  offset: 0,
                                  push: 0,
                                  pull: 0,
                                  size: "md",
                                  currentWidth: 6,
                                },
                              ],
                              key: "columns3",
                              type: "columns",
                              input: false,
                              tableView: false,
                            },
                            {
                              label: "Columns",
                              columns: [
                                {
                                  components: [
                                    {
                                      label: "Zuzugsjahr Vater",
                                      tableView: true,
                                      key: "zuzugsjahrVater",
                                      type: "textfield",
                                      input: true,
                                    },
                                  ],
                                  width: 6,
                                  offset: 0,
                                  push: 0,
                                  pull: 0,
                                  size: "md",
                                  currentWidth: 6,
                                },
                                {
                                  components: [
                                    {
                                      label: "Zuzugsjahr Mutter",
                                      tableView: true,
                                      key: "zuzugsjahrMutter",
                                      type: "textfield",
                                      input: true,
                                    },
                                  ],
                                  width: 6,
                                  offset: 0,
                                  push: 0,
                                  pull: 0,
                                  size: "md",
                                  currentWidth: 6,
                                },
                              ],
                              key: "columns4",
                              type: "columns",
                              input: false,
                              tableView: false,
                            },
                            {
                              label:
                                "Welche Sprache - außer deutsch - wird in der Familie gesprochen (Verkehrssprache):",
                              tableView: true,
                              key: "welcheSpracheAusserDeutschWirdInDerFamilieGesprochenVerkehrssprache",
                              type: "textfield",
                              input: true,
                            },
                          ],
                        },
                      ],
                    },
                    {
                      title: "Wohnort des Kindes",
                      collapsible: false,
                      key: "wohnortDesKindes",
                      type: "panel",
                      label: "Panel",
                      input: false,
                      tableView: false,
                      components: [
                        {
                          label: "Anschrift",
                          tableView: false,
                          provider: "nominatim",
                          key: "address-kind",
                          type: "address",
                          providerOptions: {
                            params: {
                              autocompleteOptions: {},
                            },
                          },
                          input: true,
                          components: [
                            {
                              label: "Address 1",
                              tableView: false,
                              key: "address1kind",
                              type: "textfield",
                              input: true,
                              customConditional:
                                "show = _.get(instance, 'parent.manualMode', false);",
                            },
                            {
                              label: "Address 2",
                              tableView: false,
                              key: "address2kind",
                              type: "textfield",
                              input: true,
                              customConditional:
                                "show = _.get(instance, 'parent.manualMode', false);",
                            },
                            {
                              label: "City",
                              tableView: false,
                              key: "citykind",
                              type: "textfield",
                              input: true,
                              customConditional:
                                "show = _.get(instance, 'parent.manualMode', false);",
                            },
                            {
                              label: "State",
                              tableView: false,
                              key: "statekind",
                              type: "textfield",
                              input: true,
                              customConditional:
                                "show = _.get(instance, 'parent.manualMode', false);",
                            },
                            {
                              label: "Country",
                              tableView: false,
                              key: "countrykind",
                              type: "textfield",
                              input: true,
                              customConditional:
                                "show = _.get(instance, 'parent.manualMode', false);",
                            },
                            {
                              label: "Zip Code",
                              tableView: false,
                              key: "zipkind",
                              type: "textfield",
                              input: true,
                              customConditional:
                                "show = _.get(instance, 'parent.manualMode', false);",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Erziehungsberechtigte",
          key: "tab2",
          components: [
            {
              title: "Erziehungsberechtigte",
              breadcrumbClickable: true,
              buttonSettings: {
                previous: true,
                cancel: true,
                next: true,
              },
              navigateOnEnter: false,
              saveOnEnter: false,
              scrollToTop: false,
              collapsible: false,
              key: "page16922604904684",
              type: "panel",
              label: "Panel",
              input: true,
              tree: true,
              tableView: true,
              persistent: true,
              clearOnHide: true,
              components: [
                {
                  title: "1. Erziehungsberechtigte",
                  collapsible: false,
                  key: "panel11",
                  type: "panel",
                  label: "Panel",
                  input: false,
                  tableView: false,
                  components: [
                    {
                      label: "Columns",
                      columns: [
                        {
                          components: [
                            {
                              label: "Anrede",
                              widget: "choicesjs",
                              tooltip: "Bitte geben Sie Anrede des Kindes an.",
                              tableView: true,
                              data: {
                                values: [
                                  {
                                    value: 1,
                                    label: "Frau",
                                  },
                                  {
                                    value: 2,
                                    label: "Herr",
                                  },
                                  {
                                    value: 3,
                                    label: "Divers",
                                  },
                                  {
                                    value: 999,
                                    label: "Keine Angabe",
                                  },
                                ],
                              },
                              validate: {
                                required: true,
                              },
                              key: "anredeErziehungsberechtigte1",
                              type: "select",
                              inputType: "textfield",
                              input: true,
                            },
                          ],
                          width: 6,
                          offset: 0,
                          push: 0,
                          pull: 0,
                          size: "md",
                          currentWidth: 6,
                        },
                        {
                          components: [],
                          width: 6,
                          offset: 0,
                          push: 0,
                          pull: 0,
                          size: "md",
                          currentWidth: 6,
                        },
                      ],
                      key: "columnss",
                      type: "columns",
                      input: false,
                      tableView: false,
                    },
                    {
                      label: "Columns",
                      columns: [
                        {
                          components: [
                            {
                              label: "Vornahme",
                              tableView: true,
                              key: "vornahme1",
                              type: "textfield",
                              input: true,
                            },
                          ],
                          width: 6,
                          offset: 0,
                          push: 0,
                          pull: 0,
                          size: "md",
                          currentWidth: 6,
                        },
                        {
                          components: [
                            {
                              label: "Nachname",
                              tableView: true,
                              key: "nachname1",
                              type: "textfield",
                              input: true,
                            },
                          ],
                          width: 6,
                          offset: 0,
                          push: 0,
                          pull: 0,
                          size: "md",
                          currentWidth: 6,
                        },
                      ],
                      key: "columns11",
                      type: "columns",
                      input: false,
                      tableView: false,
                    },
                    {
                      label: "Anschrift",
                      tableView: false,
                      provider: "nominatim",
                      key: "berechtigte-address1",
                      type: "address",
                      providerOptions: {
                        params: {
                          autocompleteOptions: {},
                        },
                      },
                      input: true,
                      components: [
                        {
                          label: "Address 1",
                          tableView: false,
                          key: "address11berechtigte",
                          type: "textfield",
                          input: true,
                          customConditional:
                            "show = _.get(instance, 'parent.manualMode', false);",
                        },
                        {
                          label: "Address 2",
                          tableView: false,
                          key: "address21berechtigte",
                          type: "textfield",
                          input: true,
                          customConditional:
                            "show = _.get(instance, 'parent.manualMode', false);",
                        },
                        {
                          label: "City",
                          tableView: false,
                          key: "city1berechtigte",
                          type: "textfield",
                          input: true,
                          customConditional:
                            "show = _.get(instance, 'parent.manualMode', false);",
                        },
                        {
                          label: "State",
                          tableView: false,
                          key: "state1berechtigte",
                          type: "textfield",
                          input: true,
                          customConditional:
                            "show = _.get(instance, 'parent.manualMode', false);",
                        },
                        {
                          label: "Country",
                          tableView: false,
                          key: "country1berechtigte",
                          type: "textfield",
                          input: true,
                          customConditional:
                            "show = _.get(instance, 'parent.manualMode', false);",
                        },
                        {
                          label: "Zip Code",
                          tableView: false,
                          key: "zip1berechtigte",
                          type: "textfield",
                          input: true,
                          customConditional:
                            "show = _.get(instance, 'parent.manualMode', false);",
                        },
                      ],
                    },
                  ],
                },
                {
                  title: "2. Erziehungsberechtigte",
                  collapsible: false,
                  key: "panel2",
                  type: "panel",
                  label: "Panel",
                  input: false,
                  tableView: false,
                  components: [
                    {
                      label: "Columns",
                      columns: [
                        {
                          components: [
                            {
                              label: "Anrede",
                              widget: "choicesjs",
                              tooltip: "Bitte geben Sie Anrede des Kindes an.",
                              tableView: true,
                              data: {
                                values: [
                                  {
                                    value: 1,
                                    label: "Frau",
                                  },
                                  {
                                    value: 2,
                                    label: "Herr",
                                  },
                                  {
                                    value: 3,
                                    label: "Divers",
                                  },
                                  {
                                    value: 999,
                                    label: "Keine Angabe",
                                  },
                                ],
                              },
                              validate: {
                                required: true,
                              },
                              key: "anredeErziehungsberechtigte2",
                              type: "select",
                              inputType: "textfield",
                              input: true,
                            },
                          ],
                          width: 6,
                          offset: 0,
                          push: 0,
                          pull: 0,
                          size: "md",
                          currentWidth: 6,
                        },
                        {
                          components: [],
                          width: 6,
                          offset: 0,
                          push: 0,
                          pull: 0,
                          size: "md",
                          currentWidth: 6,
                        },
                      ],
                      key: "columns2",
                      type: "columns",
                      input: false,
                      tableView: false,
                    },
                    {
                      label: "Columns",
                      columns: [
                        {
                          components: [
                            {
                              label: "Vornahme",
                              tableView: true,
                              key: "vornahme2",
                              type: "textfield",
                              input: true,
                            },
                          ],
                          width: 6,
                          offset: 0,
                          push: 0,
                          pull: 0,
                          size: "md",
                          currentWidth: 6,
                        },
                        {
                          components: [
                            {
                              label: "Nachname",
                              tableView: true,
                              key: "nachname2",
                              type: "textfield",
                              input: true,
                            },
                          ],
                          width: 6,
                          offset: 0,
                          push: 0,
                          pull: 0,
                          size: "md",
                          currentWidth: 6,
                        },
                      ],
                      key: "columns3",
                      type: "columns",
                      input: false,
                      tableView: false,
                    },
                    {
                      label: "Anschrift",
                      tableView: false,
                      provider: "nominatim",
                      key: "berechtigte-address2",
                      type: "address",
                      providerOptions: {
                        params: {
                          autocompleteOptions: {},
                        },
                      },
                      input: true,
                      components: [
                        {
                          label: "Address 1",
                          tableView: false,
                          key: "address12berechtigte",
                          type: "textfield",
                          input: true,
                          customConditional:
                            "show = _.get(instance, 'parent.manualMode', false);",
                        },
                        {
                          label: "Address 2",
                          tableView: false,
                          key: "address22berechtigte",
                          type: "textfield",
                          input: true,
                          customConditional:
                            "show = _.get(instance, 'parent.manualMode', false);",
                        },
                        {
                          label: "City",
                          tableView: false,
                          key: "city2berechtigte",
                          type: "textfield",
                          input: true,
                          customConditional:
                            "show = _.get(instance, 'parent.manualMode', false);",
                        },
                        {
                          label: "State",
                          tableView: false,
                          key: "state2berechtigte",
                          type: "textfield",
                          input: true,
                          customConditional:
                            "show = _.get(instance, 'parent.manualMode', false);",
                        },
                        {
                          label: "Country",
                          tableView: false,
                          key: "country2berechtigte",
                          type: "textfield",
                          input: true,
                          customConditional:
                            "show = _.get(instance, 'parent.manualMode', false);",
                        },
                        {
                          label: "Zip Code",
                          tableView: false,
                          key: "zip2berechtigte",
                          type: "textfield",
                          input: true,
                          customConditional:
                            "show = _.get(instance, 'parent.manualMode', false);",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Schulwahl",
          key: "tab3",
          components: [
            {
              title: "",
              collapsible: false,
              hideLabel: true,
              key: "panal-anwelcheschule",
              type: "panel",
              label: "Panel",
              input: true,
              tree: true,
              tableView: true,
              persistent: true,
              clearOnHide: true,
              components: [
                {
                  title:
                    "An welcher Grundschule möchten Sie Ihr Kind anmelden?",
                  collapsible: false,
                  key: "panel-schulwahl",
                  type: "panel",
                  label: "Panel",
                  input: true,
                  tree: true,
                  tableView: true,
                  persistent: true,
                  clearOnHide: true,
                  components: [
                    {
                      label:
                        "In welche Jahrgangsstufe soll Ihr Kind aufgenommen werden",
                      widget: "choicesjs",
                      tooltip:
                        "Bitte geben Sie an, für welche Jahrgangsstufe die Aufnahme in die Schule erfolgen soll. Möchten Sie ihr Kind einschulen, wählen Sie bitte die Jahrgangsstufe 1 aus.",
                      tableView: true,
                      data: {
                        values: [
                          {
                            value: "001",
                            label: "Jahrgangsstufe 1 (1. Klasse)",
                          },
                          {
                            value: "002",
                            label: "Jahrgangsstufe 2 (2. Klasse)",
                          },
                          {
                            value: "003",
                            label: "Jahrgangsstufe 3 (3. Klasse)",
                          },
                          {
                            value: "004",
                            label: "Jahrgangsstufe 4 (4. Klasse)",
                          },
                        ],
                      },
                      validate: {
                        required: true,
                        min: 1,
                        max: 4,
                      },
                      key: "id16922604904689sss",
                      type: "select",
                      inputType: "select",
                      input: true,
                      spellcheck: true,
                      inputFormat: "plain",
                    },
                    {
                      label: "Auswahl der 1. Wunschschule",
                      tableView: false,
                      provider: "nominatim",
                      key: "wunschschule1-address",
                      type: "address",
                      providerOptions: {
                        params: {
                          autocompleteOptions: {},
                        },
                      },
                      input: true,
                      components: [
                        {
                          label: "Address 1",
                          tableView: false,
                          key: "address1s",
                          type: "textfield",
                          input: true,
                          customConditional:
                            "show = _.get(instance, 'parent.manualMode', false);",
                        },
                        {
                          label: "Address 2",
                          tableView: false,
                          key: "address2s",
                          type: "textfield",
                          input: true,
                          customConditional:
                            "show = _.get(instance, 'parent.manualMode', false);",
                        },
                        {
                          label: "City",
                          tableView: false,
                          key: "citys",
                          type: "textfield",
                          input: true,
                          customConditional:
                            "show = _.get(instance, 'parent.manualMode', false);",
                        },
                        {
                          label: "State",
                          tableView: false,
                          key: "states",
                          type: "textfield",
                          input: true,
                          customConditional:
                            "show = _.get(instance, 'parent.manualMode', false);",
                        },
                        {
                          label: "Country",
                          tableView: false,
                          key: "countrys",
                          type: "textfield",
                          input: true,
                          customConditional:
                            "show = _.get(instance, 'parent.manualMode', false);",
                        },
                        {
                          label: "Zip Code",
                          tableView: false,
                          key: "zips",
                          type: "textfield",
                          input: true,
                          customConditional:
                            "show = _.get(instance, 'parent.manualMode', false);",
                        },
                      ],
                    },
                  ],
                },
                {
                    "label": "HTML",
                    "className": "map",
                    "attrs": [
                      {
                        "attr": "",
                        "value": ""
                      }
                    ],
                    "content": "<h2>Map</h2>\n<div id=\"map-container\" class=\"map\" style=\"height: 400px;border: 5px solid #000;font-family: Arial, Helvetica, sans-serif;\"></div>\n<script src=\"map.js\"></script>\n",
                    "refreshOnChange": true,
                    "key": "html",
                    "type": "htmlelement",
                    "input": false,
                    "tableView": false
                  },
                {
                  label: "HTML",
                  tag: "img",
                  attrs: [
                    {
                      attr: "src",
                      value:
                        "https://res.cloudinary.com/govimg/image/upload/v1671538209/6399f1b5e79f8e715dbeb6f7/logo-formio-horizontal-lightbg.svg",
                    },
                  ],
                  refreshOnChange: false,
                  customClass: "pr-3 pl-3",
                  key: "html1",
                  type: "htmlelement",
                  input: false,
                  tableView: false,
                },
                {
                  "label": "HTML",
                  "tag": "div",
                  "className": "map",
                  "attrs": [
                    {
                      "attr": "",
                      "value": ""
                    }
                  ],
                  "content": "<h2>Map</h2>\n<div id=\"map-container\" style=\"height: 400px;border: 5px solid #000;font-family: Arial, Helvetica, sans-serif;\"></div>\n\n",
                  "refreshOnChange": true,
                  "customClass": "height: 400px;border: 5px solid #000;font-family: Arial, Helvetica, sans-serif;",
                  "key": "html",
                  "customConditional": "document.addEventListener(\"DOMContentLoaded\", () => {\r\n  console.log('ich bin in html-component')\r\n});",
                  "type": "htmlelement",
                  "input": false,
                  "tableView": false
                },
                {
                  label: "HTML",
                  attrs: [
                    {
                      attr: "",
                      value: "",
                    },
                  ],
                  content:
                    "<b>HTML Tag</b>: p\n<br><b>Content</b>: Text added to the content field with line breaks \n",
                  refreshOnChange: false,
                  customClass: "pr-3 pl-3",
                  key: "html5",
                  type: "htmlelement",
                  input: false,
                  tableView: false,
                },
                {
                  label: "HTML",
                  attrs: [
                    {
                      attr: "",
                      value: "",
                    },
                  ],
                  content:
                    "<br>\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nec nam aliquam sem et tortor consequat. Nisl suscipit adipiscing bibendum est ultricies integer quis auctor elit. Convallis tellus id interdum velit. Tincidunt ornare massa eget egestas purus viverra.\n<br><br>\nLectus magna fringilla urna porttitor. Pulvinar etiam non quam lacus suspendisse faucibus interdum posuere lorem. Nisl nisi scelerisque eu ultrices vitae auctor eu. Viverra tellus in hac habitasse platea dictumst vestibulum rhoncus. Vel eros donec ac odio. Sit amet luctus venenatis lectus. Sed velit dignissim sodales ut eu sem integer. Tempus urna et pharetra pharetra massa massa ultricies mi quis. Donec pretium vulputate sapien nec sagittis aliquam.\n<br>\n<br>\nAmet luctus venenatis lectus magna fringilla urna. Massa sed elementum tempus egestas sed sed. Tempor orci dapibus ultrices in iaculis nunc. Amet cursus sit amet dictum sit amet justo. Sagittis eu volutpat odio facilisis mauris. Lectus mauris ultrices eros in cursus turpis massa. Congue mauris rhoncus aenean vel elit scelerisque mauris.",
                  refreshOnChange: false,
                  customClass: "pr-3 pl-3",
                  key: "html2",
                  type: "htmlelement",
                  input: false,
                  tableView: false,
                },
                {
                  label: "HTML",
                  tag: "div",
                  className: "map",
                  attrs: [
                    {
                      attr: "",
                      value: "",
                    },
                  ],
                  content:
                    '<h2>Map</h2>\n<div id="map-container" style="height: 400px;border: 5px solid #000;font-family: Arial, Helvetica, sans-serif;"></div>\n<script src="map.js"></script>\n',
                  refreshOnChange: true,
                  key: "html",
                  tags: ["map-container", "map"],
                  customConditional:
                    'document.addEventListener("DOMContentLoaded", () => {\r\n  const mapContainer = document.getElementById("map-container");\r\n  console.log(mapContainer)\r\n});',
                  type: "htmlelement",
                  input: false,
                  tableView: false,
                },
              ],
            },
          ],
        },
      ],
      key: "tabs",

      type: "tabs",
      input: false,
      tableView: false,
    },
  */
