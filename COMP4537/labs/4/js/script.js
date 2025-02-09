/* The creation of this js is aided by chatgpt */

class api_caller{

}

class loader{

}

// Creates and fills the dom with strings
class Text{
    constructor(string){
        this.string = string;
    }

    fill(id){
        document.getElementById(id).innerHTML = this.string;
    }

    fillClass(className, index){
        document.getElementsByClassName(className)[index].innerHTML = this.string;
    }
}

// Initialize the segments.
document.addEventListener("DOMContentLoaded", () => {
    //When dom loads use the loader to load the texts and the api call functions
})