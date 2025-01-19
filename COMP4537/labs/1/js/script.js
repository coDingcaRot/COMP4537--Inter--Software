//Notes object for styling and designing
class Note {
    constructor(id) {
        // Initialize the note with a unique ID and create the textarea
        this.id = id;
        this.textarea = document.createElement("textarea");
        this.key = `key${this.id}`; 
        this.contents = ""; // Initialize content as an empty string

        // Listen for input in the textarea and update the contents
        this.textarea.addEventListener("input", (keypress) => {
            this.contents = keypress.target.value;
        });

        // Set attributes for the textarea
        this.textarea.setAttribute("id", this.id);
        this.textarea.setAttribute("name", this.id);

        // Styling for the textarea
        this.textarea.style.resize = "none";
        this.textarea.style.width = "10em";
        this.textarea.style.height = "5em";
    }

    // Getters and setters
    getId() {
        return this.id;
    }

    getTextArea() {
        return this.textarea;
    }

    getContent() {
        return this.contents;
    }

    getKey() {
        return this.key;
    }

    setContent(string) {
        this.contents = string;
    }

    setReadOnly(boolVal){
        this.textarea.setAttribute("readonly", boolVal);
        this.textarea.disabled = boolVal;
        this.textarea.style.color = "black";
    };
}

//Centralize area for creating, modifying and deleting notes
class NoteManager {
    constructor() {
        this.notes = [];
    }

    // Initializes the add button with functionality
    initAdd() {
        let index = this.notes.length;

        document.getElementById("addBtn").addEventListener("click", () => {
            // Create a new Note and add it to the notes array
            let note = new Note(`${Date.now()}`);
            this.notes.push(note);
            this.#generateNote(note, "writingBox");
            index++;
        });
    }

    //auto saves
    autoSaver() {
        let lastSave = document.getElementById("lastSave");
        setInterval(() => {
            this.notes.forEach(note => {
                localStorage.setItem(note.getKey(), note.getContent());
            });
    
            //create a new date and get its current time
            const now = new Date();
            lastSave.textContent = `Stored at: ${now.toLocaleTimeString()}`;
        }, 2000);
    }
    
    // Retrieves the notes from localStorage and displays them
    retrieveNotes(page) {
        if(page == "readingBox"){
            // Clear existing notes in the specified page container
            const container = document.getElementById(page);
            container.innerHTML = ""; // Remove all child elements

            // Clear the notes array to avoid duplicates
            this.notes = [];
        }

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const content = localStorage.getItem(key); // Get the stored content
            const id = key.replace("key", ""); // Replace "key" with empty string to get the ID

            const note = new Note(id);
            note.setContent(content);
            note.textarea.value = content;

            if(page == "readingBox") 
                note.setReadOnly(true); 

            this.notes.push(note);
            this.#generateNote(note, page); // Generate the note UI
        }
    }

    // Creates a text area note with a spacing and delete button
    #generateNote(note, page) {
        // Append the textarea to the "writingBox" div
        document.getElementById(page).appendChild(note.getTextArea());

        // Create and assign a delete button to the note
        if(page == "writingBox"){
            this.#generateButton(note);
        }

        // Create a line break for spacing
        let br = document.createElement("br");
        br.setAttribute("id", `br${note.getId()}`);
        document.getElementById(page).appendChild(br);
    }

    // Generates a delete button assigned to the note
    #generateButton(note) {
        let btn = document.createElement("button");
        btn.innerHTML = "Delete";
        btn.setAttribute("name", note.getId());
        btn.setAttribute("id", `btn${note.getId()}`);
        btn.addEventListener("click", () => {
            // Remove the note, button, and line break from the UI and localStorage
            document.getElementById(note.getId()).remove();
            document.getElementById(`btn${note.getId()}`).remove();
            document.getElementById(`br${note.getId()}`).remove();

            this.notes = this.notes.filter(n => n.getId() !== note.getId());

            localStorage.removeItem(note.getKey());  
        });

        // Append the delete button to the "writingBox" div
        document.getElementById("writingBox").appendChild(btn);
    }
}


// Creates and fills the dom by text
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

// Landing Page Deals with the main page loading and rendering
class Landing{
    constructor(){ 
        this.texts = {
            "landingTitle": landingTitle, 
            "writerLink" : writerLink, 
            "readerLink" : readerLink};

        this.#init();
    }

    #init(){
        this.#loadLandingText();
    }

    #loadLandingText(){
        for(const id in this.texts){
            let t = new Text(this.texts[id]);
            t.fill(id);
        }
    }
}

class Writer{
    constructor(nm){
        this.nm = nm;
        this.#init();
    }

    #init(){
        //loads text, titles, and add functionality once
        this.#loadWriterText();
        this.nm.retrieveNotes("writingBox");
        this.nm.initAdd();
        this.nm.autoSaver(); //auto save to storage.
    }

    // Loads the writer
    #loadWriterText(){
        let addText = new Text(addBtn);
        addText.fill("addBtn");

        let title = new Text(writerTitle);
        title.fill("writerTitle");

        let backText = new Text(backBtn);
        backText.fillClass("backBtn", 0);
    }
}

class Reader{
    constructor(nm){
        this.nm = nm;
        this.#init();
    }

    #init(){
        let lastRead = document.getElementById("lastRead");
        //loads text, titles, and add functionality once
        window.addEventListener("load", () => {
            this.#loadReaderText();
        });

        setInterval(() => {
            this.nm.retrieveNotes("readingBox");
            const now = new Date();
            lastRead.textContent = `Updated at: ${now.toLocaleTimeString()}`;
        }, 2000);
    }

    // Loads the writer
    #loadReaderText(){
        let title = new Text(readerTitle);
        title.fill("readerTitle");

        let backText = new Text(backBtn);
        backText.fillClass("backBtn", 0);
    }
}

//instantiate a different class based on this.
document.addEventListener("DOMContentLoaded", () => {
    let path = window.location.pathname.split("/").pop();

    // Remove the ".html" extension if it exists
    path = path.replace(".html", "");

    if (path === "index" || path === "") new Landing();
    if (path === "writer") new Writer(new NoteManager());
    if (path === "reader") new Reader(new NoteManager());
});
