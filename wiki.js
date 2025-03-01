let searchInputEl = document.getElementById('searchInput');
let searchResultsContainer = document.getElementById('searchResults');
let spinnerEl = document.getElementById('spinner');

function createAndAppendsearchresult(result) {
    // we have to stati part dynamically 


    // creating result result item 

    let resultItemDivElemenet = document.createElement("div");
    resultItemDivElemenet.classList.add("result-item");
    searchResultsContainer.appendChild(resultItemDivElemenet);

    // create title

    let {
        description,
        link,
        title
    } = result;
    let titleAnchorEl = document.createElement('a');
    titleAnchorEl.classList.add("result-title");
    titleAnchorEl.href = link;
    titleAnchorEl.target = "_blank";
    titleAnchorEl.textContent = title;
    searchResultsContainer.appendChild(titleAnchorEl);
    // create break element 

    let titleBreakEl = document.createElement('br');
    searchResultsContainer.appendChild(titleBreakEl);

    // create url element
    let urlAnchorEl = document.createElement('a');
    urlAnchorEl.classList.add("result-url");
    urlAnchorEl.href = link;
    urlAnchorEl.target = "_blank";
    urlAnchorEl.textContent = link;
    searchResultsContainer.appendChild(urlAnchorEl);


    // create break element     
    let urlBreakEl = document.createElement('br');
    searchResultsContainer.appendChild(urlBreakEl);


    // create description element

    let desParaEl = document.createElement('p');
    desParaEl.classList.add('link-description');
    searchResultsContainer.appendChild(desParaEl);
    desParaEl.textContent = description;



}



function displaysearchresults(searchresults) {
    for (let result of searchresults) {
        createAndAppendsearchresult(result);
    }
}

function searchingwikipidea(event) {
    if (event.key === "Enter") {

        spinnerEl.classList.remove("d-none");
        searchInputEl.textContent = "";

        let searchInput = searchInputEl.value;
        let url = "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=" + encodeURIComponent(searchInput);

        fetch(url)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let searchResults = jsonData.query.search.map(result => ({
                    link: https://en.wikipedia.org/?curid=${result.pageid},
                    title: result.title,
                    description: result.snippet
                }));
                spinnerEl.classList.add('d-none');
                displaysearchresults(searchResults);
            });
    }
}


searchInputEl.addEventListener("keydown", searchingwikipidea);
