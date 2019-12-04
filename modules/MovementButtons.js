function MovementButtons(label, showSlideCallback) {
  if (!(this instanceof MovementButtons)) {
    return new MovementButtons(imagesArray);
  }
  this.label = label;
  this.showSlideCallback = showSlideCallback;
  this.domReference = null;
}

Object.assign(MovementButtons.prototype, {
  render: function() {
    let button = document.createElement("a");
    button.classList.add(this.label);
    button.classList.add("movementButtons");
    let directionImage =
      this.label === "prev" ? "❮" : this.label === "next" ? "❯" : this.label;
    let insideText = document.createTextNode(directionImage);
    button.appendChild(insideText);
    button.addEventListener("click", this.showSlideCallback);
    this.domReference = button;
    return button;
  }
});

export { MovementButtons };
