// const api = "ef64b9b4femshd32eabd0060cb2ep102b6bjsnbd31ac2bab9f";
const apiKey = "940c4f7e6bf43643efb91995851faa4d";

async function fetchWeatherData(city) {
  // const url = 'https://api.openweathermap.org/data/2.5/weather?q=kathmandu&appid=940c4f7e6bf43643efb91995851faa4d';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const options = {
    method: "GET",
  };
  
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Failed to fetch weather data.");
    }
    const result = await response.json();
    console.log(result);

    // Extract weather condition
    const weatherCondition = result.weather[0].main;
    const sunrise = result.sys.sunrise; 
    const sunset = result.sys.sunset; 
    const currentTime = Math.floor(Date.now() / 1000); 
    updateBackground(weatherCondition);

    // Determine if it's day or night
    const isDaytime = currentTime >= sunrise && currentTime < sunset;
    updateBackground(weatherCondition, isDaytime);

    const tempCelsius = (result.main.temp - 273.15).toFixed(2);
    const feels_likeCelsius = (result.main.feels_like - 273.15).toFixed(2);
    const toMinCelsius = (result.main.temp_min - 273.15).toFixed(2);
    const toMaxCelsius = (result.main.temp_max - 273.15).toFixed(2);
    const visibilityKm = (result.visibility / 1000).toFixed(2);
    const sunriseTime = new Date(result.sys.sunrise * 1000).toLocaleTimeString();
    const sunsetTime = new Date(result.sys.sunset * 1000).toLocaleTimeString();
    const {pressure, humidity, sea_level, grnd_level } = result.main;
    const windSpeed = (result.wind.speed * 3.6).toFixed(2); 
    const windDegree = result.wind.deg;

    // ASSUMING THESE ARE ELEMENTS IN YOUR HTML
    document.getElementById("temp").innerHTML = `${tempCelsius}°C`;
    document.getElementById("feels_like").innerHTML = `${feels_likeCelsius}°C`;
    document.getElementById("temp_min").innerHTML = `${toMinCelsius}°C`;
    document.getElementById("temp_max").innerHTML = `${toMaxCelsius}°C`;
    document.getElementById("pressure").innerHTML = `${pressure} hPa`;
    document.getElementById("humidity").innerHTML = `${humidity}%`;
    document.getElementById("sea_level").innerHTML = sea_level ? `${sea_level} hPa` : "N/A";
    document.getElementById("grnd_level").innerHTML = grnd_level ? `${grnd_level} hPa` : "N/A";
    document.getElementById("visibility").innerHTML = `${visibilityKm} km`;
    document.getElementById("wind_speed").innerHTML = `${windSpeed} km/h`;
    document.getElementById("wind_degree").innerHTML = `${windDegree}°`;
    document.getElementById("sunrise").innerHTML = sunriseTime;
    document.getElementById("sunset").innerHTML = sunsetTime;

    document.getElementById("cityName").innerHTML = city;
  } catch (error) {
    console.error(error);
  }
}


// // Add event listener to the search button
document.getElementById("search").addEventListener("click", (e) => {
  e.preventDefault(); 

  // Get the city value from the input field
  const city = document.getElementById("city").value.trim();

  // Fetch weather data for the entered city
  if (city) {
    fetchWeatherData(city);
  } else {
    alert("Please enter a city name.");
  }
});
fetchWeatherData("Kathmandu");



// // Function to update background based on weather condition
function updateBackground(condition, isDaytime) {
  const body = document.body;
  body.className = ""; // Reset all classes

  let timeOfDay = isDaytime ? "day" : "night";

  switch (condition.toLowerCase()) {
    case "clear":
      body.classList.add(`clear-${timeOfDay}`);
      break;
    case "clouds":
      body.classList.add(`clouds-${timeOfDay}`);
      break;
    case "rain":
      body.classList.add(`rain-${timeOfDay}`);
      break;
    case "snow":
      body.classList.add(`snow-${timeOfDay}`);
      break;
    case "thunderstorm":
      body.classList.add(`thunderstorm-${timeOfDay}`);
      break;
    case "drizzle":
      body.classList.add(`drizzle-${timeOfDay}`);
      break;
    case "mist":
    case "fog":
    case "haze":
      body.classList.add(`mist-${timeOfDay}`);
      break;
    default:
      body.classList.add(`default-${timeOfDay}`);
      break;
  }
}

// //DARK MODE
function toggleDarkMode() {
  const body = document.body;
  const navbar = document.querySelector('nav');
  const cards = document.querySelectorAll('.card');
  const table = document.querySelector('table');
  
  // Toggle dark mode for body, navbar, and cards
  body.classList.toggle('dark-mode');
  navbar.classList.toggle('bg-dark');
  
  // Toggle dark mode for all cards
  cards.forEach(card => {
    card.classList.toggle('bg-dark');
    card.classList.toggle('text-white');
  });
  table.classList.toggle('table-dark');
}
// Event listener for dark mode toggle button (replace with your button id)
document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);



// //MAP
// const map = L.map('map').setView([27.7172, 85.3240], 10); // Kathmandu as center
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

// Add marker for the city
function updateMap(lat, lon) {
  L.marker([lat, lon]).addTo(map).bindPopup('Weather Location').openPopup();
}

// In fetchWeatherData function, after fetching data:
// const lat = result.coord.lat;
// const lon = result.coord.lon;
// updateMap(lat, lon);



// for date and time
// Show Time and Date when button is clicked
document.getElementById('timeDateButton').addEventListener('click', function () {
  const now = new Date();
  const time = now.toLocaleTimeString();
  const date = now.toDateString();

  const display = document.getElementById('timeDateDisplay');
  display.innerHTML = `Time: ${time} <br> Date: ${date}`;
  display.style.display = 'block';
});
