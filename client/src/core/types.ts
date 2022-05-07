export type SettingsV1 = {
  version: "1.0";
  ip: string;
  port: number;
  password: string;
  connectOnStartup: boolean;
};

export type SettingsV2 = Omit<SettingsV1, "version"> & {
  version: "2";
  preview: boolean;
  refreshInterval: number;
};

export type Settings = SettingsV1 | SettingsV2;

export type CurrentSettingsFormat = SettingsV2;

export type Transition = {
  duration: number;
  from: string | undefined;
  to: string | undefined;
};
