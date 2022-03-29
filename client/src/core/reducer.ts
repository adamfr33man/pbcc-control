import { Reducer } from "react";
import { obs } from "./obs";
import { Action } from "./actions";
import { Scene } from "./obs";
import { Settings } from "./types";
import { loadSettings, saveSettings } from "./settings";

export type State = {
  connection: ConnectionState;
  error: string | undefined;
  scenes: Scene[];
  activeSceneName: string;
  settings: Settings;
};

export type ConnectionState =
  | "connecting"
  | "connected"
  | "disconnected"
  | "connectionError";

export const initialState: State = {
  connection: "disconnected",
  error: undefined,
  scenes: [],
  activeSceneName: "",
  settings: loadSettings(),
};

export const reducer: Reducer<Readonly<State>, Action> = (state, action) => {
  switch (action.type) {
    case "connectionError":
      return { ...state, error: action.payload.message };

    case "connecting":
      return { ...state, connection: "connecting" };

    case "connected": {
      console.log("CONNECTED", action);
      const { scenes, activeSceneName } = action.payload;
      return {
        ...state,
        connection: "connected",
        error: undefined,
        scenes,
        activeSceneName,
      };
    }

    case "disconnected":
      return { ...initialState, connection: "disconnected" };

    case "currentSceneChanged": {
      return { ...state, activeSceneName: action.payload.newSceneName };
    }

    case "selectScene":
      obs.call("SetCurrentProgramScene", {
        sceneName:
          state.scenes.find(({ id }) => id === action.payload.sceneId)?.name ??
          "",
      });
      return state;

    case "setSceneItemEnabled":
      obs.call("SetSceneItemEnabled", action.payload);
      return state;

    case "updateSceneItems": {
      const { sceneName, items } = action.payload;
      const scene = state.scenes.find((scene) => scene.name === sceneName);
      if (!scene) {
        throw new Error(`Could not update scene ${sceneName}`);
      }
      const newScenes = state.scenes.map((oldScene) =>
        oldScene.id === scene.id ? { ...scene, items } : oldScene
      );
      return { ...state, scenes: newScenes };
    }

    case "updateSceneItemEnabled": {
      const { sceneName, sceneItemId, sceneItemEnabled } = action.payload;
      const newScenes = state.scenes.map((scene) =>
        scene.name === sceneName
          ? {
              ...scene,
              items: scene.items.map((item) =>
                item.id === sceneItemId
                  ? {
                      ...item,
                      enabled: sceneItemEnabled,
                    }
                  : item
              ),
            }
          : scene
      );
      return { ...state, scenes: newScenes };
    }

    case "updateSettings": {
      const { settings } = action.payload;
      saveSettings(settings);
      obs.disconnect();
      return { ...initialState, settings };
    }

    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
};
