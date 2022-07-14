import NumbersIcon from "@mui/icons-material/Numbers";
import PasswordIcon from "@mui/icons-material/Password";
import PublicIcon from "@mui/icons-material/Public";
import TimerIcon from "@mui/icons-material/Timer";
import CloseIcon from "@mui/icons-material/Close";
import AbcIcon from "@mui/icons-material/Abc";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import type { CurrentSettingsFormat } from "../core";
import { version } from "../../package.json";

type SettingsPanelProps = {
  settings: CurrentSettingsFormat;
  onSettingsChanged: (settings: CurrentSettingsFormat) => void;
  onClose: () => void;
};

export const SettingsPanel = ({
  settings,
  onSettingsChanged,
  onClose,
}: SettingsPanelProps) => {
  const [newSettings, setNewSettings] =
    useState<CurrentSettingsFormat>(settings);
  const [connectOnStartup, setConnectOnStartup] = useState(
    settings.connectOnStartup
  );
  const [mainPreview, setMainPreview] = useState(settings.mainPreview);
  const [scenePreview, setScenePreview] = useState(settings.scenePreview);

  return (
    <Box sx={{ pt: 1, pb: 4 }}>
      <Box display="flex" justifyContent="flex-end">
        <IconButton aria-label="delete" onClick={() => onClose()}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        <ListItemButton>
          <Typography variant="h6" component="div">
            Version: {version}
          </Typography>
        </ListItemButton>
        <ListItemButton>
          <Typography variant="h5" component="div">
            Connection Settings
          </Typography>
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <PublicIcon />
          </ListItemIcon>
          <ListItem>
            <TextField
              id="outlined"
              label="IP/Hostname"
              defaultValue={settings.ip}
              onChange={(e) =>
                setNewSettings({ ...newSettings, ip: e.currentTarget.value })
              }
            />
          </ListItem>
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <NumbersIcon />
          </ListItemIcon>
          <ListItem>
            <TextField
              label="Port"
              defaultValue={settings.port}
              onChange={(e) =>
                setNewSettings({
                  ...newSettings,
                  port: parseInt(e.currentTarget.value),
                })
              }
            />
          </ListItem>
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <PasswordIcon />
          </ListItemIcon>
          <ListItem>
            <TextField
              label="Password"
              defaultValue={settings.password}
              onChange={(e) =>
                setNewSettings({
                  ...newSettings,
                  password: e.currentTarget.value,
                })
              }
            />
          </ListItem>
        </ListItemButton>
        <Divider />
        <ListItemButton>
          <ListItemIcon>
            <Switch
              checked={connectOnStartup}
              onChange={(e) => setConnectOnStartup(e.target.checked)}
            />
          </ListItemIcon>
          <ListItem>Connect on Startup</ListItem>
        </ListItemButton>
        <Divider />
        <ListItemButton>
          <Typography variant="h5" component="div">
            Overlays
          </Typography>
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <AbcIcon />
          </ListItemIcon>
          <ListItem>
            <TextField
              label="Overlay Name"
              defaultValue={settings.overlayName}
              onChange={(e) =>
                setNewSettings({
                  ...newSettings,
                  overlayName: e.currentTarget.value,
                })
              }
            />
          </ListItem>
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <AbcIcon />
          </ListItemIcon>
          <ListItem>
            <TextField
              label="Ignore Scenes (CSV)"
              defaultValue={settings.ignoreScenesOverlay}
              onChange={(e) =>
                setNewSettings({
                  ...newSettings,
                  ignoreScenesOverlay: e.currentTarget.value,
                })
              }
            />
          </ListItem>
        </ListItemButton>
        <Divider />
        <ListItemButton>
          <Typography variant="h5" component="div">
            Previews
          </Typography>
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <Switch
              checked={mainPreview}
              onChange={(e) => setMainPreview(e.target.checked)}
            />
          </ListItemIcon>
          <ListItem>Main Preview</ListItem>
        </ListItemButton>
        {mainPreview && (
          <ListItemButton>
            <ListItemIcon>
              <TimerIcon />
            </ListItemIcon>
            <ListItem>
              <TextField
                type="number"
                label="Main Refresh Interval"
                defaultValue={settings.mainRefreshInterval}
                onChange={(e) => {
                  const mainRefreshInterval = parseInt(e.currentTarget.value);

                  if (mainRefreshInterval < 0) {
                    alert(`This number must be greater than 1`);
                    setNewSettings({
                      ...newSettings,
                      mainRefreshInterval,
                    });
                    return;
                  }

                  setNewSettings({
                    ...newSettings,
                    mainRefreshInterval: parseInt(e.currentTarget.value),
                  });
                }}
              />
            </ListItem>
          </ListItemButton>
        )}
        <Divider />
        <ListItemButton>
          <ListItemIcon>
            <Switch
              checked={scenePreview}
              onChange={(e) => setScenePreview(e.target.checked)}
            />
          </ListItemIcon>
          <ListItem>Scene Preview</ListItem>
        </ListItemButton>
        {scenePreview && (
          <ListItemButton>
            <ListItemIcon>
              <TimerIcon />
            </ListItemIcon>
            <ListItem>
              <TextField
                type="number"
                label="Scene Refresh Interval"
                defaultValue={settings.sceneRefreshInterval}
                onChange={(e) => {
                  const sceneRefreshInterval = parseInt(e.currentTarget.value);

                  if (sceneRefreshInterval < 0) {
                    alert(`This number must be greater than 1`);
                    setNewSettings({
                      ...newSettings,
                      sceneRefreshInterval,
                    });
                    return;
                  }

                  setNewSettings({
                    ...newSettings,
                    sceneRefreshInterval: parseInt(e.currentTarget.value),
                  });
                }}
              />
            </ListItem>
          </ListItemButton>
        )}

        <Divider />
        <ListItem>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => onClose()}
              >
                Reset
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  onSettingsChanged({
                    ...newSettings,
                    connectOnStartup,
                    mainPreview,
                    scenePreview,
                  })
                }
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </ListItem>
      </List>
    </Box>
  );
};
