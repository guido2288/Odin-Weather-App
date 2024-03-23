const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const weatherDisplay = document.querySelector(".weather");
const errorDisplay = document.querySelector(".error");

const apiKey = "0631fc592f4aeaee8923c9cba6f2e568";

const handleDisplayInfo = (data) => {

  const city = data.name;
  const temp = Math.round(data.main.temp);
  const humidity = data.main.humidity;
  const wind = Math.round(data.wind.speed);
  const icon = data.weather[0].main.toLowerCase();

  weatherDisplay.innerHTML = "";
  weatherDisplay.innerHTML = `
  <img src="images/${icon}.png" alt="weather" class="weather-icon">
  <h1 class="temp">${temp}°c</h1>
  <h2 class="city">${city}</h2>
  <div class="details">
      <div class="col">
          <img src="images/humidity.png" alt="humidity">
          <div>
              <p class="humidity">${humidity}%</p>
              <p>Humidity</p>
          </div>
      </div>
      <div class="col">
          <img src="images/wind.png" alt="wind">
          <div>
              <p class="wind">${wind} km/h</p>
              <p>Wind Speed</p>
          </div>
      </div>
  </div>
  `;
}

const handleSearch = async (e) => {
  e.preventDefault();
  const citySearch = searchInput.value;
  const response = await fetch( `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${citySearch}&appid=${apiKey}`);

  response.json().then( (data) => {
    if(data.cod == '404'){
      weatherDisplay.style.display = "none"
      errorDisplay.style.display = "block";
    } else {
      errorDisplay.style.display = "none";
      weatherDisplay.style.display = "block";
      handleDisplayInfo(data);
    }
  } )
}

searchBtn.addEventListener('click', handleSearch);