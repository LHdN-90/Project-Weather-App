let now = new Date();

function formatTime(now) {
  let minutes = ("0" + now.getMinutes()).slice(-2);
  let hours = now.getHours();

  return `${hours}:${minutes}`;
}

function formatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let day = days[now.getDay()];
  let date = now.getDate();
  let month = months[now.getMonth()];
  let year = now.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#prediction");
  let forecastHTML = `<div class="weatherForecast" id="forecast">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
          <div class="row days">
          <div class="col-2 predDay">${formatDay(forecastDay.dt)}</div>
          <div class="col-5 predDescription">${
            forecastDay.weather[0].description
          }
          </div>
          <div class="col-4 predTemp"><span class="maxTemp">${Math.round(
            forecastDay.temp.max
          )}℃</span> | <span class="minTemp">${Math.round(
          forecastDay.temp.min
        )}℃</span></div>
          <div class="col-1 weatherIcon">
          <img src="https://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" id="weather-logo" alt="weather-icon" width="42"/></div>
          </div>   
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let unit = "metric";
  let apiKey = "b28d00494568539b5bc244d600d439db";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(displayForecast);
}

function showData(response) {
  let city = document.querySelector("h1");
  let refreshTime = document.querySelector(".currentTime");
  let date = document.querySelector(".currentDate");
  let currentTemp = document.querySelector("#current-temperature");
  let condition = document.querySelector("#condition");
  let humidity = document.querySelector("#humidity");
  let windspeed = document.querySelector("#windspeed");
  let weatherLogo = document.querySelector("#weather-icon");

  city.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  refreshTime.innerHTML = formatTime(now);
  date.innerHTML = formatDate(now);
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  condition.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  windspeed.innerHTML = Math.round(response.data.wind.speed * 3.6);
  weatherLogo.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherLogo.setAttribute("alt", response.data.weather[0].main);

  getForecast(response.data.coord);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  let unit = "metric";
  let apiKey = "1e7d31bd89d07944de888493f11e44b4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showData);
}

function currentCity(position) {
  let Lon = position.coords.longitude;
  let Lat = position.coords.latitude;
  let unit = "metric";
  let apiKey = "1e7d31bd89d07944de888493f11e44b4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${Lat}&lon=${Lon}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showData);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentCity);
}

let searchButton = document.querySelector(".search");
let currentButton = document.querySelector(".searchCurrent");

searchButton.addEventListener("click", search);
currentButton.addEventListener("click", getCurrentLocation);
