const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import cors package

const app = express();
const port = 3000;

const thresholdtemp = 25;

// Use cors middleware
app.use(cors());

// Function to fetch weather data from the API
async function getWeatherData(apiKey, latitude, longitude) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    throw error;
  }
}

// Function to fetch forecast data from the API
async function getForecastData(apiKey, latitude, longitude) {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=3`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching forecast data:", error.message);
    throw error;
  }
}

// Function to calculate reduction factor
function calculateReductionFactor(currentTemp, cloudCover, windSpeed, humidity) {
  const tempeffect = (currentTemp - thresholdtemp) * 0.5;
  const cloudeffect = 0.8 * cloudCover;
  const windeffect = 0.1 * windSpeed;
  const humidityeffect = 0.1 * humidity;

  return (tempeffect + cloudeffect + windeffect + humidityeffect) / 100;
}

// API endpoint to handle weather data requests
app.get('/:latitude/:longitude', async (req, res) => {
  const { latitude, longitude } = req.params;
  console.log(latitude,longitude,"Realtime");

  // Replace with your WeatherAPI key
  const apiKey = "3814ff7bcd3a46a2805133102232705"; // Replace with your actual API key

  try {
    const weatherData = await getWeatherData(apiKey, latitude, longitude);

    const currentTemp = weatherData.current.temp_c;
    const cloudCover = weatherData.current.cloud;
    const windSpeed = weatherData.current.wind_kph; // Assuming wind speed in kph
    const humidity = weatherData.current.humidity;
    const dayornot = weatherData.current.is_day;

    // Calculate reduction factor based on weather parameters
    const reductionFactor = calculateReductionFactor(currentTemp, cloudCover, windSpeed, humidity);

    // Calculate actual output considering reduction factor
    const actualOutput = 100 * reductionFactor; // Assuming 100 units at ideal conditions

    // Include original weather data, reduction factor, and actual output in the response
    const response = {
      weatherData,
      reductionFactor,
      actualOutput
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API endpoint to handle forecast data requests
app.get('/forecast/:latitude/:longitude', async (req, res) => {
  const { latitude, longitude } = req.params;
  console.log(latitude,longitude,"Done");

  // Replace with your WeatherAPI key
  const apiKey = "3814ff7bcd3a46a2805133102232705"; // Replace with your actual API key

  try {
    const forecastData = await getForecastData(apiKey, latitude, longitude);

    // Extract relevant forecast data for the next 3 days
    const forecastForNext3Days = forecastData.forecast.forecastday.slice(0, 3);

    // Organize forecast data by date
    const forecastByDate = {};
    forecastForNext3Days.forEach(day => {
      const date = day.date;
      let totalCloudCover = 0; // Initialize total cloud cover for the day
      const numHours = day.hour.length;

      // Sum up cloud cover for each hour of the day
      day.hour.forEach(hour => {
        totalCloudCover += hour.cloud;
      });

      // Calculate average cloud cover for the day
      const avgCloudCover = totalCloudCover / numHours;

      const tempC = day.day.avgtemp_c;
      const humidity = day.day.avghumidity;
      const windSpeed = day.day.maxwind_kph;

      // Calculate reduction factor for forecast data
      const reductionFactor = calculateReductionFactor(tempC, avgCloudCover, windSpeed, humidity);

      forecastByDate[date] = { tempC, humidity, windSpeed, cloudCover: avgCloudCover, reductionFactor };
    });

    res.json(forecastByDate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Weather API server is running at http://localhost:${port}`);
});
