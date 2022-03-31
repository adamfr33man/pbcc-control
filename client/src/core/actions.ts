import { Scene, SceneItem } from "./obs";
import { Settings, Transition } from "./types";

export type Action =
  | { type: "connecting" }
  | {
      type: "connected";
      payload: {
        scenes: Scene[];
        activeSceneName: string;
        transition: Transition;
      };
    }
  | {
      type: "connectionError";
      payload: { message: string };
    }
  | { type: "disconnected" }
  | {
      type: "currentSceneChanged";
      payload: { newSceneName: string };
    }
  | {
      type: "transitionCompleted";
    }
  | { type: "selectScene"; payload: { sceneId: number } }
  | {
      type: "setSceneItemEnabled";
      payload: {
        sceneName: string;
        sceneItemId: number;
        sceneItemEnabled: boolean;
      };
    }
  | {
      type: "updateSceneItems";
      payload: { sceneName: string; items: SceneItem[] };
    }
  | {
      type: "updateSceneItemEnabled";
      payload: {
        sceneName: string;
        sceneItemId: number;
        sceneItemEnabled: boolean;
      };
    }
  | {
      type: "updateSettings";
      payload: { settings: Settings };
    };
