
function MovementButtons(label, showSlideCallback){
    if (!(this instanceof MovementButtons)) { 
        return new MovementButtons(imagesArray);
    }
    this.label = label;
    this.showSlideCallback = showSlideCallback;
}


Object.assign(MovementButtons.prototype, {
    render : function() {
        let button = document.createElement("a");
        button.classList.add(this.label);
        let directionImage = this.label === "prev" ? "❮" : "❯" ;
        
        let insideText = document.createTextNode(directionImage);
        button.appendChild(insideText); 
        button.addEventListener("click", this.showSlideCallback);
        return button;
    },
});

export { MovementButtons };