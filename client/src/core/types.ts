export type Settings = {
  version: string;
  ip: string;
  port: number;
  password: string;
  connectOnStartup: boolean;
};

export type Transition = {
  duration: number;
  name: string;
  from: string | undefined;
  to: string | undefined;
};
