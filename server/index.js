const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Flood Rescue backend is running"
  });
});

app.get("/api/weather", async (req, res) => {
  const latitude = 31.62;
  const longitude = 74.29;
  const weatherUrl = new URL("https://api.open-meteo.com/v1/forecast");

  weatherUrl.searchParams.set("latitude", latitude);
  weatherUrl.searchParams.set("longitude", longitude);
  weatherUrl.searchParams.set(
    "current",
    "temperature_2m,precipitation,relative_humidity_2m,wind_speed_10m"
  );

  try {
    const response = await fetch(weatherUrl);

    if (!response.ok) {
      throw new Error(`Open-Meteo request failed with status ${response.status}`);
    }

    const data = await response.json();

    res.json({
      location: "Lahore/Shahdara",
      coordinates: {
        latitude,
        longitude
      },
      current: {
        temperature: data.current.temperature_2m,
        precipitation: data.current.precipitation,
        humidity: data.current.relative_humidity_2m,
        windSpeed: data.current.wind_speed_10m,
        units: data.current_units
      }
    });
  } catch (error) {
    console.error("Weather request error:", error.message);
    res.status(502).json({
      status: "error",
      message: "Unable to fetch weather data"
    });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});