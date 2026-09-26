/**
 * Centralized demo data for the AgriDrone AI Hub prototype.
 * All values are illustrative demo data, not real sensor readings.
 */

export type DroneStatus = "READY" | "IN MISSION" | "ATTENTION REQUIRED" | "MAINTENANCE RECOMMENDED" | "UNAVAILABLE";

export interface Drone {
  id: string;
  model: string;
  battery: number;
  batteryHealth: number;
  temperature: number;
  vibration: number;
  flightTimeMin: number;
  flightHours: number;
  missions: number;
  chargeCycles: number;
  status: DroneStatus;
  connection: "ONLINE" | "OFFLINE";
  maintenance: string;
  location: { x: number; y: number };
}

export const drones: Drone[] = [
  {
    id: "DRONE-01",
    model: "AgriWing X2",
    battery: 82,
    batteryHealth: 94,
    temperature: 31.2,
    vibration: 0.35,
    flightTimeMin: 16,
    flightHours: 142,
    missions: 88,
    chargeCycles: 212,
    status: "READY",
    connection: "ONLINE",
    maintenance: "No immediate action",
    location: { x: 28, y: 44 },
  },
  {
    id: "DRONE-02",
    model: "AgriWing X2",
    battery: 46,
    batteryHealth: 81,
    temperature: 38.6,
    vibration: 0.62,
    flightTimeMin: 8,
    flightHours: 264,
    missions: 151,
    chargeCycles: 388,
    status: "ATTENTION REQUIRED",
    connection: "ONLINE",
    maintenance: "Propeller inspection recommended",
    location: { x: 62, y: 30 },
  },
  {
    id: "DRONE-03",
    model: "AgriSpray S1",
    battery: 91,
    batteryHealth: 88,
    temperature: 29.4,
    vibration: 0.41,
    flightTimeMin: 19,
    flightHours: 198,
    missions: 117,
    chargeCycles: 301,
    status: "IN MISSION",
    connection: "ONLINE",
    maintenance: "Battery service in 14 days",
    location: { x: 74, y: 66 },
  },
];

export interface Job {
  id: string;
  title: string;
  category: "Agriculture" | "Commercial";
  type: string;
  customer: string;
  location: string;
  areaAcres: number;
  distanceKm: number;
  durationMin: number;
  weather: "Suitable" | "Caution" | "Not recommended";
  requiredDrone: string;
  batteryRequirement: "Low" | "Medium" | "High";
  revenue: number;
  cost: number;
  priority: "High" | "Medium" | "Low";
  match: number;
  reasons: string[];
  position: { x: number; y: number };
  state: "Available" | "Active" | "Completed";
}

const mk = (j: Omit<Job, "id"> & { id: string }): Job => j;

