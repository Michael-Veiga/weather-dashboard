// Get current weather from city input
// Create function for apiKey and queryURL
function citySearch(cityname) {
    var apiKey = "f05e8402bde57056482bf85c1466a99c";
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}`;

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        console.log(response);
        // Remove content from id so that new info can be populated
        $("#weather").empty();
        // add date variable that updates dynamically with moment.js
        var date = moment().format('L');
        // create variables for html weather info to display
        var cityNameEl = $("<h3>").text(response.name);
        var dateEl = cityNameEl.append(" " + date);
        var tempEl = $("<p>").text("Temperature: " + response.main.temp);
        var humidityEl = $("<p>").text("Humidity: " + response.main.humidity)
        var windEl = $("<p>").text("Wind speed: " + response.wind.speed)
        var weatherEl = response.weather[0].main;
        // create if else statements tied to the weather array so that images can display 
        if (weatherEl === "Clouds") {
            var weatherImg = $("<img>").attr("src", "https://img.icons8.com/color/48/000000/cloud.png");
        } else if (weatherEl === "Rain") {
            var weatherImg = $("<img>").attr("src", "https://img.icons8.com/color/48/000000/intense-rain.png")
        } else if (weatherEl === "Drizzle") {
            var weatherImg = $("<img>").attr("src", "https://img.icons8.com/color/48/000000/light-rain.png")
        } else if (weatherEl === "Snow") {
            var weatherImg = $("<img>").attr("src", "https://img.icons8.com/color/48/000000/snow.png")
        } else if (weatherEl === "Clear") {
            var weatherImg = $("<img>").attr("src", "https://img.icons8.com/color/48/000000/summer.png")
        }
        // Create new html div that appends new elements to display on page
        var newDiv = $("<div>");
        newDiv.append(dateEl, weatherImg, tempEl, humidityEl, windEl);

        $("#weather").html(newDiv);

        // Call new api to get UV index using latitude and longitude data 
        var latitude = response.coord.lat;
        var longitude = response.coord.lon;
    });
}

$("#city-select").on("click", function (event) {
    event.preventDefault();

    var cityInput = $("#city-search").val().trim();
    citySearch(cityInput);
})