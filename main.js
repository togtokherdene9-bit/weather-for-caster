const searchBtn = document.getElementById("search-btn");
const inputField = document.getElementById("input");

searchBtn.addEventListener("click", getWeather);

inputField.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getWeather();
  }
});

async function getWeather() {
  const city = document.getElementById("input").value.trim();

  document.getElementById("error-message").textContent = "";

  if (!city) {
    document.getElementById("error-message").textContent =
      "Please enter a city name.";
    document.getElementById("weather-info").classList.remove("show");
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=ffc74c9e41d3cd99bf6bb25a7f582a7a`,
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    document.getElementById("error-message").textContent =
      "City not found. Please try again.";
    document.getElementById("weather-info").classList.remove("show");
  }
}

function displayWeather(data) {
  document.getElementById("weather-info").classList.add("show");

  document.getElementById("city-name").textContent =
    data.name + ", " + data.sys.country;
  document.getElementById("temperature").textContent =
    Math.round(data.main.temp) + "°C";
  document.getElementById("high-low").textContent =
    "H: " +
    Math.round(data.main.temp_max) +
    "°  L: " +
    Math.round(data.main.temp_min) +
    "°";
  document.getElementById("description").textContent =
    data.weather[0].description;
  document.getElementById("humidity").textContent = data.main.humidity + "%";
  document.getElementById("wind").textContent = data.wind.speed + " m/s";
  document.getElementById("feels-like").textContent =
    Math.round(data.main.feels_like) + "°C";

  const iconCode = data.weather[0].icon;
  document.getElementById("weather-icon").src =
    `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}
