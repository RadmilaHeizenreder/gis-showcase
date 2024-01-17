// https://help.form.io/developers/form-development/custom-components#header-component
import { Formio } from "@formio/js";
import { MapContainer } from "../js/mapcontainer";
const HtmlElement = Formio.Components.components.htmlelement;

export default class GisComponent extends HtmlElement {
  static schema(...extend) {
    return HtmlElement.schema({
      type: "giscomponent",
      label: "GIS",
      key: "giscontainer",
      mapContainerId: "map-container",
    });
  }
  static get builderInfo() {
    return {
      title: "GIS Component",
      icon: "code",
      group: "layout",
      documentation: "userguide/#html-element-component",
      weight: 2,
      schema: GisComponent.schema(),
    };
  }
  constructor(component, options, data) {
    super(component, options, data);
    this.baseMap = null;
  }
  init() {
    super.init();
  }
  get inputInfo() {
    const info = super.inputInfo;
    return info;
  }
  render() {
    return super.render(
      `<div ref="mapContainer" id="${this.component.mapContainerId}"></div>`
    );
  }
  attach(element) {
    const mapContainer = this.refs.mapContainer;
    this.loadRefs(element, {
      customRef: mapContainer,
    });
    if(mapContainer){
        this.baseMap = new MapContainer(mapContainer.id)
    }
    return super.attach(element);
  }

}
Formio.use({
    components: {
        htmlelement: GisComponent
    }
})
