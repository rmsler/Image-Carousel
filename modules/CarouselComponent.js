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
    this.bindCallbacks();
    this.renderElements(node, imgArray);
  },

  bindCallbacks: function() {
    this.nextSlidesCallback = this.nextSlides.bind(this);
    this.previousSlidesCallback = this.previousSlides.bind(this);
    //this.currentSlideCallback = this.currentSlide.bind(this);
    this.manualCHangerCallback = this.manualMode.bind(this);
    this.automaticCHangerCallback = this.automaticMode.bind(this);
    this.bothCHangerCallback = this.bothMode.bind(this);
  },

  renderElements: function(wrapper, array) {
    //binder
    let currentSlideCallback = this.currentSlide.bind(this);

    //// add manual mode changers
    let manual = new MovementButtons("manual", this.manualCHangerCallback);
    let manualButton = manual.render();
    $(wrapper).append(manualButton);
    //// add automatic mode changers
    let automatic = new MovementButtons("automatic", this.automaticCHangerCallback);
    let automaticButton = automatic.render();
    $(wrapper).append(automaticButton);
    //// add automatic mode changers
    let both = new MovementButtons("both", this.bothCHangerCallback);
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
    let previous = new MovementButtons("prev", this.previousSlidesCallback);
    let previousButton = previous.render();
    $(wrapper).append(previousButton);
    // add next button
    let next = new MovementButtons("next", this.nextSlidesCallback);
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
    this.activeSlide += 1;
    this.showSlides();
  },
  previousSlides: function() {
    this.activeSlide -= 1;
    this.showSlides();
  },
  currentSlide: function(n) {
    this.activeSlide = n;
    this.showSlides();
  },

  showSlides: function() {
    let currentSlide = this.activeSlide;
    var i;
    var slides = document.getElementsByClassName("container");
    var dots = document.getElementsByClassName("dot");
    if (currentSlide > slides.length) {
      this.activeSlide = 1;
    }
    if (currentSlide < 1) {
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
