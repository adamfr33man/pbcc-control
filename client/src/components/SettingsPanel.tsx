import NumbersIcon from "@mui/icons-material/Numbers";
import PasswordIcon from "@mui/icons-material/Password";
import PublicIcon from "@mui/icons-material/Public";
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
import { Settings } from "../core";

type SettingsPanelProps = {
  settings: Settings;
  onSettingsChanged: (settings: Settings) => void;
  onClose: () => void;
};

export const SettingsPanel = ({
  settings,
  onSettingsChanged,
  onClose,
}: SettingsPanelProps) => {
  const [newSettings, setNewSettings] = useState<Settings>(settings);
  const [connectOnStartup, setConnectOnStartup] = useState(
    settings.connectOnStartup
  );

  return (
    <Box sx={{ pt: 4, pb: 4 }}>
      <List>
        <ListItemButton>
          <Typography variant="h6" component="div">
            Version: {APP_VERSION}
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
                  onSettingsChanged({ ...newSettings, connectOnStartup })
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
