const CITY_COORDS = {
  Campinas: { latitude: -22.9099, longitude: -47.0626 },
  Miami: { latitude: 25.7617, longitude: -80.1918 },
  Orlando: { latitude: 28.5383, longitude: -81.3792 },
  Lakeland: { latitude: 28.0395, longitude: -81.9498 },
  "Washington, DC": { latitude: 38.9072, longitude: -77.0369 },
  "New York City": { latitude: 40.7128, longitude: -74.006 },
  Anápolis: { latitude: -16.3281, longitude: -48.9534 },
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

export function getWeatherIcon(weatherCode) {
  if ([0, 1].includes(weatherCode)) return "sun";
  if ([2, 3].includes(weatherCode)) return "partly-cloudy";
  if ([45, 48].includes(weatherCode)) return "fog";
  if ([51, 53, 55].includes(weatherCode)) return "drizzle";
  if ([61, 63, 65, 80, 81, 82].includes(weatherCode)) return "rain";
  if ([71, 73, 75].includes(weatherCode)) return "snow";
  if ([95, 96, 99].includes(weatherCode)) return "storm";
  return "partly-cloudy";
}

export async function fetchWeatherByCityAndDate(city, date) {
  const coords = CITY_COORDS[city];

  if (!coords) {
    throw new Error(`Cidade não mapeada para clima: ${city}`);
  }

  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", coords.latitude);
  url.searchParams.set("longitude", coords.longitude);
  url.searchParams.set(
    "daily",
    "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max"
  );
  url.searchParams.set("timezone", "auto");
  url.searchParams.set("start_date", date);
  url.searchParams.set("end_date", date);

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error("Erro ao buscar clima.");
  }

  const data = await response.json();
  const daily = data?.daily;

  if (!daily || !daily.time || !daily.time.length) {
    return {
      city,
      temperature: "--°C",
      maxTemperature: "--°C",
      minTemperature: "--°C",
      condition: "Previsão indisponível para esta data",
      rainChance: "--%",
      icon: "cloud",
      weatherCode: null,
      date,
    };
  }

  const weatherCode = daily.weather_code?.[0] ?? null;
  const max = daily.temperature_2m_max?.[0] ?? null;
  const min = daily.temperature_2m_min?.[0] ?? null;
  const rainChance = daily.precipitation_probability_max?.[0] ?? null;

  const avgTemp =
    typeof max === "number" && typeof min === "number"
      ? Math.round((max + min) / 2)
      : null;

return {
  city,
  temperature: avgTemp !== null ? `${avgTemp}°C` : "--°C",
  condition:
    weatherCode !== null
      ? WEATHER_CODE_MAP[weatherCode] || "Clima indisponível"
      : "Previsão indisponível para esta data",
  rainChance:
    typeof rainChance === "number" ? `${Math.round(rainChance)}%` : "--%",
  icon: getWeatherIcon(weatherCode),
  weatherCode,
  maxTemperature: typeof max === "number" ? `${Math.round(max)}°C` : "--°C",
  minTemperature: typeof min === "number" ? `${Math.round(min)}°C` : "--°C",
  date,
};
}
