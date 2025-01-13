// Class for buttons behaviours and creation.
// Has a colour obj
class Button{
    constructor(colour, number, top, left){
        //Create a button and give it styles.
        this.button = document.createElement("button"); //Create element
        this.button.style.backgroundColor = colour.getValue();
        this.button.id = number;
        this.button.innerHTML = number;
        this.button.style.position = "relative";
        this.button.style.top = top + "px";
        this.button.style.left = left + "px";

        this.button.disabled = true; //initially disable button clickability

        document.getElementById("gamebox").appendChild(this.button); // add to dom tree
    }

    // Setting the top and left position of the button
    setPosition(top, left){
        this.button.style.top = top + "px";
        this.button.style.left = left + "px";
    }

    //Hides and shows the buttons
    setDisplay(display){
        this.button.style.display = display;
    }

    // displays the number
    displayNumber(value){
        if(!value){
            this.button.innerHTML = "";
        } else {
            this.button.innerHTML = this.button.id;
        }
    }

    // disables button clickability
    disableButton(value){
        this.button.disabled = value;
    }

    // Used to fetch the number for later use
    getButtonId() {
        return this.button.id;
    }
}

//Generates Colours
class Colour{
    constructor(){
        this.type = this.#randColour();
    }

    // Gets randomized hex colour value
    getValue(){
        return this.type;
    }

    //Creates a random hex number for a colour.
    #randColour(){
        let colour = "#";
        let maxHexColourSize = 6;
         for(let i = 0; i < maxHexColourSize; i++){
            let value = Math.floor(Math.random() * 16);
            
            if(value >= 10) 
                value = value.toString(16).toUpperCase();
        
            colour += value;
        }

        return colour;
    }
}

// Class managing how the box game starts and ends.
class Game{
    constructor(){
        this.buttonList = [];
        this.timeoutList = [];
        this.timeIntervalList = [];

        document.getElementById("inputSubmission").addEventListener('click', () => {this.start()});
    }

    /**
     * Used Chatgpt for determining shuffle methods.
     */
    //Overall game logic
    start(){

        //clears game for any resets.
        this.#clearGameBox();

        //Get user input and check arguments
        let buttonCount = this.#readUserInput();
        let minButtonCount = 3;
        let maxButtonCount = 7;

        //Generate buttons and values.
        if(buttonCount < minButtonCount || buttonCount > maxButtonCount || isNaN(buttonCount)){
            new Text("confirmationMessage", confrimationInvalid, 3000);
        } else {  
            for(let i = 0; i < buttonCount; i++){
                let top = 100;
                let left = i * 100;
                this.buttonList.push(new Button(new Colour(), i+1, top, left));
            }
        }

        //calculate time to hide and show
        let time = this.buttonList.length * 1000;
        
        //pause for n time and then hide, scatter, and show buttons every 2 seconds for n times
        this.timeoutList.push(setTimeout(() => {
            // Step 1: Hide the buttons
            this.#displayButtons(false);

            let scatterCount = 0; // tracks how many times we scattered
            let scatterInterval = setInterval(() => {
                this.#scatterButtons();
                scatterCount++;

                this.#displayButtons(true);

                if (scatterCount >= this.buttonList.length) {
                    clearInterval(scatterInterval);
                    scatterCount = 0;
                }
            }, 2000); // Scatter every 2 seconds

        }, time)); // Initial pause before starting scatter
        
        //call game loop
        this.#gameLoop();
    }
    
    // INITIAL GAME LOGIC READING AND CLEARING BOX
    // Reads user input and returns it
    #readUserInput(){
        return document.getElementById("input").value; // get user input
    }

    // Clears game area everytime the game starts
    #clearGameBox(){

        //empties input check msg and gamebox.
        document.getElementById("gamebox").innerHTML = "";
        document.getElementById("confirmationMessage").innerHTML = "";
        this.buttonList.length = 0;

        // Clear any existing timeouts and intervals and reset it
        this.timeoutList.forEach(timer => clearTimeout(timer));
        this.timeoutList.length = 0; 
    }

    // Hide or Show the button
    #displayButtons(value){
        if(this.buttonList.length <= 0)
            return;

        if(!value){
            this.buttonList.forEach(button => {
                button.setDisplay("none");
            })
        } else if (value) {
            this.buttonList.forEach(button => {
                button.setDisplay("block");
                button.disableButton(false);
            })
        }
    }

    // Randomly places the buttons in a random area and hides their number.
    #scatterButtons(){    
        let height = window.innerHeight - 500;
        let width = window.innerWidth - 500;

       this.buttonList.forEach(button => {
            button.setPosition(
                Math.floor(Math.random() * height),  
                Math.floor(Math.random() * width)
            );
            button.displayNumber(false);
       });
    }

    // Game loop for clicking buttons
    #gameLoop(){
        if(this.buttonList.length <= 0)
            return;

        let counter = 1;

        //Add event logic to each button
        this.buttonList.forEach(button => {
            const buttonNumber = button.getButtonId();

            document.getElementById(buttonNumber).addEventListener('click', () => {
                if(counter == parseInt(buttonNumber)){
                    button.displayNumber(true);
                    counter++; 

                    if(counter > this.buttonList.length){
                        alert(gameWinMsg);
                        this.#clearGameBox();
                    }
                } else{
                    alert(gameFailMsg);
                    this.#revealAll();
                    let timer = setTimeout(() => {
                        this.#clearGameBox();
                        clearTimeout(timer);
                    }, this.buttonList.length * 1000)
                }
            });
        })
    }

    // Reveals all buttons. So its much clearer
    #revealAll(){
        if(this.buttonList.length <= 0 ) return;

        this.buttonList.forEach(button => {
            button.disableButton(true);
            button.displayNumber(true);
        })
    }

}

// Class related for text behvaiour, Displaying. Showing and fetching Texts from user.js en
class Text{
    constructor(id, textValue, timeInterval){
        this.#displayText(id, textValue);
        if(timeInterval > 0){
            setTimeout(() => {
                this.#clearText(id);
            },
            timeInterval);
        } 
    }

    #displayText(id, textValue){
        return document.getElementById(id).innerHTML = textValue;
    }

    #clearText(id){
        document.getElementById(id).innerHTML = "";
    }
}


// Initialize the segments.
document.addEventListener("DOMContentLoaded", () => {
    new Text("message", displayMessage, 0);
    new Game();
})