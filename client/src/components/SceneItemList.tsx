import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Grid,
} from "@mui/material";
import { SceneItem } from "../core";
import { Preview } from "./Preview";

type SceneItemListProps = {
  name: string;
  items: SceneItem[];
  scenePreview: boolean;
  sceneRefreshInterval: number;
  onSceneItemEnabledClick: (payload: {
    sceneName: string;
    sceneItemId: number;
    sceneItemEnabled: boolean;
  }) => void;
};

export const SceneItemList = ({
  name,
  items,
  scenePreview,
  sceneRefreshInterval,
  onSceneItemEnabledClick,
}: SceneItemListProps) => {
  const sceneName = name;

  return (
    <List component="div" disablePadding>
      <Grid container>
        <Grid item xs={6}>
          {items.map(({ id, name, enabled }) => (
            <ListItemButton sx={{ pl: 4 }} key={`sceneItem-${id}`}>
              <ListItemIcon
                onClick={() =>
                  onSceneItemEnabledClick({
                    sceneName,
                    sceneItemId: id,
                    sceneItemEnabled: !enabled,
                  })
                }
              >
                {enabled ? (
                  <VisibilityIcon color="primary" />
                ) : (
                  <VisibilityOffIcon color="error" />
                )}
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItemButton>
          ))}
        </Grid>
        {scenePreview && (
          <Grid item xs={6}>
            <Preview
              refreshInterval={sceneRefreshInterval}
              currentImage={name}
            />
          </Grid>
        )}
      </Grid>
    </List>
  );
};
