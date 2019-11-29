import {Image} from "./Image.js";
import {MovementButtons} from "./MovementButtons.js";
import { MovementDots } from "./MovementDots.js";

function CarouselComponent(imagesArray){
    if (!(this instanceof CarouselComponent)) { 
        return new CarouselComponent(imagesArray);
    }
    this.imagesArray = imagesArray;
    this.imgArray = [];
    this.activeSlide = 1;
    this.mode = null;
    // this.init();
}

CarouselComponent.modes = {
    MANUAL: "manual",
    AUTOMATIC: "automatic",
    BOTH: "both"
}

Object.assign(CarouselComponent.prototype, {
    init: function(node) {
    //iterate and construct models
        let defaultMode = CarouselComponent.modes.BOTH;
        let imgArray = this.imgArray;
        console.log(this.imagesArray);
        // let changeModeCallback = this.clickimage.bind(this);
        $.each(this.imagesArray["carousel"], function (index, value){
            imgArray[index] = new Image(value);
        });
        this.mode = defaultMode;
        this.renderElements(node, imgArray);

    },
    renderElements : function(wrapper, array) {
        let nextSlidesCallback = this.nextSlides.bind(this);
        let previousSlidesCallback = this.previousSlides.bind(this);
        let currentSlideCallback = this.currentSlide.bind(this);
        //add dots + images
        console.log(array);
        let dotsWrapper = document.createElement("div");
        dotsWrapper.style.textAlign = "center";

        
        $.each(array, function (index, value){
            let image = value.render(index);
            $(wrapper).append(image);
            //add dots
            let dot = new MovementDots(index, currentSlideCallback);
            let dotElement = dot.render();
            $(dotsWrapper).append(dotElement);
        });

        
        //add previous button
        let previous = new MovementButtons("prev", previousSlidesCallback);
        let previousButton = previous.render();
        $(wrapper).append(previousButton);
        // add next button
        let next = new MovementButtons("next", nextSlidesCallback);
        let nextButton = next.render();
        $(wrapper).append(nextButton);
        
        $(wrapper).append(dotsWrapper);
        this.currentSlide(this.activeSlide);
    },
    
    nextSlides : function() {
        this.showSlides(this.activeSlide += 1);
    },
    previousSlides : function() {
        this.showSlides(this.activeSlide -= 1);
    },
    currentSlide: function(n) {
        this.showSlides(this.activeSlide = n);
    },

    showSlides : function(n) {
        var i;
        var slides = document.getElementsByClassName("container");
        var dots = document.getElementsByClassName("dot");
        if (n > slides.length) {this.activeSlide = 1}    
        if (n < 1) {this.activeSlide = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";   
            slides[i].style.opacity = "0"; 
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[this.activeSlide - 1].style.display = "block";  
        slides[this.activeSlide - 1].style.opacity = "1";  
        dots[this.activeSlide-1].className += " active";
    }
});

export { CarouselComponent };