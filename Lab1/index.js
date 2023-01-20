let newsArticles;

// func to get the data from the api
window.onload = async function getData() {
    fetch("https://api.nytimes.com/svc/news/v3/content/nyt/technology.json?api-key=Y3hV9GzhGJBa1SPAqHzvIoTAQ88qdubN&limit=201")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            newsArticles = data.results;
            console.log(newsArticles);
            makeNewsTicker(newsArticles);
        })
        .catch(function (error) {
            console.log(error);
        })
}
// func to make the news ticker
function makeNewsTicker(newsArticles) {
    let largeItem = document.getElementById("news-item-lg");
    let newsItems = document.getElementsByClassName("news-item");
    largeItem.href = newsArticles[0].url;
    //make the large news item
    let largeItemHTML = '<img src="' + checkImgNull(newsArticles[0].multimedia) + '" class="card-img-top pb-3" alt="..."></img>';
    largeItemHTML += '<h5 class="card-title px-3">' + newsArticles[0].title + '</h5>';
    largeItemHTML += '<h6 class="card-subtitle mb-2 text-muted px-3">By ' + changeByLine(newsArticles[0].byline) + '</h6>';
    largeItemHTML += '<p class="card-text px-3">' + newsArticles[0].abstract + '</p>';
    largeItemHTML += '<p class="card-text px-3"> <b>Tags</b>: ' + getTags(newsArticles[0].des_facet) + '</p>';
    largeItemHTML += '<div class="card-footer mt-auto">' + getTimeSinceUpload(newsArticles[0].published_date) + '</div>';
    largeItem.insertAdjacentHTML('beforeend', largeItemHTML);
    //make the small news items
    let newsindex = 1;
    //for loop to make the news items
    for (let i = 0; i < newsItems.length; i++) {
        newsItems[i].replaceChildren();
        newsItems[i].href = newsArticles[newsindex].url;
        let newsItemHTML = '<img src="' + checkImgNull(newsArticles[newsindex].multimedia) + '" class="card-img-top pb-3" alt="..."></img>';
        newsItemHTML += '<h5 class="card-title px-2">' + newsArticles[newsindex].title + '</h5>';
        newsItemHTML += '<div class="card-footer mt-auto">' + getTimeSinceUpload(newsArticles[newsindex].published_date) + ' &bull; ' + changeByLine(newsArticles[newsindex].byline) + '</div>'
        newsItems[i].insertAdjacentHTML('beforeend', newsItemHTML);
        newsindex++;
    }
    //set the interval to change the news items
    setInterval(function () {
        //for loop to make the news items
        for (let i = 0; i < newsItems.length; i++) {
            newsItems[i].replaceChildren();
            newsItems[i].href = newsArticles[newsindex].url;
            let newsItemHTML = '<img src="' + checkImgNull(newsArticles[newsindex].multimedia) + '" class="card-img-top pb-3" alt="..."></img>';
            newsItemHTML += '<h5 class="card-title px-2">' + newsArticles[newsindex].title + '</h5>';
            newsItemHTML += '<div class="card-footer mt-auto">' + getTimeSinceUpload(newsArticles[newsindex].published_date) + ' &bull; ' + changeByLine(newsArticles[newsindex].byline) + '</div>'
            newsItems[i].insertAdjacentHTML('beforeend', newsItemHTML);
            newsindex++;
            if (newsindex == newsArticles.length - 1) {
                newsindex = 1;
            }
        }

    }, 10000);
}

// func to check if the image is null
function checkImgNull(img) {
    //if the image is null return the placeholder image
    if (img == null) {
        return "./images/placeholder.jpg";
    } else {
        return img[2].url;
    }
}

// func to get tags
function getTags(tags) {
    let tagString = "";
    //for loop to get the tags
    for (let i = 0; i < tags.length; i++) {
        if (i == tags.length - 1) {
            tagString += tags[i];
            break;
        } else {
            tagString += tags[i] + ", ";
        }
    }
    return tagString;
}

// func to get time since upload
function getTimeSinceUpload(date) {
    //get the time stamp
    let timeStamp = Date.parse(date);
    //get the difference
    let diffTime = Date.now() - timeStamp;
    //get the difference in seconds
    let difference = Math.floor(diffTime / 1000);
    //array of time strings
    let timeStrings = ["second", "minute", "hour", "day", "week", "month", "year"];
    //array of time conversions
    let timeConversion = [1, 60, 3600, 86400, 604800, 2419200, 29030400];
    let dateString = "";
    //for loop to get the time difference
    for (let i = timeConversion.length - 1; i >= 0; i--) {
        //if the difference is greater than the time conversion
        if (difference >= timeConversion[i]) {
            //get the difference
            difference = Math.floor(difference / timeConversion[i]);
            //if the difference is 1 then it is singular
            if (difference == 1) {
                dateString = difference + " " + timeStrings[i] + " ago";
                //else it is plural
            } else {
                dateString = difference + " " + timeStrings[i] + "s ago";
            }
            break;
        }
    }

    return dateString;
}

// func to change the byline
function changeByLine(byline) {
    let bylineArray = byline.split(" ");
    let newbyline = "";
    //for loop to get the byline
    for (let i = 1; i < bylineArray.length; i++) {
        //if the byline is AND or has a comma, then break
        if (bylineArray[i] == "AND" || bylineArray[i].includes(",")) {
            break;
        }
        if (bylineArray[i].includes(",")) {
            newbyline += bylineArray[i].replace(",", "") + " ";
            break;
        }
        newbyline += toTitleCase(bylineArray[i]) + " ";
    }

    return newbyline;
}

// func to get change string to title case
function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }
    );
}