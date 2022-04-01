import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  Checkbox,
  Fade,
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
  transition: Transition;
  onSceneClick: (payload: { sceneName: string }) => void;
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

          const checkbox = (
            <Checkbox
              edge="start"
              tabIndex={-1}
              checked={active}
              onClick={(e) => {
                e.stopPropagation();
                onSceneClick({ sceneName: name });
              }}
              disabled={!!to}
            />
          );

          return (
            <Accordion key={id} disableGutters>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon onClick={() => handleClick(id)} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <ListItem component="div" disablePadding>
                  <ListItemIcon>
                    {to && to === name ? (
                      <Fade
                        in={true}
                        appear={true}
                        timeout={duration}
                        easing={{ enter: "ease-in-out", exit: "ease-out" }}
                        key={id}
                      >
                        {checkbox}
                      </Fade>
                    ) : (
                      checkbox
                    )}
                  </ListItemIcon>
                  <ListItemText>
                    <Typography component="div">{name}</Typography>
                  </ListItemText>
                </ListItem>
              </AccordionSummary>
              <AccordionDetails style={{ backgroundColor: "#f3f2f3" }}>
                <Card>
                  <SceneItemList
                    name={name}
                    items={items}
                    onSceneItemEnabledClick={onSceneItemEnabledClick}
                  />
                </Card>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </List>
    </Grid>
  );
};
