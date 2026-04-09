import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fetchWeatherByCityAndDate } from "./weather";
import {
  Plane,
  Car,
  Hotel,
  Ticket,
  CalendarDays,
  Sun,
  Cloud,
  CloudSun,
  CloudRain,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  Snowflake,
  MapPin,
  Copy,
  Navigation,
} from "lucide-react";
import "./App.css";
import { itinerary } from "./data/itinerary";
import { heroDetails } from "./data/heroDetails";
import { weatherByDay } from "./data/weatherByDay";
import { dayMap, dayMoodByDay } from "./data/dayMap";
import { historicalWeatherByCity } from "./data/historicalWeather";
import {
  createGoogleMapsSearchLink,
  createUberLink,
  copyText,
} from "./utils/deepLinks";
import { getCurrentTimelineIndex } from "./utils/timeHelpers";
import {
  getStoredJSON,
  getStoredValue,
  setStoredJSON,
  setStoredValue,
} from "./utils/storage";

const STORAGE_KEYS = {
  activeDay: "roteiro-eua-active-day",
  activeHeroTab: "roteiro-eua-active-hero-tab",
  weatherCache: "roteiro-eua-weather-cache",
};

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: "easeOut" },
  },
};

const cardMotion = {
  hidden: { opacity: 0, y: 10, scale: 0.985 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.26,
      delay: Math.min(index * 0.035, 0.24),
      ease: "easeOut",
    },
  }),
};

