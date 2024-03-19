/**
 * @fileoverview This file contains the Filter class, which is a custom control for filtering features on a map based on distance.
 * @module baseFilter
 */

import { getDistance } from "ol/sphere";
import { Style } from "ol/style";
import { Control } from 'ol/control';

/**
 * Custom control for filtering features on a map based on distance.
 * @extends Control
 */
export class Filter extends Control {

  currentFilter = undefined;


  /**
   * Creates an instance of the Filter class.
   * @param {Object} [options={}] - The options for the Filter control.
   * @param {HTMLElement|string} [options.target] - The target element or its id for the control.
   * @param {import("BaseMap").default} options.map - The map instance.
   * @param {number[]} options.myLocationCoords - The coordinates of the user's location.
   * @param {import("ol/Feature").default[]} options.features - The features to be filtered.
   */
  constructor(options = {}) {
    const element = document.createElement('div');
    element.className = 'ol-control filter';
    super({
      element: element,
      target: options.target
    });

    this.map = options.map;
    this.myLocationCoords = options.myLocationCoords;
    this.features = options.features;
    
    this.initFilter();
  }

  /**
   * Initializes the filter control by creating the input elements and adding event listeners.
   * @private
   */
  initFilter() {
    const labelElement = document.createElement("label");
    labelElement.setAttribute("for", "radius-km");
    labelElement.textContent = "Entfernung:";

    const inputElement = document.createElement("input");
    inputElement.setAttribute("type", "range");
    inputElement.setAttribute("id", "radius-km");
    inputElement.setAttribute("min", "0");
    inputElement.setAttribute("max", "50");
    inputElement.setAttribute("step", "0.5");
    inputElement.setAttribute("value", "50");
        
    // Event listener for the range input
    inputElement.addEventListener("input", (event) => {
      const radius = event.target.value * 1000;
      this.updateMapFilter(radius, this.myLocationCoords);
      labelElement.textContent = "Entfernung: " + event.target.value + " km" 
    });

    this.element.appendChild(labelElement);
    this.element.appendChild(inputElement);
  }

  /**
   * Updates the map filter based on the given radius and coordinates.
   * @param {number} radius - The radius in meters.
   * @param {number[]} coords - The coordinates to use as the center point.
   */
  updateMapFilter(radius, coords) {
    try {
      this.features.filter((feature) => {
        const point = feature.getGeometry();
        const distance = getDistance(coords, point.getCoordinates());
        if (distance > radius) {
          feature.setStyle(new Style({ visibility: "hidden" }));
        } else {
          feature.setStyle(null);
        }
        return distance <= radius;
      });
    } catch (error) {
      console.log("Error beim Update des Map-Filters", error);
    }
  }
}
