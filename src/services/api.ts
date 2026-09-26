/**
 * Centralized API service layer.
 *
 * Today every function resolves demo data. Later the same signatures can be
 * backed by a real backend (ESP8266 -> FastAPI -> this service) by swapping the
 * bodies for fetch() calls against API_BASE_URL. No secrets belong in this file.
 */

import {
  activeMissions,
  alerts,
  analyticsDaily,
  cropAssessment,
  cropZones,
  drones,
  fields,
  jobs,
  jobsByCategory,
  missionDurationSeries,
  operatorProfile,
  soilZones,
  storageItems,
  telemetrySeries,
  weatherHours,
  weatherNow,
} from "@/data/demo";

export const API_BASE_URL = import.meta.env["VITE_API_BASE_URL"] ?? "";
export const DEMO_MODE = !API_BASE_URL;

const delay = <T>(value: T, ms = 220): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

export const getDroneTelemetry = () => delay({ drones, series: telemetrySeries });
export const getDrones = () => delay(drones);
export const getJobs = () => delay(jobs);
export const getAIAnalysis = () => delay(cropAssessment, 900);
export const getCropZones = () => delay(cropZones);
export const getWeather = () => delay({ now: weatherNow, hours: weatherHours });
export const getMissions = () => delay(activeMissions);
export const getProfitability = () => delay(analyticsDaily);
export const getAnalytics = () => delay({ daily: analyticsDaily, byCategory: jobsByCategory, missionDurationSeries });
export const getSoilMoisture = () => delay(soilZones);
export const getStorage = () => delay(storageItems);
export const getAlerts = () => delay(alerts);
export const getFields = () => delay(fields);
export const getOperatorProfile = () => delay(operatorProfile);
