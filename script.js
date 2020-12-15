var currentTemp = document.getElementById("#temperature");
var currentHumid = document.getElementById("#humidity");
var currentWindS = document.getElementById("#wind-speed");
var currentUVI = document.getElementById("#UV-index");


var cityList = [];

function displayWeatherInfo(cityName){
var APIkey = "7deee8827dfbf279b7a9d2bd52377acb";
var queryURL = "api.openweathermap.org/data/2.5/weather?q="+ cityName + "&appid=" + APIkey;

$.ajax({
    url: queryURL,
    method: "GET"

}).then(function(response){
    console.log(response);
});

}


// search button


// store city data


// display the main data


//


// display the 5 day forcast


//


