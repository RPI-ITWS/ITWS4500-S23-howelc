
const standardURL = "https://howelc.eastus.cloudapp.azure.com/node/uni";
let universityName = "rensselaer";
let searchName;
let searchCountry;
let searchButton = document.getElementById("search-button");
let collegeContainer = document.getElementById("college-container");


function search() {
    searchName = document.getElementById("search-name");
    searchCountry = document.getElementById("search-country");
    if (searchName.value.length > 0 ) {
        universityName = (searchName.value).split(" ");
        universityName = universityName[0];
        universityName = universityName.toLowerCase();
    }
    let url = standardURL + "/" + universityName;
    if (searchCountry.value != "0") {
        let country = (searchCountry.value).toLowerCase();
        url += "/" + country;
    }
    console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(data => {
            collegeContainer.replaceChildren();
            let searchHTML = `<h2 class="search-result">Search Results For: ${universityName}</h2>`;
            collegeContainer.insertAdjacentHTML("beforeend", searchHTML);
            for(let i = 0; i < data.length; i++) {
                let collegeHTML;
                collegeHTML = "<div class='college'>"
                collegeHTML += `University Name: ${data[i].name} 
                <br> Country: ${data[i].country} 
                <br> Web Page: <a href="${data[i].web_pages[0]}">${data[i].web_pages[0]}</a>`;
                collegeHTML += "</div>";
                collegeContainer.insertAdjacentHTML("beforeend", collegeHTML);
            }
            if (data.length == 0) {
                collegeHTML = "<h2 class='search-result'>No Results Found</h2>";
                collegeContainer.insertAdjacentHTML("beforeend", collegeHTML);
            }
        });
}

searchButton.addEventListener("click", search);
