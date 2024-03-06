export class BaseButton {
  constructor(className, textContent) {
    this.button = document.createElement("button");
    this.button.className = "ol-control "+className;
    this.button.textContent = textContent;
  }
}