export default function App() {
  const [activeDay, setActiveDay] = useState(
    () => Number(getStoredValue(STORAGE_KEYS.activeDay, 15)) || 15
  );
  const [activeHeroTab, setActiveHeroTab] = useState(() =>
    getStoredValue(STORAGE_KEYS.activeHeroTab, null)
  );
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState("");
  const [weatherMode, setWeatherMode] = useState("live");
  const [copiedLocation, setCopiedLocation] = useState("");
  const daysRowRef = React.useRef(null);

  const currentWeather = weatherByDay[activeDay] || {
    city: "Campinas",
    date: "2026-04-14",
  };

  const currentWeatherCity = currentWeather.city;
  const currentWeatherDate = currentWeather.date;
  const currentDay = dayMap[activeDay] || dayMap[14];
  const currentTimeline = useMemo(() => itinerary[activeDay] || [], [activeDay]);
  const activeHeroDetails = heroDetails[activeHeroTab] || [];
  const mood = dayMoodByDay[activeDay] || {
    intensity: 3,
    emoji: "🎯",
    label: "Ritmo equilibrado",
  };

  const dayList = Array.from({ length: 16 }, (_, i) => i + 14);
  const currentDateLabel = `${activeDay} de Abril`;
  const heroLocationLabel = `${currentWeatherCity}, ${currentDateLabel}`;

  const { currentTimelineIndex, currentBadgeLabel } = useMemo(() => {
    const liveIndex = getCurrentTimelineIndex(activeDay, currentTimeline);

    if (liveIndex >= 0) {
      return { currentTimelineIndex: liveIndex, currentBadgeLabel: "Agora" };
    }

    return { currentTimelineIndex: 0, currentBadgeLabel: "" };
  }, [activeDay, currentTimeline]);

  useEffect(() => {
    setStoredValue(STORAGE_KEYS.activeDay, String(activeDay));
  }, [activeDay]);

  useEffect(() => {
    if (activeHeroTab) {
      setStoredValue(STORAGE_KEYS.activeHeroTab, activeHeroTab);
    } else if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEYS.activeHeroTab);
    }
  }, [activeHeroTab]);

  useEffect(() => {
    let isMounted = true;
    const weatherCache = getStoredJSON(STORAGE_KEYS.weatherCache, {});
    const cachedEntry = weatherCache[currentWeatherDate];
    const historicalWeather = historicalWeatherByCity[currentWeatherCity] || null;

    if (cachedEntry?.data && isMounted) {
      setWeather(cachedEntry.data);
      setWeatherMode(cachedEntry.mode || "cached");
    }

    async function loadWeather() {
      try {
        setWeatherLoading(true);
        setWeatherError("");

        const data = await fetchWeatherByCityAndDate(
          currentWeatherCity,
          currentWeatherDate
        );

        if (!isMounted) return;

        setWeather(data);
        setWeatherMode("live");
        setStoredJSON(STORAGE_KEYS.weatherCache, {
          ...weatherCache,
          [currentWeatherDate]: {
            data,
            mode: "live",
            savedAt: new Date().toISOString(),
          },
        });
      } catch {
        if (!isMounted) return;

        if (cachedEntry?.data) {
          setWeather(cachedEntry.data);
          setWeatherMode("cached");
          setWeatherError("");
          return;
        }

        if (historicalWeather) {
          setWeather({
            city: currentWeatherCity,
            temperature: historicalWeather.temperature,
            maxTemperature: historicalWeather.maxTemperature,
            minTemperature: historicalWeather.minTemperature || "--°C",
            rainChance: historicalWeather.rainChance,
            condition: historicalWeather.condition,
            icon: historicalWeather.icon,
          });
          setWeatherMode("historical");
          setWeatherError("");
          return;
        }

        setWeatherError("Não foi possível atualizar o clima.");
        setWeatherMode("unavailable");
      } finally {
        if (isMounted) {
          setWeatherLoading(false);
        }
      }
    }

    loadWeather();
    const interval = setInterval(loadWeather, 15 * 60 * 1000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [currentWeatherCity, currentWeatherDate]);

  useEffect(() => {
    if (!copiedLocation) return undefined;
    const timeout = setTimeout(() => setCopiedLocation(""), 1800);
    return () => clearTimeout(timeout);
  }, [copiedLocation]);

  useEffect(() => {
    const row = daysRowRef.current;
    if (!row) return;

    const activePill = row.querySelector(".hero-day-pill.is-active");
    if (!activePill) return;

    activePill.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeDay]);

  const heroTabs = [
    {
      key: "flights",
      title: "Voos",
      value: "Trechos, horários e conexões",
      icon: <Plane size={24} strokeWidth={2.1} />,
    },
    {
      key: "car",
      title: "Carros",
      value: "BMW X7 em operação",
      icon: <Car size={24} strokeWidth={2.1} />,
    },
    {
      key: "hotel",
      title: "Hotéis",
      value: "Casa Boutique Hotel",
      icon: <Hotel size={24} strokeWidth={2.1} />,
    },
    {
      key: "tickets",
      title: "Ingressos",
      value: "Parques garantidos",
      icon: <Ticket size={24} strokeWidth={2.1} />,
    },
  ];

  const buildMetaItems = (item) => {
    const metaItems = [
      item.transport
        ? {
            label: "Transporte",
            text: item.transport,
            tone: "operational",
          }
        : null,
      item.location
        ? {
            label: "Local",
            text: item.location,
            tone: "operational",
            isLocation: true,
          }
        : null,
      item.restaurant
        ? {
            label: "Restaurante",
            text: item.restaurant,
            tone: "operational",
          }
        : null,
      item.lounge
        ? {
            label: "Sala VIP",
            text: item.lounge,
            tone: "operational",
          }
        : null,
      item.practicalPlan
        ? {
            label: "Plano prático",
            text: item.practicalPlan,
            tone: "context",
          }
        : null,
      item.photoSpot
        ? {
            label: "Foto spot",
            text: item.photoSpot,
            tone: "context",
          }
        : null,
    ];

    return metaItems.filter(Boolean);
  };

  const renderWeatherIcon = (iconCode) => {
    const normalized = String(iconCode || "").toLowerCase().trim();

    const iconMap = {
      sun: <Sun size={38} strokeWidth={2.2} />,
      clear: <Sun size={38} strokeWidth={2.2} />,
      sunny: <Sun size={38} strokeWidth={2.2} />,
      cloud: <Cloud size={38} strokeWidth={2.2} />,
      cloudy: <Cloud size={38} strokeWidth={2.2} />,
      overcast: <Cloud size={38} strokeWidth={2.2} />,
      "partly-cloudy": <CloudSun size={38} strokeWidth={2.2} />,
      partly_cloudy: <CloudSun size={38} strokeWidth={2.2} />,
      "partly cloudy": <CloudSun size={38} strokeWidth={2.2} />,
      "mostly-sunny": <CloudSun size={38} strokeWidth={2.2} />,
      "mostly sunny": <CloudSun size={38} strokeWidth={2.2} />,
      rain: <CloudRain size={38} strokeWidth={2.2} />,
      rainy: <CloudRain size={38} strokeWidth={2.2} />,
      shower: <CloudRain size={38} strokeWidth={2.2} />,
      showers: <CloudRain size={38} strokeWidth={2.2} />,
      drizzle: <CloudDrizzle size={38} strokeWidth={2.2} />,
      storm: <CloudLightning size={38} strokeWidth={2.2} />,
      thunder: <CloudLightning size={38} strokeWidth={2.2} />,
      thunderstorm: <CloudLightning size={38} strokeWidth={2.2} />,
      fog: <CloudFog size={38} strokeWidth={2.2} />,
      mist: <CloudFog size={38} strokeWidth={2.2} />,
      snow: <Snowflake size={38} strokeWidth={2.2} />,
    };

    return iconMap[normalized] || <CloudSun size={38} strokeWidth={2.2} />;
  };

const weatherDisplay = {
  city: weather?.city || currentWeatherCity,
  temp: weatherLoading && !weather ? "--°C" : weather?.temperature || "--°C",
  condition: weatherError || weather?.condition || "Clima indisponível",
  rainChance: weather?.rainChance || "--%",
  maxTemperature: weather?.maxTemperature || "--°C",
  minTemperature: weather?.minTemperature || "--°C",
  icon: renderWeatherIcon(weather?.icon),
  note:
    weatherMode === "historical"
      ? "Média histórica de abril"
      : weatherMode === "cached"
      ? "Última atualização salva"
      : weatherMode === "live"
      ? "Atualização em tempo real"
      : "Sem dados meteorológicos",
};

  async function handleCopyLocation(location) {
    const success = await copyText(location);
    if (success) setCopiedLocation(location);
  }

  return (
    <div className="app-shell">
      <motion.section
        className="hero hero--scene panel"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="hero-kicker">
              <CalendarDays size={15} strokeWidth={2.2} />
              <span>Viagem Abril, 2026</span>
            </div>

            <h1 className="hero-title">Viagem dos Sonhos</h1>
            <p className="hero-passengers">
              Tripulantes: Lucas e Amanda - Matheus e Rafa
            </p>

            <div
              className="hero-mood-chip"
              aria-label={`Intensidade do dia ${mood.intensity} de 5`}
            >
              <span className="hero-mood-emoji">{mood.emoji}</span>
              <span className="hero-mood-text">{mood.label}</span>
              <span className="hero-mood-scale">Intensidade {mood.intensity}/5</span>
            </div>
          </div>

          <div className="hero-days-row-wrap hero-days-row-wrap--fade">
            <div className="hero-days-row" ref={daysRowRef}>
              {dayList.map((day) => (
                <button
                  key={day}
                  type="button"
                  className={`hero-day-pill ${activeDay === day ? "is-active" : ""}`}
                  onClick={() => setActiveDay(day)}
                >
                  <span className="hero-day-pill-prefix">Dia</span>
                  <span className="hero-day-pill-number">{day}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <main className="content-shell">
        <AnimatePresence mode="wait">
          <motion.section
            key={`summary-${activeDay}`}
            className="panel summary-panel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.28, ease: "easeOut" } }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.18 } }}
          >
            <div className="summary-header summary-header--with-mood">
              <div>
                <p className="mini-label">Roteiro do dia</p>
                <h2 className="summary-title">{currentDay.title}</h2>
                <p className="summary-subtitle">{currentDay.subtitle}</p>
              </div>

              <div className="summary-intensity-box">
                <p className="mini-label">Mood do dia</p>
                <div className="summary-intensity-value">
                  {mood.emoji} {mood.label}
                </div>
              </div>
            </div>

            <div className="summary-top-grid">
              <motion.div
                className="summary-weather-card summary-weather-card--scene"
                initial={{ opacity: 0, y: 12, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } }}
              >
                <div className="summary-weather-top">
                  <div className="summary-weather-icon">
                    {weatherLoading && !weather ? "…" : weatherDisplay.icon}
                  </div>

                  <div className="summary-weather-copy">
                    <p className="summary-weather-condition">{weatherDisplay.condition}</p>
                    <div className="summary-weather-temp">{weatherDisplay.temp}</div>
                    <div className="summary-weather-city">{heroLocationLabel}</div>
                  </div>
                </div>

                <div className="summary-weather-meta">
  <span>Máx. {weatherDisplay.maxTemperature}</span>
  <span>Mín. {weatherDisplay.minTemperature}</span>
  <span>Chuva {weatherDisplay.rainChance}</span>
  <span>{weatherDisplay.note}</span>
</div>
              </motion.div>

              <div className="quick-card-grid quick-card-grid--scene">
                {heroTabs.map((tab, index) => (
                  <motion.button
                    key={tab.key}
                    type="button"
                    className={`quick-info-card quick-info-card--${tab.key} ${
                      activeHeroTab === tab.key ? "is-active" : ""
                    }`}
                    onClick={() =>
                      setActiveHeroTab((prev) => (prev === tab.key ? null : tab.key))
                    }
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={cardMotion}
                  >
                    <div className="quick-info-card-overlay" />
                    <div className="quick-info-icon">{tab.icon}</div>
                    <div className="quick-info-copy">
                      <p className="quick-info-title">{tab.title}</p>
                      <p className="quick-info-value">{tab.value}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            <AnimatePresence initial={false}>
              {activeHeroTab && (
                <motion.div
                  className="detail-drawer detail-drawer--scene"
                  initial={{ opacity: 0, y: 8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -6, height: 0 }}
                  transition={{ duration: 0.24, ease: "easeOut" }}
                >
                  <div className="detail-drawer-grid">
                    {activeHeroDetails.map((detail, index) => (
                      <motion.div
                        key={`${detail.label}-${detail.title}`}
                        className="detail-drawer-card"
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        variants={cardMotion}
                      >
                        <p className="mini-label">{detail.label}</p>
                        <h3 className="detail-drawer-title">{detail.title}</h3>
                        <p className="detail-drawer-text">{detail.text}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="summary-highlight-section">
              <p className="mini-label">Destaques</p>
              <div className="summary-highlight-grid">
                {currentDay.highlights.map((highlight, index) => (
                  <motion.div
                    key={highlight}
                    className="summary-highlight-item"
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={cardMotion}
                  >
                    {highlight}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="attention-card">
              <div className="attention-card-header">
                <p className="mini-label">Atenção do dia</p>
                <span className="attention-badge">Operacional</span>
              </div>

              <div className="attention-grid">
                <motion.div
                  className="attention-item attention-item-risk"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.22, delay: 0.03 } }}
                >
                  <p className="attention-label">Risco</p>
                  <p className="attention-text">{currentDay.attention.risk}</p>
                </motion.div>

                <motion.div
                  className="attention-item attention-item-priority"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.22, delay: 0.06 } }}
                >
                  <p className="attention-label">Prioridade</p>
                  <p className="attention-text">{currentDay.attention.priority}</p>
                </motion.div>

                <motion.div
                  className="attention-item attention-item-critical"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.22, delay: 0.09 } }}
                >
                  <p className="attention-label">Não pode atrasar</p>
                  <p className="attention-text">{currentDay.attention.critical}</p>
                </motion.div>

                <motion.div
                  className="attention-item attention-item-flex"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.22, delay: 0.12 } }}
                >
                  <p className="attention-label">Flexível</p>
                  <p className="attention-text">{currentDay.attention.flexible}</p>
                </motion.div>
              </div>
            </div>
          </motion.section>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.section
            key={`timeline-${activeDay}`}
            className="timeline-section"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.28, ease: "easeOut" } }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.18 } }}
          >
            {currentTimeline.map((item, index) => {
              const metaItems = buildMetaItems(item);
              const isCurrent = index === currentTimelineIndex;

              return (
                <motion.article
                  key={`${item.time}-${item.title}`}
                  className={`timeline-card ${isCurrent ? "is-current" : ""}`}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={cardMotion}
                  layout
                >
                  <div className="timeline-header-block">
                    <div className="timeline-time-wrap">
                      <div className="timeline-time">{item.time}</div>
                      {isCurrent && currentBadgeLabel && (
                        <span className="timeline-now-badge">{currentBadgeLabel}</span>
                      )}
                    </div>

                    <div className="timeline-copy">
                      <h3 className="timeline-title">{item.title}</h3>
                      <p className="timeline-description">{item.description}</p>
                    </div>
                  </div>

                  <div className="timeline-intelligence-block timeline-intelligence-block--hero">
                    {item.strategy ? (
                      <motion.div
                        className="intelligence-card intelligence-card--strategy"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0, transition: { duration: 0.22, delay: 0.03 } }}
                      >
                        <p className="mini-label white-label">Estratégia</p>
                        <p className="card-text strong-light">{item.strategy}</p>
                      </motion.div>
                    ) : null}

                    {item.pitfalls ? (
                      <motion.div
                        className="intelligence-card intelligence-card--alert"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0, transition: { duration: 0.22, delay: 0.06 } }}
                      >
                        <p className="mini-label white-label">Pegadinhas para evitar</p>
                        <p className="card-text strong-light">{item.pitfalls}</p>
                      </motion.div>
                    ) : null}

                    {item.hack ? (
                      <motion.div
                        className="intelligence-card intelligence-card--hack"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0, transition: { duration: 0.22, delay: 0.09 } }}
                      >
                        <p className="mini-label white-label">Hack premium</p>
                        <p className="card-text strong-light">{item.hack}</p>
                      </motion.div>
                    ) : null}
                  </div>

                  {!!metaItems.length && (
                    <div className="timeline-meta-grid">
                      {metaItems.map((meta) => (
                        <div
                          key={`${item.title}-${meta.label}`}
                          className={`meta-box meta-box--${meta.tone}`}
                        >
                          <p className="mini-label">{meta.label}</p>
                          <p className="summary-text">{meta.text}</p>

                          {meta.isLocation ? (
                            <div className="location-actions">
                              <a
                                className="location-action-btn"
                                href={createGoogleMapsSearchLink(meta.text)}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <MapPin size={14} strokeWidth={2.1} /> Maps
                              </a>

                              <a
                                className="location-action-btn"
                                href={createUberLink(meta.text)}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <Navigation size={14} strokeWidth={2.1} /> Uber
                              </a>

                              <button
                                type="button"
                                className="location-action-btn"
                                onClick={() => handleCopyLocation(meta.text)}
                              >
                                <Copy size={14} strokeWidth={2.1} />
                                {copiedLocation === meta.text ? "Copiado" : "Copiar"}
                              </button>
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  )}

                  {item.tips && item.tips.length > 0 && (
                    <div className="tips-box large-tips-box">
                      <p className="mini-label">Dicas e curiosidades</p>
                      <ul className="tips-list">
                        {item.tips.map((tip) => (
                          <li key={tip}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.article>
              );
            })}
          </motion.section>
        </AnimatePresence>
      </main>
    </div>
  );
}
