import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

type ButtonAppBarProps = {
  connection: string;
  onConnectClick: () => void;
  onMenuClick: () => void;
};

export const ButtonAppBar = ({
  connection,
  onConnectClick,
  onMenuClick,
}: ButtonAppBarProps) => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => onMenuClick()}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          OBS Web remote
        </Typography>
        <Button color="inherit" onClick={() => onConnectClick()}>
          {connection === "connected" ? "Disconnect" : "Connect"}
        </Button>
      </Toolbar>
    </AppBar>
  </Box>
);
