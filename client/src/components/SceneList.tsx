import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  Fade,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Zoom,
} from "@mui/material";
import { useState } from "react";
import { Scene } from "../core";
import { SceneItemList } from "./SceneItemList";

type SceneListProps = {
  scenes: Scene[];
  activeName: string;
  transition: Transition;
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
  transition,
  onSceneClick,
  onSceneItemEnabledClick,
}: SceneListProps) => {
  const [expandedIds, setExpandedIds] = useState<number[]>([]);
  const { to, duration } = transition;

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

          const element = (
            <Accordion>
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

          if (to && to === name) {
            return (
              <Fade
                in={true}
                appear={true}
                timeout={duration}
                easing={{ enter: "ease-in-out", exit: "ease-out" }}
                key={id}
              >
                {element}
              </Fade>
            );
          }
          return <Box key={id}>{element}</Box>;
        })}
      </List>
    </Grid>
  );
};
