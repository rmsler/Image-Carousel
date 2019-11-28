
function MovementButtons(position){
    if (!(this instanceof MovementButtons)) { 
        return new MovementButtons(imagesArray);
    }
    this.position = position;
    this.activeSlide = null;
}


Object.assign(MovementButtons.prototype, {
    render : function(activeSlide) {
        // $.each(array, function (index, value){
        //     let image = value.render(index);
        //     $(wrapper).append(image);
        // });
        
        this.activeSlide = activeSlide;
        let button = document.createElement("a");
        button.classList.add(this.position);
        // let directionImage = this.position === "prev" ? "&#10094;" : "&#10095;" ;
        let directionImage = this.position === "prev" ? "❮" : "❯" ;
        
        let insideText = document.createTextNode(directionImage);
        button.appendChild(insideText); 
        button.addEventListener("click", this.plusSlides(this.position === "prev" ? -1 : 1));
        return button;
    },
    plusSlides : function(n) {
        this.showSlides(this.activeSlide += n);
    },
    currentSlide: function(n) {
        this.showSlides(this.activeSlide = n);
    },
    showSlides : function(n) {
        var i;
        var slides = document.getElementsByClassName("container");
        // var dots = document.getElementsByClassName("dot");
        if (n > slides.length) {this.activeSlide = 1}    
        if (n < 1) {this.activeSlide = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        // for (i = 0; i < dots.length; i++) {
        //     dots[i].className = dots[i].className.replace(" active", "");
        // }
        slides[this.activeSlide - 1].style.display = "block";  
        // dots[this.activeSlide-1].className += " active";
    }
});

export { MovementButtons };