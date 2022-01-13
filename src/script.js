let now = new Date();

function formatDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];
  let minutes = ("0" + now.getMinutes()).slice(-2);
  let hours = now.getHours();

  return `${day} ${hours}.${minutes}`;
}

let date = document.querySelector("#date");
date.innerHTML = formatDate(now);

function showTemp(response) {
  let roundTemp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temperature");
  currentTemp.innerHTML = roundTemp;
  let city = document.querySelector("#searched-city");
  city.innerHTML = response.data.name;
  let weather = document.querySelector(".weather");
  weather.innerHTML = response.data.weather[0].main;
}

function searchCity(event) {
  event.preventDefault();
  let town = document.querySelector("#town");
  let unit = "metric";
  let apiKey = "1e7d31bd89d07944de888493f11e44b4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${town.value}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showTemp);
}

let searchButton = document.querySelector(".search");
searchButton.addEventListener("click", searchCity);

function currentCity(position) {
  let Lon = position.coords.longitude;
  let Lat = position.coords.latitude;
  let unit = "metric";
  let apiKey = "1e7d31bd89d07944de888493f11e44b4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${Lat}&lon=${Lon}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showTemp);
}

function getcurrentPosition() {
  //Dummy one, which will result in a working next statement.
  navigator.geolocation.getCurrentPosition(
    function () {},
    function () {},
    {}
  );
  //The working next statement.
  navigator.geolocation.getCurrentPosition(currentCity);
}

let currentButton = document.querySelector(".current");
currentButton.addEventListener("click", getCurrentPosition);

//function tempReplaceFahrenheit(event) {
//  let fahrenheit = document.querySelector("#current-temperature");
//  fahrenheit.innerHTML = "68";
//}

//let celciusReplace = document.querySelector("#fahrenheit");
//celciusReplace.addEventListener("click", tempReplaceFahrenheit);

//function tempReplaceCelcius(event) {
//  let celcius = document.querySelector("#current-temperature");
//  celcius.innerHTML = "20";
//}

//let FahrenheitReplace = document.querySelector("#celcius");
//FahrenheitReplace.addEventListener("click", tempReplaceCelcius);
