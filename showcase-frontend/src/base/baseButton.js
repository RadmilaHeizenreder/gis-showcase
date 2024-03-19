/**
 * Represents a button element.
 * @class
 */
export class BaseButton {
  /**
   * Creates an instance of BaseButton.
   * @param {string} className - The class name for the button.
   * @param {string} textContent - The text content for the button.
   * 
   * @example const routeBtn = new BaseButton("draw-line-btn", "Route")
   * @example routeBtn.button.onclick = async () => {}
   */
  constructor(className, textContent) {
    this.button = document.createElement("button");
    this.button.className = "ol-control " + className;
    this.button.textContent = textContent;
  }
}
