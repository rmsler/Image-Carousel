import { Image } from "./Image.js";
import { MovementButtons } from "./MovementButtons.js";
import { MovementDots } from "./MovementDots.js";

function CarouselComponent(imagesArray) {
  if (!(this instanceof CarouselComponent)) {
    return new CarouselComponent(imagesArray);
  }
  this.imagesArray = imagesArray;
  this.imgArray = [];
  this.activeSlide = 1;
  this.mode = null;
  this.intervalId = null;
}

CarouselComponent.modes = {
  MANUAL: "manual",
  AUTOMATIC: "automatic",
  BOTH: "both"
};

Object.assign(CarouselComponent.prototype, {
  init: function(node) {
    //iterate and construct models
    let defaultMode = CarouselComponent.modes.BOTH;
    let imgArray = this.imgArray;
    console.log(this.imagesArray);
    // let changeModeCallback = this.clickimage.bind(this);
    $.each(this.imagesArray["carousel"], function(index, value) {
      imgArray[index] = new Image(value);
    });
    this.mode = defaultMode;
    this.renderElements(node, imgArray);
  },
  renderElements: function(wrapper, array) {
    //binders
    let nextSlidesCallback = this.nextSlides.bind(this);
    let previousSlidesCallback = this.previousSlides.bind(this);
    let currentSlideCallback = this.currentSlide.bind(this);
    let manualCHangerCallback = this.manualMode.bind(this);
    let automaticCHangerCallback = this.automaticMode.bind(this);
    let bothCHangerCallback = this.bothMode.bind(this);

    //// add manual mode changers
    let manual = new MovementButtons("manual", manualCHangerCallback);
    let manualButton = manual.render();
    $(wrapper).append(manualButton);
    //// add automatic mode changers
    let automatic = new MovementButtons("automatic", automaticCHangerCallback);
    let automaticButton = automatic.render();
    $(wrapper).append(automaticButton);
    //// add automatic mode changers
    let both = new MovementButtons("both", bothCHangerCallback);
    let bothButton = both.render();
    $(wrapper).append(bothButton);

    //add dots + images
    console.log(array);
    let dotsWrapper = document.createElement("div");
    dotsWrapper.style.textAlign = "center";
    dotsWrapper.classList.add("dots-wrapper");

    $.each(array, function(index, value) {
      let image = value.render(index);
      $(wrapper).append(image);
      //add dots
      let dot = new MovementDots(index, currentSlideCallback);
      let dotElement = dot.render();
      $(dotsWrapper).append(dotElement);
    });

    $(wrapper).append(dotsWrapper);
    //add previous button
    let previous = new MovementButtons("prev", previousSlidesCallback);
    let previousButton = previous.render();
    $(wrapper).append(previousButton);
    // add next button
    let next = new MovementButtons("next", nextSlidesCallback);
    let nextButton = next.render();
    $(wrapper).append(nextButton);
    this.currentSlide(this.activeSlide);
    this.automaticSlideMove();
  },

  automaticSlideMove: function(interval = 2000) {
    let nextSlidesCallback = this.nextSlides.bind(this);
    let intervalId = window.setInterval(function() {
      nextSlidesCallback();
    }, interval);
    this.intervalId = intervalId;
  },
  manualMode: function() {
    window.clearInterval(this.intervalId);
    $(".prev")[0].style.display = "block";
    $(".next")[0].style.display = "block";
  },
  automaticMode: function() {
    window.clearInterval(this.intervalId);
    this.automaticSlideMove();
    $(".prev")[0].style.display = "none";
    $(".next")[0].style.display = "none";
  },
  bothMode: function() {
    window.clearInterval(this.intervalId);
    this.automaticSlideMove();
    $(".prev")[0].style.display = "block";
    $(".next")[0].style.display = "block";
  },

  nextSlides: function() {
    this.showSlides((this.activeSlide += 1));
  },
  previousSlides: function() {
    this.showSlides((this.activeSlide -= 1));
  },
  currentSlide: function(n) {
    this.showSlides((this.activeSlide = n));
  },

  showSlides: function(n) {
    var i;
    var slides = document.getElementsByClassName("container");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
      this.activeSlide = 1;
    }
    if (n < 1) {
      this.activeSlide = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
      slides[i].style.opacity = "0";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[this.activeSlide - 1].style.display = "block";
    slides[this.activeSlide - 1].style.opacity = "1";
    dots[this.activeSlide - 1].className += " active";
  }
});

export { CarouselComponent };