export const jobs: Job[] = [
  mk({
    id: "JOB-1042",
    title: "Tomato Crop Monitoring",
    category: "Agriculture",
    type: "Crop monitoring",
    customer: "Patil Farms",
    location: "Baramati, MH",
    areaAcres: 8.4,
    distanceKm: 5.2,
    durationMin: 24,
    weather: "Suitable",
    requiredDrone: "AgriWing X2",
    batteryRequirement: "Medium",
    revenue: 3360,
    cost: 1100,
    priority: "High",
    match: 94,
    reasons: ["Nearby", "Battery sufficient", "Suitable weather", "High estimated profit", "Low travel distance"],
    position: { x: 32, y: 48 },
    state: "Available",
  }),
  mk({
    id: "JOB-1043",
    title: "Sugarcane Crop Spraying",
    category: "Agriculture",
    type: "Crop spraying",
    customer: "Green Valley Agro",
    location: "Indapur, MH",
    areaAcres: 12.1,
    distanceKm: 11.8,
    durationMin: 42,
    weather: "Caution",
    requiredDrone: "AgriSpray S1",
    batteryRequirement: "High",
    revenue: 6050,
    cost: 2480,
    priority: "High",
    match: 78,
    reasons: ["High revenue", "Spray drone available", "Wind rising later today"],
    position: { x: 58, y: 24 },
    state: "Available",
  }),
  mk({
    id: "JOB-1044",
    title: "Wheat Crop Health Mapping",
    category: "Agriculture",
    type: "Crop health mapping",
    customer: "Shinde Agri Co-op",
    location: "Phaltan, MH",
    areaAcres: 16.5,
    distanceKm: 7.4,
    durationMin: 35,
    weather: "Suitable",
    requiredDrone: "AgriWing X2",
    batteryRequirement: "Medium",
    revenue: 5280,
    cost: 1720,
    priority: "Medium",
    match: 88,
    reasons: ["Good acreage-to-cost ratio", "Battery sufficient", "Suitable weather"],
    position: { x: 44, y: 68 },
    state: "Available",
  }),
  mk({
    id: "JOB-1045",
    title: "Irrigation / Water-Stress Inspection",
    category: "Agriculture",
    type: "Water-stress inspection",
    customer: "Kale Farms",
    location: "Daund, MH",
    areaAcres: 6.2,
    distanceKm: 3.9,
    durationMin: 18,
    weather: "Suitable",
    requiredDrone: "AgriWing X2",
    batteryRequirement: "Low",
    revenue: 2480,
    cost: 780,
    priority: "Medium",
    match: 91,
    reasons: ["Very close", "Short mission", "Low battery demand"],
    position: { x: 22, y: 36 },
    state: "Available",
  }),
  mk({
    id: "JOB-1046",
    title: "Crop Damage Assessment (Hail)",
    category: "Agriculture",
    type: "Crop damage assessment",
    customer: "AgriSure Insurance",
    location: "Karad, MH",
    areaAcres: 22.0,
    distanceKm: 24.6,
    durationMin: 56,
    weather: "Suitable",
    requiredDrone: "AgriWing X2",
    batteryRequirement: "High",
    revenue: 9200,
    cost: 4150,
    priority: "High",
    match: 71,
    reasons: ["High revenue", "Long travel distance", "Requires battery swap"],
    position: { x: 86, y: 78 },
    state: "Available",
  }),
  mk({
    id: "JOB-1047",
    title: "Solar Panel Inspection",
    category: "Commercial",
    type: "Solar panel inspection",
    customer: "Suryan Energy Park",
    location: "Pune MIDC",
    areaAcres: 9.0,
    distanceKm: 14.2,
    durationMin: 38,
    weather: "Suitable",
    requiredDrone: "AgriWing X2",
    batteryRequirement: "Medium",
    revenue: 7400,
    cost: 2650,
    priority: "Medium",
    match: 83,
    reasons: ["High margin commercial job", "Thermal payload available"],
    position: { x: 70, y: 18 },
    state: "Available",
  }),
  mk({
    id: "JOB-1048",
    title: "Construction Progress Mapping",
    category: "Commercial",
    type: "Construction progress mapping",
    customer: "Meridian Builders",
    location: "Hinjewadi",
    areaAcres: 4.5,
    distanceKm: 18.9,
    durationMin: 28,
    weather: "Caution",
    requiredDrone: "AgriWing X2",
    batteryRequirement: "Medium",
    revenue: 5100,
    cost: 2300,
    priority: "Low",
    match: 64,
    reasons: ["Moderate profit", "Urban airspace caution", "Longer travel"],
    position: { x: 14, y: 72 },
    state: "Available",
  }),
  mk({
    id: "JOB-1049",
    title: "Field Surveying & Boundary Mapping",
    category: "Agriculture",
    type: "Field surveying",
    customer: "Deshmukh Estate",
    location: "Saswad, MH",
    areaAcres: 31.0,
    distanceKm: 9.6,
    durationMin: 62,
    weather: "Suitable",
    requiredDrone: "AgriWing X2",
    batteryRequirement: "High",
    revenue: 8600,
    cost: 3400,
    priority: "Medium",
    match: 80,
    reasons: ["Large acreage", "Repeat customer", "Two-battery mission"],
    position: { x: 52, y: 88 },
    state: "Available",
  }),
];

export const activeMissions = [
  {
    id: "MSN-2201",
    job: "JOB-1039 · Grape Canopy Mapping",
    drone: "DRONE-03",
    progress: 68,
    etaMin: 9,
    field: "FIELD-04",
  },
  {
    id: "MSN-2202",
    job: "JOB-1036 · Cotton Spraying",
    drone: "DRONE-01",
    progress: 0,
    etaMin: 41,
    field: "FIELD-11",
  },
];

export const telemetrySeries = Array.from({ length: 12 }, (_, i) => ({
  t: `${i * 5}m`,
  battery: Math.round(100 - i * 5.4 + (i % 3)),
  temperature: +(28 + i * 0.42 + (i % 4) * 0.2).toFixed(1),
  vibration: +(0.28 + (i % 5) * 0.035).toFixed(2),
}));

export const missionDurationSeries = [
  { name: "Mon", duration: 22, consumption: 41 },
  { name: "Tue", duration: 31, consumption: 55 },
  { name: "Wed", duration: 18, consumption: 33 },
  { name: "Thu", duration: 44, consumption: 72 },
  { name: "Fri", duration: 28, consumption: 49 },
  { name: "Sat", duration: 36, consumption: 61 },
  { name: "Sun", duration: 25, consumption: 44 },
];

export const weatherNow = {
  temperature: 29,
  windKph: 8,
  rainProbability: 12,
  humidity: 54,
  visibilityKm: 9.5,
  window: "06:40 – 11:20",
  suitability: "SUITABLE" as const,
  recommendation: "Current conditions appear suitable for the planned demonstration mission.",
};

export const weatherHours = [
  { hour: "07:00", wind: 6, rain: 5, temp: 24, suitability: "SUITABLE" },
  { hour: "09:00", wind: 8, rain: 12, temp: 29, suitability: "SUITABLE" },
  { hour: "11:00", wind: 13, rain: 18, temp: 33, suitability: "CAUTION" },
  { hour: "13:00", wind: 19, rain: 34, temp: 35, suitability: "CAUTION" },
  { hour: "15:00", wind: 24, rain: 62, temp: 33, suitability: "NOT RECOMMENDED" },
  { hour: "17:00", wind: 17, rain: 82, temp: 30, suitability: "NOT RECOMMENDED" },
];

