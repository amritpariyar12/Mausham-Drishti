// const api = "ef64b9b4femshd32eabd0060cb2ep102b6bjsnbd31ac2bab9f";
const apiKey = "940c4f7e6bf43643efb91995851faa4d";

async function fetchWeatherData(city) {
  // const url = 'https://api.openweathermap.org/data/2.5/weather?q=Kathmandu&appid=940c4f7e6bf43643efb91995851faa4d';
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
    updateBackground(weatherCondition);

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


// Add event listener to the search button
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




// Function to update background based on weather condition
function updateBackground(condition) {
  const body = document.body;
  body.classList.remove('clear', 'clouds', 'rain', 'snow', 'thunderstorm', 'drizzle', 'mist', 'default');

  switch (condition.toLowerCase()) {
    case 'clear':
      body.classList.add('clear');
      break;
    case 'clouds':
      body.classList.add('clouds');
      break;
    case 'rain':
      body.classList.add('rain');
      break;
    case 'snow':
      body.classList.add('snow');
      break;
    case 'thunderstorm':
      body.classList.add('thunderstorm');
      break;
    case 'drizzle':
      body.classList.add('drizzle');
      break;
    case 'mist':
    case 'fog':
    case 'haze':
      body.classList.add('mist');
      break;
    default:
      body.classList.add('default');
      break;
  }
}

// Call the async function
fetchWeatherData();
