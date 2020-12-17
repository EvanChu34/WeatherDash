var input = document.getElementById("#city-input")
var nameEl = document.getElementById("#selected-city")
var currentTemp = document.getElementById("#temperature");
var currentHumid = document.getElementById("#humidity");
var currentWindS = document.getElementById("#wind-speed");
var currentUVI = document.getElementById("#UV-index");
var cityHistory = document.getElementById("#city-list");
var cityList = JSON.parse(localStorage.getItem("search")) || [];



function getWeatherInfo(cityName){
    var APIkey = "&appid=7deee8827dfbf279b7a9d2bd52377acb";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName + APIkey;
    
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
    getWeatherInfo(searchCity);
    cityList.push(searchCity);
    localStorage.setItem("search",JSON.stringify(cityList));
    createCityList();

})

// Search button history
function createCityList(){
    cityHistory.innerHTML = "";
    for (var i=0; i<cityList.length; i++){
        var cityItem = document.createElement("input");

        cityItem.setAttribute("type","text");
        cityItem.setAttribute("readonly",true);
        cityItem.setAttribute("class","form-contol d-block bg-white");
        cityItem.setAttribute("value", cityList[i]);
        cityItem.addEventListener("click",function(){
            getWeatherInfo(cityItem.value);
        })
        cityHistory.append(cityItem);
    }
}

// display the main data


// display the 5 day forcast


//


