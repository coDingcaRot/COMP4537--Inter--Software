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

class TextLoader{
    loadHomepageText(){
        const title = new Text(homepageTitle);
        title.fill("homepage_title");

        const searchBtn = new Text(homepageSearchButton);
        searchBtn.fill("search_button");

        const storeBtn = new Text(homepageStoreButton);
        storeBtn.fill("store_button");
    }

    loadSearchPageText(){
        const searchTitle = new Text(searchPageTitle);
        searchTitle.fill("searchpage_title");

        const searchPageBtn = new Text(searchPageButton);
        searchPageBtn.fill("searchpage_button");
    }

    loadStorePageText(){
        const storeTitle = new Text(storePageTitle);
        storeTitle.fill("storepage_title");

        const storePageBtn = new Text(storePageButton);
        storePageBtn.fill("storepage_button");
    }
}

// Loads texts
document.addEventListener("DOMContentLoaded", () => {
    let path = window.location.pathname.split("/").pop();

    // Remove the ".html" extension if it exists
    path = path.replace(".html", "");

    const tl = new TextLoader(); // one instance
    if (path === "index" || path === "") tl.loadHomepageText();
    if (path === "search") tl.loadSearchPageText();
    if (path === "store") tl.loadStorePageText();
})