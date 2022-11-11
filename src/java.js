//change city
function changeCity(event) {
  event.preventDefault();
  //let chooseyourCity = document.querySelector("h2"); - remove because don't need, change goal
  let writeCity = document.querySelector("#exampleInputEmail1");
  //chooseyourCity.innerHTML = writeCity.value; - remove the same
  let fixCity = writeCity.value;

  cityPosition(fixCity);
}
function cityPosition(fixCity) {
  let apiKey = "c1d20ef03fedeaf4c6fca40d08bodtba";
  //  let ipIrl = `https://api.openweathermap.org/data/2.5/weather?q=${fixCity}&appid=${apiKey}&units=metric`;
  let ipIrl = `https://api.shecodes.io/weather/v1/current?query=${fixCity}&key=${apiKey}&units=metric`;

  axios.get(ipIrl).then(showTemperature);
}

let yourCity = document.querySelector("#research-form");
yourCity.addEventListener("submit", changeCity);

//inner day/time/date/month
let rightNow = new Date();
let nday = rightNow.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[nday];
let timeHours = rightNow.getHours();
if (timeHours < 10) {
  timeHours = `0${timeHours}`;
}
let timeMinutes = rightNow.getMinutes();
if (timeMinutes < 10) {
  timeMinutes = `0${timeMinutes}`;
}
let h4 = document.querySelector("h4");
h4.innerHTML = `${day}, ${timeHours}:${timeMinutes}`;

let date = rightNow.getDate();
let month = rightNow.getMonth();

let monthAll = [
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
let months = monthAll[month];
let today = document.querySelector(".data-today");
today.innerHTML = `${date} ${months}`;

//Change format
function ForamtDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function Foramtmonth(stamp) {
  let date = new Date(stamp * 1000);
  let Fdate = date.getDate();
  let Fmonth = date.getMonth();
  let FmonthAll = [01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12];

  return Fdate + "/" + FmonthAll[Fmonth];
}
function displayForecast(response) {
  let Fdays = response.data.daily;
  document.querySelector(".min_temperature").innerHTML = `${Math.round(
    Fdays[0].temperature.minimum
  )}°`;
  document.querySelector(".max_temperature").innerHTML = `${Math.round(
    Fdays[0].temperature.maximum
  )}°`;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;
  Fdays.forEach(function (Fday, index) {
    if (index < 5 && index > 0) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-3">
                    <div class="data_day">
                  ${ForamtDay(Fday.time)} <br />
                   ${Foramtmonth(Fday.time)}             
                </div>
                <div> <img src="${
                  Fday.condition.icon_url
                }"width="80px"alt=""class="forecast_icon"id="forecast_icon"/></div>                    
                    <div class="emoji">
                   ${Math.round(Fday.temperature.minimum)}&deg/${Math.round(
          Fday.temperature.maximum
        )}&deg
                    </div>
                    
                    </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinate) {
  let apiKey = "c1d20ef03fedeaf4c6fca40d08bodtba";
  let ipIrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinate.longitude}&lat=${coordinate.latitude}&key=${apiKey}&units=metric`;
  //let ipIrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinate.lat}&lon=${coordinate.lon}&appid=${apiKey}&units=metric`;
  axios.get(ipIrl).then(displayForecast);
}

//position location_week5

function showTemperature(response) {
  document.querySelector(".city_temp").innerHTML = Math.round(
    response.data.temperature.current
  );

  document.querySelector(".weather_description").innerHTML =
    response.data.condition.description;

  document.querySelector("h2").innerHTML = response.data.city;
  document.querySelector(".humidity").innerHTML = Math.round(
    response.data.temperature.humidity
  );
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", response.data.condition.icon_url);
  iconElement.setAttribute("alt", response.data.condition.description);
  let celsiusTemper = response.data.temperature.current;
  //change digree
  function temperatureCelsius(event) {
    event.preventDefault();
    let tempCelsi = document.querySelector(".city_temp");
    celsi.classList.add("active");
    fahren.classList.remove("active");
    tempCelsi.innerHTML = Math.round(celsiusTemper);
  }
  let celsi = document.querySelector("#celsius");
  celsi.addEventListener("click", temperatureCelsius);

  function ShowMyCity(event) {
    event.preventDefault();
    cityPosition("Mendip District");
  }

  let Mycity = document.querySelector("#myCity");
  Mycity.addEventListener("click", ShowMyCity);

  function temperatureFahrenheit(event) {
    event.preventDefault();
    let tempfahren = document.querySelector(".city_temp");
    celsi.classList.remove("active");
    fahren.classList.add("active");
    tempfahren.innerHTML = Math.round((celsiusTemper * 9) / 5 + 32);
  }
  let fahren = document.querySelector("#fahrenheit");
  fahren.addEventListener("click", temperatureFahrenheit);
  // console.log(          `http://openweathermap.org/img/wn/${respose.data.weather[0].icon}@2x.png`        );

  getForecast(response.data.coordinates);
}

function showPosition(position) {
  let apiKey = "c1d20ef03fedeaf4c6fca40d08bodtba";
  //  let ipIrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`;
  let ipIrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&units=metric`;
  console.log(ipIrl);
  axios.get(`${ipIrl}&key=${apiKey}`).then(showTemperature);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let celsiusTemper = null;

let yourLocation = document.querySelector(".current");
yourLocation.addEventListener("click", getCurrentLocation);

cityPosition("Dnipro");
//my link: https://tiny-pastelito-1beff2.netlify.app/
//my link forprogects:
