var input = document.getElementById("#city-input")
var nameEl = document.getElementById("#selected-city")
var currentPic = document.getElementById("#current-pic")
var currentTemp = document.getElementById("#temperature");
var currentHumid = document.getElementById("#humidity");
var currentWindS = document.getElementById("#wind-speed");
var currentUVI = document.getElementById("#UV-index");
var cityHistory = document.getElementById("#city-list");
var cityList = JSON.parse(localStorage.getItem("search")) || [];

var APIkey = "&appid=7deee8827dfbf279b7a9d2bd52377acb";

function getWeatherInfo(cityName){
    
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName + APIkey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        var currentDate = new Date(response.data.dt);
        console.log(currentDate);
        var day = currentDate.getDate();
        var month = currentDate.getMonth();
        var year = currentDate.getFullYear();
        nameEl.innerHTML = response.data.name + (month + "/" + day + "/" + year);
        var weatherIcon = response.data.weather[0].icon;
        currentPic.setAttribute("src","https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
        currentTemp.innerHTML = "Temperature: " + response.data.main.temp 
        currentHumid.innerHTML = "Humidity: " + response.data.main.humidity + "%";
        currentWindS.innerHTML = "wind Speed: " + response.data.wind.speed + "MPH";       
    })
    // UV 
    var lat = response.data.coord.lat;
    var lon = response.data.coord.lon;
    var UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + APIKey + "&cnt=1";
    $.ajax({
        url: UVQueryURL,
        method:"GET"
    }).then(function(response){
        console.log(response);
        let UVIndex = document.createElement("span");
        UVIndex.setAttribute("class","badge badge-danger");
        UVIndex.innerHTML = response.data[0].value;
        currentUVI.innerHTML = "UV Index: ";
        currentUVI.append(UVIndex);
    })
    // 5 day forcast 
    var cityID = response.data.id;
    var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + APIKey;
    $.ajax({
        url: forecastQueryURL,
        method:"GET"
    }).then(function(response){
        console.log(response);
        const forcastCard = document.querySelectorAll(".forcast");
        for (var i=0; i<forcastCard.length; i++){
            forcastCard[i].innerHTML = "";
            var cardIndex = i*8 + 4;
            var cardDate = new Date(response.data.cityList[cardIndex].dt);
            var cardDay = cardDate.getDate();
            var cardMonth = cardDate.getMonth();
            var cardYear = cardDate.getFullYear();
            var cardForcastDate = document.createElement("p");
            cardForcastDate.setAttribute("class","mt-3 mb-0 forcast-date");
            cardForcastDate.innerHTML = cardMonth + "/" + cardDay + "/" + cardYear;
            forcastCard[i].append(cardForcastDate);



        }
    
    
    })

}


// search button
$("#searchBTn").on("click", function(){
    const searchCity = input.Value;
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

createCityList();


//


