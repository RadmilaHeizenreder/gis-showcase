import Overlay from "ol/Overlay";
/**
 * Represents a tooltip for a map overlay to show the route measure
 * @class
 */

export class BaseTooltip {
  /**
   * Constructs a new BaseTooltip object.
   * @constructor
   * @param {Object} map - The map object.
   */
  constructor(map) {
    this.measureTooltipElement = this.createMeasureTooltip(map);
    this.measureTooltipOverlay = this.createMeasureTooltipOverlay(
      this.measureTooltipElement
    );
  }

  /**
   * Creates a new route measure tooltip overlay.
   * @param {HTMLElement} element - The tooltip element.
   * @returns {Overlay} The measure tooltip overlay.
   */
  createMeasureTooltipOverlay(element) {
    return new Overlay({
      element: element,
      offset: [0, -15],
      positioning: "bottom-center",
      stopEvent: false,
      insertFirst: false,
    });
  }

  /**
   * Creates a new measure tooltip element.
   * @param {Object} map - The map object.
   * @param {any} param - The tooltip parameter.
   * @returns {HTMLElement} The measure tooltip element.
   */
  createMeasureTooltip(map, param) {
    if (this.measureTooltipElement) {
      this.measureTooltipElement.parentNode.removeChild(
        this.measureTooltipElement
      );
    }
    this.measureTooltipElement = document.createElement("div");
    this.measureTooltipElement.className = "ol-tooltip ol-tooltip-measure";
    this.measureTooltipOverlay = this.createMeasureTooltipOverlay(this.measureTooltipElement)
    this.measureTooltipOverlay.param = param;
    map.addOverlay(this.measureTooltipOverlay);
    return this.measureTooltipElement
  }

  /**
   * Updates the measure tooltip content and position.
   * @param {string} content - The tooltip content.
   * @param {Array<number>} position - The tooltip position.
   */
  updateMeasureTooltip(content, position) {
    this.measureTooltipElement.innerHTML = content;
    this.measureTooltipElement.className = "ol-tooltip ol-tooltip-measure";
    this.measureTooltipOverlay.setPosition(position);
    this.measureTooltipOverlay.setOffset([0, -7]);
  }

  /**
   * Hides the tooltip overlay by parameter.
   * @param {Object} map - The map object. Map object is searched for an overlay with a specific parameter
   * @param {any} param - The tooltip parameter.
   */
  hideTooltipOverlayByParam(map, param) {
    const overlays = map.getOverlays();
    overlays.forEach((overlay) => {
      if (overlay && overlay.param === param) {
        map.removeOverlay(overlay);
      }
    });
  }
}
