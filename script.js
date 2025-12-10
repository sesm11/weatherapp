const form = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");
const cityNameEl = document.getElementById("cityName");
const tempEl = document.getElementById("temperature");
const descEl = document.getElementById("description");
const iconEl = document.getElementById("weatherIcon");
const errorEl = document.getElementById("error");
iconEl.style.display = "none";

const apiKey = "bff2ebc6bb6e75baeb7ecdf2aaa60f80";

const icon = {
  Clouds: "icon/cloudy.png",
  Fog: "icon/fog.png",
  Rain: "icon/rain.png",
  Snow: "icon/snow.png",
  Clear: "icon/sunny.png",
  Thunderstorm: "icon/thunderstorm.png",
  Tornado: "icon/tornado.png",
  Drizzle: "icon/drizzle.png",
};

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const city = cityInput.value.trim();
  if (city === "") {
    errorEl.textContent = "Skriv in en stad!";
    return;
  }
  errorEl.textContent = "";
  iconEl.style.display = "none";
  getWeather(city);
});

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${apiKey}&units=metric&lang=sv`;

  const res = await fetch(url);
  const data = await res.json();
  console.log("API-svar: ", data);

  if (data.cod !== 200) {
    errorEl.textContent = "Kunde inte hitta staden";
    return;
  }
  errorEl.textContent = "";

  const weather = {
    main: data.weather[0].main,
    temp: data.main.temp,
    desc: data.weather[0].description,
  };
  updateUI(data);
}

function updateUI(data) {
  const weather = data.weather[0].main;
  console.log("weather main:", weather);

  cityNameEl.textContent = data.name;
  tempEl.textContent = Math.round(data.main.temp) + " °C ";
  descEl.textContent = data.weather[0].description;

  if (icon[weather]) {
    iconEl.src = icon[weather];
    iconEl.style.display = "block";
  } else {
    iconEl.style.display = "none";
  }
}
