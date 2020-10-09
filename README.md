# Weather-Dashboard
**WARNING this site contains flashing lights which can cause seizures**

## Deployment Link to Application
<a href="https://michael-veiga.github.io/weather-dashboard/" target="_blank">Weather Dashboard Link</a>

## Table of Contents
- [Purpose](#Purpose)
- [User Story](#User-Story)
- [Acceptance Criteria](#Acceptance-Criteria)
- [Review](#Review)
- [Example Gif](#Example-Gif)

## Purpose
The purpose of this application was to make a weather-dashboard that would give you the current weather, 
uv index and 5 day forecast of a city. The application should also create clickable buttons that 
populate with the search history.

## User-Story 
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly

## Acceptance-Criteria 
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
WHEN I open the weather dashboard
THEN I am presented with the last searched city forecast

## Review
This assignment was challengeing, but alot of fun. One of the biggest challenges I ran into was figuring out how to loop over the forecast array for the 5 day forecast. I picked up that we needed to use a += operator fairly quickly, because there were 40 indexes in the array, which divided by 8 would equal 5 days. However, if I started at the 0 index then I would end up populating that days date on the first card, so I started at the 3rd index instead. Another challenging part was using the substr() method to get the exact number of characters for the date to display. It's really quite amazing how many different methods we have at our disposal. I also found the stock icon images to be really boring, so I imported my own colorful ones from icon 8. All in all, i've found jQuery to be alot easier than vanilla javascript and calling different apis usually isn't all that difficult. 

## Example-Gif
![Gif of weather-dashboard application](https://media.giphy.com/media/yAZYSZN9bBJ5f1nH22/giphy.gif);
