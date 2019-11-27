import {Image} from "./Image.js";

function CarouselComponent(imagesArray){
    if (!(this instanceof CarouselComponent)) { 
        return new CarouselComponent(imagesArray);
    }
    this.imagesArray = imagesArray;
    this.imgArray = [];
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
        console.log(node);
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
        $.each(array, function (index, value){
            let image = value.render(index);
            $(wrapper).append(image);
        });
    },

    clickimage : function(element) {
        let index = element[element.search("image") + 5];
        let boundResetState = this.resetimagesState.bind(this);
        
        if(this.isRadio()) {
            boundResetState();
            this.imgArray[index].state = true;
        } 
        
    }
});

export { CarouselComponent };