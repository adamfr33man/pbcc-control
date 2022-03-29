import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { SceneItem } from "../core";

type SceneItemListProps = {
  name: string;
  items: SceneItem[];
  expanded: boolean;
  onSceneItemEnabledClick: (payload: {
    sceneName: string;
    sceneItemId: number;
    sceneItemEnabled: boolean;
  }) => void;
};

export const SceneItemList = ({
  name,
  items,
  expanded,
  onSceneItemEnabledClick,
}: SceneItemListProps) => {
  const sceneName = name;

  return (
    <List component="div" disablePadding>
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
            {enabled ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </ListItemIcon>
          <ListItemText primary={name} />
        </ListItemButton>
      ))}
    </List>
  );
};
