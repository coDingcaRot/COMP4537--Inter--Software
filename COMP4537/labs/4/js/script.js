// ChatGPT was used in aiding the creation of this code
class ApiCaller {
    api_get(str) {
        const xhttp = new XMLHttpRequest();
        xhttp.open("GET", "https://jonathaniel-alipes-node-labs-rprg2.ondigitalocean.app/COMP4537/labs/4/api/definition/?word=" + str, true);
        xhttp.send();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                let responseBox = document.getElementById('get_response'); // Target the <p> tag
                try {
                    const response = JSON.parse(this.responseText);
                    if (this.status == 200) { //Good response word exists
                        responseBox.innerHTML = 
                            `Word: ${response.word}
                            <br><br>
                            Definition: ${response.definition}
                            <br><br>
                            Request #${response.totalRequests}`; 
                        responseBox.style.color = "black"; 
                    } 
                    else if (this.status == 400){ //Error empty search
                        responseBox.innerHTML = 
                        `${response.message}
                        <br><br>
                        Request #${response.totalRequests}`; 
                        responseBox.style.color = "red"; 
                    } 
                    else { //Word not found in dictionary
                        responseBox.innerHTML = 
                        `${response.message}
                        <br><br>
                        Request #${response.totalRequests}`;
                        responseBox.style.color = "red";
                    }
                } catch (e) { // any other extra errors
                    responseBox.innerHTML = "Failed to parse response";
                    responseBox.style.color = "red";
                }
                responseBox.style.fontWeight = "bold";
            }
        };
    }

    api_post(word, definition) {
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "https://jonathaniel-alipes-node-labs-rprg2.ondigitalocean.app/COMP4537/labs/4/api/definition", true);
        xhttp.setRequestHeader("Content-Type", "application/json"); 
        
        const data = JSON.stringify({ word: word, definition: definition }); // Converts Data into json string format
        xhttp.send(data); //sends the data

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                const responseBox = document.getElementById('get_response');

                try {
                    const response = JSON.parse(this.responseText); // Parse response JSON
                    if (this.status == 201) {  //word succesfully created
                        responseBox.innerHTML = 
                        `${response.message}
                        <br><br>
                        Total Entries: ${response.totalEntries}
                        <br><br>
                        Request #${response.totalRequests}`;
                        responseBox.style.color = "green";
                    } 
                    else if (this.status == 409) { //Word conflict
                        responseBox.innerHTML = 
                        `${response.message}
                        <br><br>
                        Request #${response.totalRequests}`;
                        responseBox.style.color = "red";
                    } 
                    else { //Empty input boxes
                        responseBox.innerHTML = 
                        `${response.message}
                        <br><br>
                        Request #${response.totalRequests}`;
                        responseBox.style.color = "red";
                    }
                } catch (e) { //Any extra error
                    responseBox.innerHTML = "Unexpected error.";
                    responseBox.style.color = "red";
                }
                responseBox.style.fontWeight = "bold";
            }
        };
    }
}

// Loads functionalities
document.addEventListener("DOMContentLoaded", () => {
    let path = window.location.pathname.split("/").pop();

    // Remove the ".html" extension if it exists
    path = path.replace(".html", "");

    let ac = new ApiCaller();

    if (path === "search") { //get method
        document.getElementById('searchpage_button').addEventListener('click', () => {
            let searchInput = document.getElementById("search_input").value.trim();
            ac.api_get(searchInput);
        })   
    }
    if (path === "store"){ //post method
        document.getElementById('storepage_button').addEventListener('click', () => {
            let storeWordInput = document.getElementById("store_word_input").value.trim();
            let storeDefInput = document.getElementById("store_def_input").value.trim();
            ac.api_post(storeWordInput, storeDefInput);
        });
    };
});
