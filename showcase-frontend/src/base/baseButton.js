export class BaseButton {
  constructor(className, innerHtml) {
    this.button = document.createElement("button");
    this.button.className = "ol-control "+className;
    this.button.innerHTML = innerHtml;
  }
}
