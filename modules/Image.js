
function Image(config) {
    if (!(this instanceof Image)) { 
        return new Image(config);
    }
    this.name = config.Name;
    this.text = config.Text;
    this.domReference = null;
};
Object.assign(Image.prototype, {
    onClick: function(event) {
        // console.log("clasName: "+ event.target.className);
        this.state = !this.state;
        this.changeStateCallback(event.target.className);
        this.updateVisual();
    },

    updateVisual: function() {
        this.domReference.classList.remove(String(!this.state))
        this.domReference.classList.add(String(this.state));
    },

    render: function(labelNo) {
        let label = "image" + labelNo;
        let domElement = document.createElement("div");
        domElement.classList.add("container");
        let content = document.createElement("img");
        content.classList.add(this.name);
        content.classList.add("image");
        content.classList.add(label);
        content.href = this.text;
        let textchild = document.createTextNode(this.name);
        content.appendChild(textchild);
        $(domElement).append(content);
        this.domReference = domElement;
        return domElement
    }
});
export { Image };