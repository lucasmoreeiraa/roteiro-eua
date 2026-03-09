const CITY_COORDS = {
  "Campinas-SP": { latitude: -22.9099, longitude: -47.0626 },
  "Miami Beach": { latitude: 25.7907, longitude: -80.13 },
  "Lakeland": { latitude: 28.0395, longitude: -81.9498 },
  "Orlando": { latitude: 28.5383, longitude: -81.3792 },
  "Washington": { latitude: 38.9072, longitude: -77.0369 },
  "New York City": { latitude: 40.7128, longitude: -74.006 },
  "Miami": { latitude: 25.7617, longitude: -80.1918 },
  "Anápolis-GO": { latitude: -16.3281, longitude: -48.9534 },
};

const WEATHER_CODE_MAP = {
  0: "Céu limpo",
  1: "Predominantemente limpo",
  2: "Parcialmente nublado",
  3: "Nublado",
  45: "Neblina",
  48: "Neblina com geada",
  51: "Garoa leve",
  53: "Garoa moderada",
  55: "Garoa forte",
  61: "Chuva leve",
  63: "Chuva moderada",
  65: "Chuva forte",
  71: "Neve leve",
  73: "Neve moderada",
  75: "Neve forte",
  80: "Pancadas leves",
  81: "Pancadas moderadas",
  82: "Pancadas fortes",
  95: "Trovoada",
  96: "Trovoada com granizo leve",
  99: "Trovoada com granizo forte",
};

export function getWeatherIcon(weatherCode, isDay = true) {
  if ([0, 1].includes(weatherCode)) return isDay ? "☀️" : "🌙";
  if ([2, 3].includes(weatherCode)) return "⛅";
  if ([45, 48].includes(weatherCode)) return "🌫️";
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(weatherCode)) return "🌧️";
  if ([71, 73, 75].includes(weatherCode)) return "❄️";
  if ([95, 96, 99].includes(weatherCode)) return "⛈️";
  return "🌤️";
}

export async function fetchWeather(city) {
  const coords = CITY_COORDS[city];

  if (!coords) {
    throw new Error(`Cidade não mapeada para clima: ${city}`);
  }

  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", coords.latitude);
  url.searchParams.set("longitude", coords.longitude);
  url.searchParams.set("current", "temperature_2m,weather_code,is_day");
  url.searchParams.set("daily", "precipitation_probability_max");
  url.searchParams.set("timezone", "auto");
  url.searchParams.set("forecast_days", "1");

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error("Erro ao buscar clima.");
  }

  const data = await response.json();

  const weatherCode = data?.current?.weather_code ?? 0;
  const isDay = Boolean(data?.current?.is_day);
  const temp = Math.round(data?.current?.temperature_2m ?? 0);
  const rainChance = Math.round(data?.daily?.precipitation_probability_max?.[0] ?? 0);

  return {
    city,
    temperature: `${temp}°C`,
    condition: WEATHER_CODE_MAP[weatherCode] || "Clima indisponível",
    rainChance: `${rainChance}%`,
    icon: getWeatherIcon(weatherCode, isDay),
    weatherCode,
    isDay,
  };
}