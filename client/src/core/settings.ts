import { Settings } from "./types";

const initialSettings = {
  version: "1.0",
  ip: window.location.hostname,
  port: 4455,
  password: "",
  connectOnStartup: false,
};

export const saveSettings = (settings: Settings) => {
  localStorage.setItem("settings", JSON.stringify(settings));
};

export const loadSettings = () => {
  try {
    const textSettings = localStorage.getItem("settings");
    if (textSettings) {
      return JSON.parse(textSettings);
    } else {
      console.warn("No stored settings, making defaults");
      saveSettings(initialSettings);
      return initialSettings;
    }
  } catch (e) {
    console.warn("Unable to load settings, using defaults");
    return initialSettings;
  }
};
