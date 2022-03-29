import OBSWebSocket from "obs-websocket-js";

export const obs = new OBSWebSocket();

export type Scene = {
  id: number;
  name: string;
  items: SceneItem[];
};

export type SceneItem = {
  id: number;
  index: number;
  name: string;
  enabled: boolean;
};
