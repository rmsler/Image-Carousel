
function MovementDots(label, showSlideCallback){
    if (!(this instanceof MovementDots)) { 
        return new MovementDots(imagesArray);
    }
    this.label = label;
    this.showSlideCallback = showSlideCallback;
}


Object.assign(MovementDots.prototype, {
    render : function() {
        let dot = document.createElement("span");
        dot.classList.add("dot");
        dot.addEventListener("click", this.showSlide);
        return dot;
    },
    showSlide : function(){
        this.showSlideCallback(this.label);
    }
});

export { MovementDots };