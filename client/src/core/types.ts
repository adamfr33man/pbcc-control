export type Settings = {
  version: string;
  ip: string;
  port: number;
  password: string;
  connectOnStartup: boolean;
};

export type Transition = {
  duration: number;
  from: string | undefined;
  to: string | undefined;
};
