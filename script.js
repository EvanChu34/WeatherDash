
function startPage(){
    const input = document.getElementById("city-input");
    const nameEl = document.getElementById("selected-city");
    const searchBtn = document.getElementById("searchBtn");
    const clearBtn = document.getElementById("clear-history");
    const currentPic = document.getElementById("current-pic");
    const currentTemp = document.getElementById("temperature");
    const currentHumid = document.getElementById("humidity");
    const currentWindS = document.getElementById("wind-speed");
    const currentUVI = document.getElementById("UV-index");
    const cityHistory = document.getElementById("city-list");
    let cityList = JSON.parse(localStorage.getItem("search") || []);
    console.log(cityList);
    
    var APIkey = "7deee8827dfbf279b7a9d2bd52377acb";

    function getWeatherInfo(cityName){
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName + "&appid=" + APIkey;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            var currentDate = new Date(response.data.dt*1000);
            console.log(currentDate);
            var day = currentDate.getDate();
            var month = currentDate.getMonth() + 1;
            var year = currentDate.getFullYear();
            nameEl.innerHTML = response.data.name + (month + "/" + day + "/" + year);
            var weatherIcon = response.data.weather[0].icon;
            currentPic.setAttribute("src","https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
            currentTemp.innerHTML = "Temperature: " + kelToFar(response.data.main.temp) 
            currentHumid.innerHTML = "Humidity: " + response.data.main.humidity + "%";
            currentWindS.innerHTML = "wind Speed: " + response.data.wind.speed + "MPH"; 
        // UV 
        let lat = response.data.coord.lat;
        let lon = response.data.coord.lon;
        let UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&cnt=1";
        $.ajax({
            url: UVQueryURL,
            method:"GET"
        }).then(function(response){
            let UVIndex = document.createElement("span");
            UVIndex.setAttribute("class","badge badge-danger");
            UVIndex.innerHTML = response.data[0].value;
            currentUVI.innerHTML = "UV Index: ";
            currentUVI.append(UVIndex);
        });
        // 5 day forcast 
        let cityID = response.data.id;
        let forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID +"&appid=" + APIKey;
        $.ajax({
            url: forecastQueryURL,
            method:"GET"
        }).then(function(response){
            console.log(response);
            const forcastCard = document.querySelectorAll(".forcast");
            for (i=0; i<forcastCard.length; i++){
                forcastCard[i].innerHTML = "";
                const cardIndex = i*8 + 4;
                const cardDate = new Date(response.data.cityList[cardIndex]);
                const cardDay = cardDate.getDate();
                const cardMonth = cardDate.getMonth();
                const cardYear = cardDate.getFullYear();s
                const cardForcastDate = document.createElement("p");
                cardForcastDate.setAttribute("class","mt-3 mb-0 forcast-date");
                cardForcastDate.innerHTML = cardMonth + "/" + cardDay + "/" + cardYear;
                forcastCard[i].append(cardForcastDate);
                const cardForcastWeather = document.createElement("img");
                cardForcastWeather.setAttribute("src","https://openweathermap.org/img/wn/" + response.data.list[cardIndex].weather[0].icon + "@2x.png");  
                forcastCard[i].append(cardForcastWeather);
                const cardTemp = document.createElement("p");
                cardTemp.innerHTML = "Temp: " + response.data.list[cardIndex].main.temp;
                forcastCard[i].append(cardTemp);
                const cardHumid = document.createElement("p");
                cardHumid.innerHTML = "Humidity: " + response.data.list[cardIndex].main.humidity + "%";
                forcastCard[i].append(cardHumid);
            }
        })});
    }

    // search button
    searchBtn.addEventListener("click", function(){
        const searchCity = input.Value;
        getWeatherInfo(searchCity);
        cityList.push(searchCity);
        localStorage.setItem("search",JSON.stringify(cityList));
        createCityList();
    })

    clearBtn.addEventListener("click", function() {
        cityList = [];
        createCityList();
    })

    // Search button history
    function createCityList(){
        cityHistory.innerHTML = "";
        for (var i=0; i<cityList.length; i++){
            const cityItem = document.createElement("input");
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
    
    function kelToFar(K){
        return Math.floor((K - 273.15) *1.8 +32);
    }

    createCityList();
    if (cityList.length > 0){
        getWeatherInfo(cityList[cityList.length - 1]);
    }

}


startPage();

