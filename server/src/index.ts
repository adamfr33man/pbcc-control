import SysTray from "systray";
import express from "express";
import path from "path";
import open from "open";
import { faviconIcon, pngIcon } from "./icons";

const port = 4000;

const isWindows = process.platform === "win32";

const systray = new SysTray({
  menu: {
    icon: isWindows ? faviconIcon : pngIcon,
    title: "",
    tooltip: "PBCC Control",
    items: [
      {
        title: "Open Webapp",
        tooltip: "Opens the web app in your native browser",
        checked: false,
        enabled: true,
      },
      {
        title: "Exit",
        tooltip: "Exit and close",
        checked: false,
        enabled: true,
      },
    ],
  },
  debug: false,
  copyDir: true,
});

systray.onClick((action) => {
  switch (action.item.title) {
    case "Open Webapp":
      open(`http://localhost:${port}`);
      break;
    case "Exit":
      systray.kill();
      break;
    default:
      console.error(`Unkown title from systray "${action.item.title}"`);
  }
});

const app = express();

app.use("/", express.static(path.join(__dirname, "../../client/dist")));

app.get("/hello", function (_, res) {
  res.send("Hello World!");
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port} running in ${__dirname}`);
});
