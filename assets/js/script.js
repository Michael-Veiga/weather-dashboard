// Get current weather from city input
// Create function for apiKey and queryURL
function citySearch(cityname) {
    var apiKey = "f05e8402bde57056482bf85c1466a99c";
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}&units=imperial`;

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
        var tempEl = $("<p>").text("Temperature: " + response.main.temp + "°F");
        var humidityEl = $("<p>").text("Humidity: " + response.main.humidity + "%")
        var windEl = $("<p>").text("Wind speed: " + response.wind.speed + "mph")
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
        // call new uvApi to get UV data
        var queryUvURL = `http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${latitude}&lon=${longitude}`

        $.ajax({
            url: queryUvURL,
            method: 'GET'
        }).then(function (uvResponse) {
            $("#uv").empty();
            // store uv response and value
            var uvValue = uvResponse.value;
            var uvEl = $("<span class='badge badge-success'>").text("UV Index: " + uvValue);
            // make uv badge change color based on the severity of the uv
            if (uvValue > 3 && uvValue < 7) {
                $(uvEl).attr("style", "background-color: Orange");
            }
            else if (uvValue > 7) {
                $(uvEl).attr("style", "background-color: Red");
            }
            $("#uv").html(uvEl)
        });
    });

    // Get a five day forecast by calling the 5 day forecast api
    var queryForecastURL = `http://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=${apiKey}&units=imperial`;

    $.ajax({
        url: queryForecastURL,
        method: 'GET'
    }).then(function (forecastResponse) {
        console.log(forecastResponse);
        // store array results
        var forecastArr = forecastResponse.list;
        // empty existing div
        $("#5dayForecast").empty();

        for (var i = 0; i < forecastArr.length; i += 8) {
            // make div for five day forecast
            var fiveDayForecast = $("<div class='card shadow-lg text-primary border-primary mx-auto mb-10 p-2' style='width: 8.5rem; height: 11rem;'>")
            // create variable for forecast date, temp, humidity 
            var forecastDate = forecastArr[i].dt_txt;
            var forecastTemp = forecastArr[i].main.temp;
            var forecastHumidity = forecastArr[i].main.humidity;
            // create tags for each of the variables
            // make the icons display on the cards
            // append the recently created div with the new information and images
        }
    })
}

$("#city-select").on("click", function (event) {
    event.preventDefault();

    var cityInput = $("#city-search").val().trim();
    citySearch(cityInput);
})