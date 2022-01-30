const api = WeatherApi();

const title = document.querySelector('.title');
const titleNoLocation = document.querySelector('.title-no-location');
const temp = document.querySelector('.temp');
const weatherDescription = document.querySelector('.weather-des');
let long;
let lat;

window.addEventListener('load', () => {
  if (navigator.getlocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const proxy = 'https://cors-anywhere.herokuapp.com/';
      apiUrl = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}`;
      getApi(apiUrl);
    });
  } else {
    HideDataWhenThereIsNoLocation();
  }
});

const HideDataWhenThereIsNoLocation = () => {
  title.classList.add('hidden');
  temp.classList.add('hidden');
  weatherDescription.classList.add('hidden');
};

const ShowData = () => {
  titleNoLocation.classList.add('hidden');
  title.classList.remove('hidden');
  temp.classList.remove('hidden');
  weatherDescription.classList.remove('hidden');
};

// Search Part Selectors
const searchBtn = document.querySelector('.search-btn');
const searchInput = document.querySelector('.search-input');
const body = document.querySelector('.body');

// Launch The Api To Get The Data And Show To User
const launchApi = () => {
  let city = document.querySelector('.search-input').value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`;
  getApi(apiUrl);
  ShowData();
  getBackground();
};
// Search Part Function
searchBtn.addEventListener('click', () => {
  launchApi();
});
// Enter Part Function
searchInput.addEventListener('keypress', (e) => {
  if (e.keyCode === 13) {
    launchApi();
  }
});

const getApi = async (apiUrl) => {
  await fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        worngCity(response.status);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      putDataInDom(data);
    });
};

const getBackground = () => {
  let city = document.querySelector('.search-input').value;
  document.body.style.backgroundImage =
    "url('https://source.unsplash.com/1600x900/?" + city + "')";
};

const errorBackgrond = (status) => {
  if (status === 404) {
    document.body.style.backgroundImage =
      "linear-gradient(to right,#00000030,#00000037),url('./img/wrong-city.jpg')";
  }
};

const worngCity = (status, cityName = '') => {
  errorBackgrond(status);
  const titleH1 = document.querySelector('.title h2');
  if (status === 404) {
    titleH1.textContent = 'City Not Found!';
    cityTitle.textContent = '';
    temp.classList.add('hidden');
    weatherDescription.classList.add('hidden');
  } else {
    temp.classList.remove('hidden');
    weatherDescription.classList.remove('hidden');
    titleH1.innerHTML = `Weather in <span class="city-title">${cityName}</span>`;
    // cityTitle.textContent = cityName;
  }
};

const tempValue = document.querySelector('.celsius-value');
const cityTitle = document.querySelector('.city-title');
const weatherDes = document.querySelector('.weather-des-text');
const humidityValue = document.querySelector('.humidity-value');
const windSpeedValue = document.querySelector('.windspeed-value');
const tempIcon = document.querySelector('.temp-icon');
const windDeg = document.querySelector('.wind-deg');
const pressure = document.querySelector('.pressure');
const timezone = document.querySelector('.timezone');
const fahrenheitValue = document.querySelector('.fahrenheit-value');

const putDataInDom = (data) => {
  tempIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  // City Title
  worngCity(200, data.name);
  // cityTitle.textContent = data.name;

  // Temp Celsius Calculate
  tempValue.textContent = Math.floor(data.main.temp - 273.15);

  // Temp Fahrenheit
  fahrenheitValue.textContent = Math.floor(
    ((data.main.temp - 273.15) * 9) / 5 + 32
  );

  // Weather Description
  weatherDes.textContent = data.weather[0].description;

  // Humidity Value
  humidityValue.textContent = data.main.humidity;

  // Wind Speed Value
  windSpeedValue.textContent = data.wind.speed;

  windDeg.textContent = data.wind.deg;
  pressure.textContent = data.main.pressure;
  timezone.textContent = data.timezone / 3600;
};
