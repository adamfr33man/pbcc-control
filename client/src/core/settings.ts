import { Settings, CurrentSettingsFormat } from "./types";

export const initialSettings: CurrentSettingsFormat = {
  version: "3",
  ip: window.location.hostname,
  port: 4455,
  password: "",
  connectOnStartup: false,
  overlayName: "EW/ATV",
  ignoreScenesOverlay: "EW/ATV Fullscreen",
  mainPreview: true,
  mainRefreshInterval: 1000,
  scenePreview: false,
  sceneRefreshInterval: 2000,
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
        case "1.0": {
          const { version, ...oldSettings } = settingsObj;
          settingsObj = {
            ...initialSettings,
            ...oldSettings,
          };
          console.info(
            `Settings were v${version} but will be interpreted with v${initialSettings.version} defaults added`
          );
          saveSettings(settingsObj);
          break;
        }
        case "2": {
          const { version, preview, refreshInterval, ...oldSettings } =
            settingsObj;
          settingsObj = {
            ...initialSettings,
            ...oldSettings,
            mainPreview: preview,
            mainRefreshInterval: refreshInterval * 1000,
          };
          console.info(
            `Settings were v${version} but will be interpreted with v${initialSettings.version} defaults added`
          );
          saveSettings(settingsObj);
          break;
        }
        case "3": {
          return settingsObj;
        }

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
