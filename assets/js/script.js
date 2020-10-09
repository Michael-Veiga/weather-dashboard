// **Layout referenced from https://github.com/cmelby/WeatherDashboard/blob/master/script.js
// ** Icons taken from https://icons8.com/icon/pack/weather/color

// Get current weather from city input
// Create function for apiKey and queryURL
function citySearch(cityname) {
    var apiKey = "f05e8402bde57056482bf85c1466a99c";
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}&units=imperial`;
    var queryForecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=${apiKey}&units=imperial`;

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
            var weatherImg = $("<img>").attr("src", "https://img.icons8.com/color/48/000000/intense-rain.png");
        } else if (weatherEl === "Drizzle") {
            var weatherImg = $("<img>").attr("src", "https://img.icons8.com/color/48/000000/light-rain.png");
        } else if (weatherEl === "Snow") {
            var weatherImg = $("<img>").attr("src", "https://img.icons8.com/color/48/000000/snow.png");
        } else if (weatherEl === "Clear") {
            var weatherImg = $("<img>").attr("src", "https://img.icons8.com/color/48/000000/summer.png");
        }
        // Create new html div that appends new elements to display on page
        var newDiv = $("<div>");
        newDiv.append(dateEl, weatherImg, tempEl, humidityEl, windEl);

        $("#weather").html(newDiv);

        // Call new api to get UV index using latitude and longitude data 
        var latitude = response.coord.lat;
        var longitude = response.coord.lon;
        // call new uvApi to get UV data
        var queryUvURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${latitude}&lon=${longitude}`

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
            else if (uvValue > 7 && uvValue < 10) {
                $(uvEl).attr("style", "background-color: Red");
            }
            else if (uvValue > 10) {
                $(uvEl).attr("style", "background-color: Purple");
            }
            $("#uv").html(uvEl)
        });
    });

    // Get a five day forecast by calling the 5 day forecast api
    $.ajax({
        url: queryForecastURL,
        method: 'GET'
    }).then(function (forecastResponse) {
        console.log(forecastResponse);
        // store array results
        var forecastArr = forecastResponse.list;
        // empty existing div
        $("#5dayForecast").empty();
        // empty existing title
        $("#forecastTitle").empty();

        var forecastTitle = $("<h2 class='header text-white'>").text("Five Day Forecast");
        $("#forecastTitle").append(forecastTitle);
        // create a for loop that that loops through the list array and use an operator to increment by 8 in order to capture each day
        // set the i variable to at least 3, so that the main card and the first forecast card arent the same date 
        for (var i = 3; i < forecastArr.length; i += 8) {
            // make div for five day forecast
            var fiveDayForecast = $("<div class='card shadow-lg text-white bg-primary mx-auto mb-10 p-2' style='width: 8.5rem; height: 11rem;'>");
            // create variable for forecast date, temp, humidity 
            var forecastDate = forecastArr[i].dt_txt;
            var forecastTemp = forecastArr[i].main.temp;
            var forecastHumidity = forecastArr[i].main.humidity;
            // create variable to set the date 
            // Use substr() to extract part of the string from the forecast date beginning at the 0 index and return 10 characters
            var forecastSetDate = forecastDate.substr(0, 10);
            // create tags for each of the variables
            var headerDate = $("<h5 class='card-title'>").text(forecastSetDate);
            var tempText = $("<p class='card-text'>").text("Temp: " + forecastTemp + "°F");
            var humidityText = $("<p class='card-text'>").text("Humidity: " + forecastHumidity + "%");

            // 
            var forecastWeatherEl = forecastArr[i].weather[0].main;
            // make the icons display on the cards
            if (forecastWeatherEl === "Clouds") {
                var forecastImg = $("<img>").attr("src", "https://img.icons8.com/color/48/000000/cloud.png");
                forecastImg.attr("style", "height: 48px; width: 48px");
            } else if (forecastWeatherEl === "Rain") {
                var forecastImg = $("<img>").attr("src", "https://img.icons8.com/color/48/000000/intense-rain.png");
                forecastImg.attr("style", "height: 48px; width: 48px");
            } else if (forecastWeatherEl === "Drizzle") {
                var forecastImg = $("<img>").attr("src", "https://img.icons8.com/color/48/000000/light-rain.png");
                forecastImg.attr("style", "height: 48px; width: 48px");
            } else if (forecastWeatherEl === "Snow") {
                var forecastImg = $("<img>").attr("src", "https://img.icons8.com/color/48/000000/snow.png");
                forecastImg.attr("style", "height: 48px; width: 48px");
            } else if (forecastWeatherEl === "Clear") {
                var forecastImg = $("<img>").attr("src", "https://img.icons8.com/color/48/000000/summer.png");
                forecastImg.attr("style", "height: 48px; width: 48px");
            }
            // append the recently created div with the new information and images
            fiveDayForecast.append(headerDate);
            fiveDayForecast.append(forecastImg);
            fiveDayForecast.append(tempText);
            fiveDayForecast.append(humidityText);

            $("#5dayForecast").append(fiveDayForecast);
        }
    });
}
getHistory();

$("#city-select").on("click", function (event) {
    event.preventDefault();

    var cityInput = $("#city-search").val().trim();
    // create JSON storage for city search
    // taking sibling of city-select and pass through the input
    var lastSearch = $(this).siblings("input").val();
    // create empty array for previous inputs
    var inputArr = [];
    // push lastSearch variable into empty array
    inputArr.push(lastSearch);
    // set to local storage and stringify
    localStorage.setItem('city', JSON.stringify(inputArr));
    citySearch(cityInput);
    getHistory();
});

// get stored items to display by calling new function
function getHistory() {
    // retrieve stored data using getItem
    var cityTxt = JSON.parse(localStorage.getItem("city"));
    var lastSearchButton = $("<button class='btn border text-muted mt-1 shadow-sm bg-white rounded' style='width: 12rem;'>").text(cityTxt);
    var historyDiv = $("<div>");
    // append the new siv with the lastSearchButton
    historyDiv.append(lastSearchButton);
    $("#search-history").prepend(historyDiv);
}

// create event listener for accessing stored search histroy 
$("#search-history").on("click", '.btn', function (event) {
    event.preventDefault();

    console.log($(this).text());
    citySearch($(this).text());
});

