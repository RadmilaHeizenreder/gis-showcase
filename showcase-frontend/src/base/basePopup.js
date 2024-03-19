import Overlay from "ol/Overlay";

/**
 * Represents a popup for displaying information.
 */
export class PopUp extends Overlay {
  /**
   * Represents a Popup object.
   * @constructor
   */
  constructor(options = {}) {
    const popupContainer = document.createElement("div");
    popupContainer.className = "ol-popup";
    // popupContainer.setAttribute('id', 'popup')
    super({
      element: popupContainer,
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
    });
    this.popupContainer = popupContainer
    this.popupContent = document.createElement("div");
    this.popupContent.className = "ol-popup-content";
    this.popupContainer.appendChild(this.popupContent);
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
    this.setPosition(coords);
  }

  /**
   * Sets the content data for the popup based on the feature and type.
   * @param {Object} feature - The feature object.
   * @param {string} type - The type of the feature.
   * @returns {string} - The HTML content for the popup.
   */
  setPopupContentData(feature, type) {
    let contentInneHtml = "";
    switch (type) {
      case "route":
        return (contentInneHtml = `<h6>Hallo, bin route</h6>`);
      case "school":
      default:
        contentInneHtml = `
          <h6><strong>${feature.name || "keine Info"}</strong></h6>
          <p>Schulform: ${feature.schoolform || "keine Info"}</p>
          <p>Adresse: ${feature.address || "keine Info"}</p>
          <p>Tel: ${feature.phoneNumber || "keine Info"}</p>
          <p>Email: ${feature.email || "keine Info"}</p>
          <p>Anzahl der Schüler: ${feature.numberOfStudents || "keine Info"}</p>
          `;
        break;
    }
    return contentInneHtml;
  }

  /**
   * Appends an element to the popup container.
   * 
   * @param {HTMLElement} element - The element to be appended.
   */
  appendElementToPopupContainer(element) {
    this.popupContainer.appendChild(element);
  }

  /**
   * Hides the popup by setting its position to undefined.
   */
  hidePopup() {
    this.setPosition(undefined);
  }
}
