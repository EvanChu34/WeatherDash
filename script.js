function startPage(){
    const input = document.getElementById("city-input");
    const searchBtn = document.getElementById("searchBtn");
    const clearBtn = document.getElementById("clear-history");
    const nameEl = document.getElementById("selected-city");
    const currentPic = document.getElementById("current-pic");
    const currentTemp = document.getElementById("temperature");
    const currentHumid = document.getElementById("humidity");
    const currentWindS = document.getElementById("wind-speed");
    const currentUVI = document.getElementById("UV-index");
    const cityHistory = document.getElementById("city-list");
    let cityList = JSON.parse(localStorage.getItem("search")) || [];
    var APIkey = "7deee8827dfbf279b7a9d2bd52377acb";

    searchBtn.addEventListener("click", function(){
        const searchCity = input.value;
        getWeatherInfo(searchCity);
        cityList.push(searchCity);
        localStorage.setItem("search",JSON.stringify(cityList));
        createCityList();
    })

    clearBtn.addEventListener("click", function() {
        cityList = [];
        createCityList();
    })

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

    function getWeatherInfo(cityName){
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName + "&appid=" + APIkey;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            var currentDate = new Date(response.dt*1000);
            console.log(currentDate);
            var day = currentDate.getDate();
            var month = currentDate.getMonth() + 1;
            var year = currentDate.getFullYear();
            nameEl.innerHTML = response.name + " (" + month + "/" + day + "/" + year +") " ;
            let weatherIcon = response.weather[0].icon;
            currentPic.setAttribute("src","https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
            currentPic.setAttribute("alt",response.weather[0].description);
            currentTemp.innerHTML = "Temperature: " + kelToFar(response.main.temp) + " &#176F"; 
            currentHumid.innerHTML = "Humidity: " + response.main.humidity + "%";
            currentWindS.innerHTML = "Wind Speed: " + response.wind.speed + "MPH"; 
       
        // UV 
        let lat = response.coord.lat;
        let lon = response.coord.lon;
        let UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=7deee8827dfbf279b7a9d2bd52377ac&cnt=1";
        $.ajax({
            url: UVQueryURL,
            method:"GET"
        }).then(function(response){
            let UVIndex = document.createElement("span");
            UVIndex.setAttribute("class","badge badge-danger");
            UVIndex.innerHTML = response.value;
            currentUVI.innerHTML = "UV Index: ";
            currentUVI.append(UVIndex);
        });
        // 5 day forcast 
        let cityID = response.id;
        let forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID +"&appid=7deee8827dfbf279b7a9d2bd52377ac";
        $.ajax({
            url: forecastQueryURL,
            method:"GET"
        }).then(function(response){
            console.log(response);
            const forcastCard = document.querySelectorAll(".forcast");
            for (i=0; i<forcastCard.length; i++){
                forcastCard[i].innerHTML = "";
                const cardIndex = i*8 + 4;
                const cardDate = new Date(response.cityList[cardIndex].dt*1000);
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
                cardTemp.innerHTML = "Temp: " + response.list[cardIndex].main.temp;
                forcastCard[i].append(cardTemp);
                const cardHumid = document.createElement("p");
                cardHumid.innerHTML = "Humidity: " + response.list[cardIndex].main.humidity + "%";
                forcastCard[i].append(cardHumid);
            }
        })});
    }
}

startPage();

