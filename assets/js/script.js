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
        $("#weather").empty();
        var date = moment().format('L');

        var cityNameEl = $("<h3>").text(response.name);
        var dateEl = cityNameEl.append(" " + date);
        var tempEl = $("<p>").text("Temperature: " + response.main.temp);
        var humidityEl = $("<p>").text("Humidity: " + response.main.humidity)
        var windEl = $("<p>").text("Wind speed: " + response.wind.speed)
        var weatherEl = response.weather[0].main;
    });
}

$("#city-select").on("click", function (event) {
    event.preventDefault();

    var cityInput = $("#city-search").val().trim();
    citySearch(cityInput);
})