import Overlay from "ol/Overlay";

export class PopUp {
  constructor() {
    this.popupContainer = this.createPopupContainer();
    this.popupContent = this.createPopupContent();
    this.popupOverlay = this.createPopupOverlay();
    this.popupInnerHtml = undefined
  }

  createPopupOverlay() {
    return new Overlay({
      element: this.popupContainer,
      autoPan: {
        animation: {
          duration: 250,
        },
      },
    });
  }

  createPopupContainer() {
    const container = document.createElement("div");
    container.className = "ol-popup";
    container.id = "popup";
    return container;
  }
  createPopupContent() {
    let content = document.createElement("div");
    content.className = "ol-content";
    content.id = "content";
    this.appendElementToPopupContainer(content);
    return content;
  }

  showPopupOverlay(feature, coords) {
    const { school, geometry } = feature.getProperties();
    if (!school && !geometry) {
      return;
    }
    const featureData = school || geometry;
    const featureType = school ? "school" : "route";

    this.popupContent.innerHTML = this.setPopupContentData(
      featureData,
      featureType
    );
    this.popupOverlay.setPosition(coords);
  }
  /**
   * Sets the content of the popup based on the provided feature and type.
   * @param {Object} feature - The feature object.
   * @param {string} type - The type of the feature.
   * @returns {string} - The content of the popup.
   */
  setPopupContentData(feature, type) {
    switch (type) {
      case "route":
        return (this.popupInnerHtml = `<h6>Hallo, bin route</h6>`);
      case "school":
      default:
        this.popupInnerHtml = `
        <h6><strong>${feature.name || "keine Info"}</strong></h6>
        <p>Adresse: ${feature.address || "keine Info"}</p>
        <p>Tel: ${feature.phoneNumber || "keine Info"}</p>
        <p>Email: ${feature.email || "keine Info"}</p>
        <p>Anzahl der Schüler: ${feature.numberOfStudents || "keine Info"}</p>
        `;
        break;
    }
    return this.popupInnerHtml;
  }
  appendPopupContainerToMap(mapTarget) {
    mapTarget.getTargetElement().appendChild(this.popupContainer);
  }
  appendElementToPopupContainer(element) {
    this.popupContainer.appendChild(element);
  }
  hidePopupOverlay() {
    this.popupOverlay.setPosition(undefined);
  }
}
