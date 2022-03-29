import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Scene } from "../core";
import { SceneItemList } from "./SceneItemList";

type SceneListProps = {
  scenes: Scene[];
  activeName: string;
  onSceneClick: (payload: { sceneId: number }) => void;
  onSceneItemEnabledClick: (payload: {
    sceneName: string;
    sceneItemId: number;
    sceneItemEnabled: boolean;
  }) => void;
};

export const SceneList = ({
  scenes,
  activeName,
  onSceneClick,
  onSceneItemEnabledClick,
}: SceneListProps) => {
  const [expandedIds, setExpandedIds] = useState<number[]>([]);

  const handleClick = (id: number) => {
    if (!expandedIds.includes(id)) {
      setExpandedIds([...expandedIds, id]);
    } else {
      setExpandedIds(expandedIds.filter((i) => i !== id));
    }
  };

  return (
    <Grid item xs={12} md={6}>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        Scenes
      </Typography>

      <List dense={false}>
        {scenes.map(({ id, name, items }) => {
          const active = activeName === name;
          const sceneExpanded = expandedIds.includes(id);

          return (
            <Accordion key={id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon onClick={() => handleClick(id)} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <ListItem component="div" disablePadding>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      tabIndex={-1}
                      disableRipple
                      checked={active}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSceneClick({ sceneId: id });
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography component="div">{name}</Typography>
                  </ListItemText>
                </ListItem>
              </AccordionSummary>
              <AccordionDetails>
                <SceneItemList
                  name={name}
                  items={items}
                  expanded={sceneExpanded}
                  onSceneItemEnabledClick={onSceneItemEnabledClick}
                />
              </AccordionDetails>
            </Accordion>
          );
        })}
      </List>
    </Grid>
  );
};
