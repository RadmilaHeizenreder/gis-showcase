import { Formio } from "@formio/js";
import { Utils } from "@formio/js";
import CustomMapComponent from "./gisComponent";
Formio.use(CustomMapComponent)
// Formio.Components.addComponent('customMap', CustomMapComponent)

export class MyForm {
  constructor(formElementId, formSchema) {
    this.formElementId = formElementId;
    this.formSchema = formSchema;
    this.initForm();
  }

  initForm() {
    Formio.createForm(
      document.getElementById(this.formElementId),
      this.formSchema
    )
      .then((form) => {
        console.log("form", form);

        Utils.eachComponent(form.components, (component) => {
          console.log("eachComponents", component);
        });
        const findComponent = Utils.findComponent(form.components, {
          key: "meineKarte",
        });
        console.log("findComponent", findComponent);
        // Hier können Sie zusätzliche Logik einfügen,
        // z.B. Event-Listener für das Formular
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

// Formio.use(GisComponent);

// export class MyGisForm {
//   constructor(formElementId) {
//     this.formElementId = formElementId;
//     this.form = this.initForm();
//   }

//   async initForm() {
//     try {
//       this.form = await Formio.createForm(
//         document.getElementById(this.formElementId),
//         {
//           components: [
//             {
//               type: "customMap",
//               key: "meineGisKomponente",
//               label: "GIS Karte",
//               tag: 'div',
//               mapContainerId: "map-container",
//             },
//           ],
//         }
//       );

//       await Utils.eachComponent(this.form.components, (component) => {
//         console.log("eachComponents",component);
//       });
//       const findComponent = Utils.findComponent(this.form.components, {
//         type: "giscomponent",
//       });
//       console.log(findComponent);
//     } catch (e) {
//       console.log("formular error", e);
//     }
//   }

//   submitEvent() {
//     this.form.on("submit", async (submit) => {
//       const submitData = {
//         submission: {
//           anrede: submit.data.anrede,
//           addresse: submit.data.address1,
//         },
//         routes: [
//           {
//             schoolId: submit.data.schoolId1,
//             route: JSON.parse(submit.data.route1),
//             prio: submit.data.prio1,
//           },
//           {
//             schoolId: submit.data.schoolId2,
//             route: JSON.parse(submit.data.route2),
//             prio: submit.data.prio2,
//           },
//         ],
//       };
//       await fetch("http://localhost:3031/submission", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(submitData),
//       })
//         .then((response) => {
//           return response;
//         })
//         .catch((err) => console.error("Fehler: ", err));
//     });
//   }
// }
