const apiKey = "c423b5df2401ac31887fb839be545507";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();

    if (response.ok) {
      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + " m/s";

      if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "cloud.png";
      } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "clear.png";
      } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "rain.png";
      } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "drizzle.png";
      } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "mist.png";
      }

      document.querySelector(".weather").style.display = "block";
      document.querySelector(".error").style.display = "none";
    } else {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (evt) => {
  if (evt.key === "Enter") {
    checkWeather(searchBox.value);
  }
});