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
  | { type: "transitionDurationChanged"; payload: { duration: number } }
  | { type: "transitionStarted" }
  | {
      type: "transitionCompleted";
    }
  | { type: "selectScene"; payload: { sceneName: string } }
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
