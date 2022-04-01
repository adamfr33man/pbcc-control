import { Alert, Button, Container, Drawer, Typography } from "@mui/material";
import { useCallback, useEffect, useReducer, useState } from "react";
import "./App.css";
import { ButtonAppBar } from "./components/ButtonAppBar";
import { SceneList } from "./components/SceneList";
import { SettingsPanel } from "./components/SettingsPanel";
import { ErrorBoundary } from "./ErrorBoundary";
import { initialState, reducer, obs, Scene } from "./core";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [overlayState, setOverlayState] = useState(false);

  const { error } = state;

  // TODO: Put this in settings?
  const ignoreScenes = ["EW/ATV Fullscreen"];
  const sceneItemName = "EW/ATV";

  // TODO: Make this assume state when connected
  const getSceneItemsWithOverlay = () => {
    const result: { sceneName: string; sceneItemId: number; enabled: boolean }[] =
      [];
    state.scenes.forEach((scene) => {
      if (ignoreScenes.includes(scene.name)) {
        return false;
      } else {
        const sceneItem = scene.items.find(
          (item) => sceneItemName === item.name
        );
        if (sceneItem) {
          result.push({
            sceneName: scene.name,
            sceneItemId: sceneItem.id,
            enabled: sceneItem.enabled,
          });
        }
      }
    });
    return result;
  };

  const handleOverlayToggle = () => {
    getSceneItemsWithOverlay().forEach(
      ({ sceneName, sceneItemId, enabled }) => {
        console.log(
          `Should flip ${sceneItemId} on ${sceneName} which is ${enabled} vs ${overlayState}`
        );
        obs.call("SetSceneItemEnabled", {
          sceneName,
          sceneItemId,
          sceneItemEnabled: overlayState,
        });
      }
    );
    setOverlayState(!overlayState);
  };

  const connect = useCallback(() => {
    (async () => {
      dispatch({ type: "connecting" });
      const { ip, port, password } = state.settings;
      console.log("Let's go!!!");
      try {
        const { obsWebSocketVersion } = await obs.connect(
          `ws://${ip}:${port}/`,
          password
        );
        console.log(`Connected to server ${obsWebSocketVersion}`);
        // Note connection state is updated in Identified listener
      } catch (e) {
        console.error(e);
        dispatch({
          type: "connectionError",
          payload: {
            message: `Could not connect to ${ip} on ${port}. Message: ${e}`,
          },
        });
      }
    })();
  }, [state, dispatch]);

  const disconnect = useCallback(
    () =>
      (async () => {
        await obs.disconnect();
        dispatch({ type: "disconnected" });
      })(),
    [dispatch]
  );

  const handleConnect = useCallback(() => {
    if (state.connection === "connected") {
      disconnect();
    } else {
      connect();
    }
  }, [state, connect, disconnect]);

  useEffect(() => {
    if (state.settings.connectOnStartup) {
      connect();
    }

    const updateSceneItems = async (sceneName: string) => {
      const { sceneItems } = await obs.call("GetSceneItemList", {
        sceneName: sceneName,
      });

      return (
        await Promise.all(
          (
            sceneItems as Array<{
              sourceName: string;
              sceneItemId: number;
              sceneItemIndex: number;
            }>
          ).map(async ({ sourceName, sceneItemId, sceneItemIndex }) => ({
            id: sceneItemId,
            index: sceneItemIndex,
            name: sourceName,
            enabled: (
              await obs.call("GetSceneItemEnabled", { sceneName, sceneItemId })
            ).sceneItemEnabled,
          }))
        )
      ).reverse();
    };

    const updateData = async () => {
      const { currentProgramSceneName, scenes } = await obs.call(
        "GetSceneList"
      );

      const sceneList: Scene[] = (
        await Promise.all(
          (scenes as Array<{ sceneName: string; sceneIndex: number }>).map(
            async ({ sceneName, sceneIndex }) => ({
              id: sceneIndex,
              name: sceneName,
              items: await updateSceneItems(sceneName),
            })
          )
        )
      ).reverse();

      const { transitionDuration } = await obs.call(
        "GetCurrentSceneTransition"
      );

      dispatch({
        type: "connected",
        payload: {
          scenes: sceneList,
          activeSceneName: currentProgramSceneName,
          transition: {
            duration: transitionDuration,
            from: undefined,
            to: undefined,
          },
        },
      });
    };

    obs.on("Identified", async () => updateData());

    obs.on("CurrentProgramSceneChanged", ({ sceneName }) => {
      dispatch({
        type: "currentSceneChanged",
        payload: { newSceneName: sceneName },
      });
      updateSceneItems(sceneName);
    });

    obs.on("SceneItemEnableStateChanged", (payload) =>
      dispatch({ type: "updateSceneItemEnabled", payload })
    );

    obs.on("SceneTransitionStarted", () =>
      dispatch({ type: "transitionStarted" })
    );

    obs.on("SceneTransitionEnded", () =>
      dispatch({ type: "transitionCompleted" })
    );

    obs.on("CurrentSceneTransitionDurationChanged", ({ transitionDuration }) =>
      dispatch({
        type: "transitionDurationChanged",
        payload: { duration: transitionDuration },
      })
    );

    obs.on("SceneListChanged", () => updateData());

    obs.on("ExitStarted", () => dispatch({ type: "disconnected" }));
  }, []);

  const [open, setOpen] = useState(false);

  return (
    <ErrorBoundary>
      <ButtonAppBar
        connection={state.connection}
        onConnectClick={handleConnect}
        onMenuClick={() => setOpen(!open)}
      />
      <Drawer anchor="left" open={open}>
        <SettingsPanel
          settings={state.settings}
          onClose={() => setOpen(!open)}
          onSettingsChanged={(settings) => {
            setOpen(false);
            dispatch({ type: "updateSettings", payload: { settings } });
          }}
        />
      </Drawer>
      <Container sx={{ mt: 4, mb: 4 }}>
        {error && (
          <Alert variant="filled" severity="error">
            {error}
          </Alert>
        )}

        {state.connection === "connected" ? (
          <>
            <Button
              variant="contained"
              color={overlayState ? "error" : "primary"}
              onClick={() => handleOverlayToggle()}
            >
              {overlayState ? <VisibilityOffIcon /> : <VisibilityIcon />}{" "}
              Overlays {overlayState ? "off" : "on"}
            </Button>
            <SceneList
              scenes={state.scenes}
              activeName={state.activeSceneName}
              transition={state.transition}
              onSceneClick={(payload) =>
                dispatch({
                  type: "selectScene",
                  payload,
                })
              }
              onSceneItemEnabledClick={(payload) =>
                dispatch({
                  type: "setSceneItemEnabled",
                  payload,
                })
              }
            />
          </>
        ) : (
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            {state.connection === "connecting"
              ? "Connecting..."
              : "Not Connected"}
          </Typography>
        )}
      </Container>
    </ErrorBoundary>
  );
};

export default App;