export const analyticsDaily = [
  { day: "Mon", missions: 5, revenue: 14200, cost: 5100, utilization: 62 },
  { day: "Tue", missions: 7, revenue: 19800, cost: 6900, utilization: 74 },
  { day: "Wed", missions: 4, revenue: 11400, cost: 4300, utilization: 51 },
  { day: "Thu", missions: 8, revenue: 23600, cost: 8200, utilization: 81 },
  { day: "Fri", missions: 6, revenue: 17300, cost: 6100, utilization: 69 },
  { day: "Sat", missions: 9, revenue: 26100, cost: 9400, utilization: 88 },
  { day: "Sun", missions: 3, revenue: 8700, cost: 3200, utilization: 38 },
];

export const jobsByCategory = [
  { name: "Crop monitoring", value: 34 },
  { name: "Crop spraying", value: 22 },
  { name: "Mapping & survey", value: 18 },
  { name: "Inspection", value: 15 },
  { name: "Damage assessment", value: 11 },
];

export const soilZones = [
  { zone: "Zone A", moisture: 51, status: "Adequate" },
  { zone: "Zone B", moisture: 38, status: "Monitor" },
  { zone: "Zone C", moisture: 29, status: "Low" },
  { zone: "Zone D", moisture: 48, status: "Adequate" },
];

export const cropAssessment = {
  crop: "Tomato",
  field: "FIELD-07",
  areaAcres: 8.4,
  vigor: "Good",
  stress: "Low",
  waterStress: "Moderate",
  damage: "Low",
  weed: "Low",
  confidence: 87,
};

export const cropZones = Array.from({ length: 36 }, (_, i) => {
  const r = (i * 37) % 100;
  return {
    id: i,
    zone: r > 78 ? "Attention" : r > 52 ? "Monitor" : "Healthy",
  } as const;
});

export const storageItems = [
  {
    crop: "Tomato",
    quantityKg: 50,
    condition: "Good",
    temperature: "12°C",
    humidity: "88%",
    ventilation: "Adequate",
    shelfLife: "7–10 days",
  },
  {
    crop: "Onion",
    quantityKg: 180,
    condition: "Fair",
    temperature: "26°C",
    humidity: "62%",
    ventilation: "Good",
    shelfLife: "30–45 days",
  },
  {
    crop: "Grapes",
    quantityKg: 90,
    condition: "Good",
    temperature: "4°C",
    humidity: "92%",
    ventilation: "Adequate",
    shelfLife: "12–18 days",
  },
];

export const alerts = [
  {
    id: "ALT-01",
    severity: "Critical" as const,
    title: "DRONE-02 battery below mission reserve",
    detail: "Estimated flight time 8 min against a required 14 min mission. Charge or reassign.",
    time: "4 min ago",
    read: false,
  },
  {
    id: "ALT-02",
    severity: "Warning" as const,
    title: "Weather window closing at 11:20",
    detail: "Rain probability rises to 62% after 15:00. Weather-sensitive spraying should be advanced.",
    time: "18 min ago",
    read: false,
  },
  {
    id: "ALT-03",
    severity: "Warning" as const,
    title: "Maintenance recommended · DRONE-02",
    detail: "Vibration trend above baseline for 3 consecutive missions. Propeller inspection suggested.",
    time: "1 h ago",
    read: false,
  },
  {
    id: "ALT-04",
    severity: "Information" as const,
    title: "New high-value job nearby · JOB-1047",
    detail: "Solar panel inspection, 14.2 km, estimated profit ₹4,750.",
    time: "2 h ago",
    read: true,
  },
  {
    id: "ALT-05",
    severity: "Information" as const,
    title: "Crop monitoring due · FIELD-07",
    detail: "Last aerial scan 9 days ago. Tomato crop approaching harvest window.",
    time: "5 h ago",
    read: true,
  },
  {
    id: "ALT-06",
    severity: "Warning" as const,
    title: "Storage capacity at 84%",
    detail: "Cold room nearing capacity. Review sell / wait / store decisions.",
    time: "Yesterday",
    read: true,
  },
];

export const fields = [
  { id: "FIELD-07", crop: "Tomato", area: 8.4, condition: "Good", moisture: 42, harvest: "READY SOON" },
  { id: "FIELD-04", crop: "Grapes", area: 5.1, condition: "Good", moisture: 51, harvest: "NOT READY" },
  { id: "FIELD-11", crop: "Cotton", area: 14.2, condition: "Monitor", moisture: 31, harvest: "NOT READY" },
  { id: "FIELD-02", crop: "Wheat", area: 16.5, condition: "Attention", moisture: 27, harvest: "MONITOR" },
];

export const operatorProfile = {
  name: "Rohan Kulkarni",
  business: "SkyFarm Aerial Services",
  base: "Baramati, Maharashtra",
  totalMissions: 356,
  completedMissions: 341,
  revenue: 1240000,
  cost: 468000,
  utilization: 72,
};

export const inr = (n: number) =>
  `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
