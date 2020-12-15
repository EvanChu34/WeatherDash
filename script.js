var input = document.getElementById("#city-input")
var nameEl = document.getElementById("#selected-city")
var currentTemp = document.getElementById("#temperature");
var currentHumid = document.getElementById("#humidity");
var currentWindS = document.getElementById("#wind-speed");
var currentUVI = document.getElementById("#UV-index");
var cityList = [];



function getWeatherInfo(cityName){
    var APIkey = "7deee8827dfbf279b7a9d2bd52377acb";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=&appid=" + APIkey;
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        nameEl.innerHTML = response;
        currentTemp.innerHTML = response.list[0].main.temp
        currentHumid.innerHTML = response.list[0].main.humidity
        currentWindS.innerHTML = response.list[0].wind.speed
        //currentUVI.innerHTML = response.list[0].main.
    });

}


// search button
$("#searchBTn").on("click", function(){
    var searchCity = input.Value;

})

// store city data


// display the main data


// display the 5 day forcast


//


