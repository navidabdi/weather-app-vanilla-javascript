const api = "b9a48dc3bbc34a4cd28fa1fa4279e387";
let long;
let lat;
window.addEventListener("load",()=>{
    if(navigator.getlocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";
            apiUrl = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}`;

            getApi(apiUrl);
   
        });
    } else {
        // tellSearch();
    }
    
});
function tellSearch(){
    const title = document.querySelector(".title");
    const temp = document.querySelector(".temp");
    const weatherDescription = document.querySelector(".weather-des");
    title.classList.add("hidden");
    temp.classList.add("hidden");
    weatherDescription.classList.add("hidden");
}

// Search Part Selectors
const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector(".search-input");
const body = document.querySelector(".body");

// Search Part Functions
searchBtn.addEventListener("click",()=>{
    let city = document.querySelector(".search-input").value;
    
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`;
    getApi(apiUrl);
    getBackground();
});

async function getApi(apiUrl){
    await fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        return response.json();
    })
    .then(data =>{
        putDataInDom(data);
    });
}

function getBackground(){
    let city = document.querySelector(".search-input").value;
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + city + "')";
}

function getIcon(){

    iconLink = "";
}

const tempValue = document.querySelector(".celsius-value");
const cityTitle = document.querySelector(".city-title");
const weatherDes = document.querySelector(".weather-des-text");
const humidityValue = document.querySelector(".humidity-value");
const windSpeedValue = document.querySelector(".windspeed-value");
const tempIcon = document.querySelector(".temp-icon");
const windDeg = document.querySelector(".wind-deg");
const pressure = document.querySelector(".pressure");
const timezone = document.querySelector(".timezone");
const fahrenheitValue = document.querySelector(".fahrenheit-value");

function putDataInDom(data){

        tempIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

         // City Title
         cityTitle.textContent = data.name;

        // Temp Celsius Calculate
        tempValue.textContent = Math.floor(data.main.temp - 273.15);

        // Temp Fahrenheit
        fahrenheitValue.textContent = Math.floor((data.main.temp - 273.15) * 9/5 + 32);

        // Weather Description
        weatherDes.textContent = data.weather[0].description;

        // Humidity Value
        humidityValue.textContent = data.main.humidity;

        // Wind Speed Value
        windSpeedValue.textContent = data.wind.speed;


       windDeg.textContent = data.wind.deg;
       pressure.textContent = data.main.pressure;
       timezone.textContent = data.timezone / 3600;

}