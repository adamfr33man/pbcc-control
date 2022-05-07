import { Settings, CurrentSettingsFormat } from "./types";

export const initialSettings: CurrentSettingsFormat = {
  version: "2",
  ip: window.location.hostname,
  port: 4455,
  password: "",
  connectOnStartup: false,
  preview: true,
  refreshInterval: 5,
};

export const saveSettings = (settings: CurrentSettingsFormat) => {
  localStorage.setItem("settings", JSON.stringify(settings));
};

export const loadSettings = (): CurrentSettingsFormat => {
  try {
    const textSettings = localStorage.getItem("settings");
    if (textSettings) {
      let settingsObj = JSON.parse(textSettings) as Settings;
      switch (settingsObj.version) {
        case "1.0":
          settingsObj = {
            ...initialSettings,
            ...settingsObj,
            version: initialSettings.version,
          };
          console.info(
            `Settings will be interpreted with v${initialSettings.version} defaults added`
          );
          break;
        case "2":
          return settingsObj;
        default:
          console.error("What's up with settings:", textSettings);
          throw new Error(`Could not parse stored settings`);
      }
      return settingsObj;
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
