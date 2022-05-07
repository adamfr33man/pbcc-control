import NumbersIcon from "@mui/icons-material/Numbers";
import PasswordIcon from "@mui/icons-material/Password";
import PublicIcon from "@mui/icons-material/Public";
import TimerIcon from "@mui/icons-material/Timer";
import {
  Box,
  Button,
  Divider,
  Grid,
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
  const [preview, setPreview] = useState(settings.preview);

  return (
    <Box sx={{ pt: 4, pb: 4 }}>
      <List>
        <ListItemButton>
          <Typography variant="h6" component="div">
            Version: {process.env.APP_VERSION}
          </Typography>
        </ListItemButton>
        <ListItemButton>
          <Typography variant="h5" component="div">
            Settings
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
        <ListItemButton>
          <ListItemIcon>
            <Switch
              checked={preview}
              onChange={(e) => setPreview(e.target.checked)}
            />
          </ListItemIcon>
          <ListItem>Preview</ListItem>
        </ListItemButton>
        {preview && (
          <ListItemButton>
            <ListItemIcon>
              <TimerIcon />
            </ListItemIcon>
            <ListItem>
              <TextField
                type="number"
                label="Refresh Interval"
                defaultValue={settings.refreshInterval}
                onChange={(e) => {
                  const refreshInterval = parseInt(e.currentTarget.value);

                  if (refreshInterval < 0) {
                    alert(
                      `This number must be greater than 1 or 0 for no updates`
                    );
                    setNewSettings({
                      ...newSettings,
                      refreshInterval,
                    });
                    return;
                  }

                  setNewSettings({
                    ...newSettings,
                    refreshInterval: parseInt(e.currentTarget.value),
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
                    preview,
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
