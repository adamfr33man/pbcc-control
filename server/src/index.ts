import SysTray from "systray";
import express from "express";
import path from "path";
import open from "open";

const port = 4000;

const systray = new SysTray({
  menu: {
    // you should using .png icon in macOS/Linux, but .ico format in windows - this is a png for mac for now
    icon: "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAAAAABWESUoAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfmAxsAAQTSBw0pAAACC0lEQVQ4y7XTXUhTcRjH8f82nZlToy3RXuyN8oUibGFJdCEUSehaZUEU3uSFV70hVNBFEtRFQtEuKkP0oousIAnCoiArCLKkF0gay9cG2wK308izHXfO+XaR0dncdtfv8uFz8/8/z8+EyB6z+O8gRwgh1Nu/6jYWZxAAgepC+7brAdJFALxzeB4eWuzsT2QCj21PmB3cueiSnAHczR8Apk/YLihz46hf0g3gfm4fwMzpwm4AlN668i0dk//Ac2sn6BB2rfwEqJ2r6ps35NQMaH/BiL1FZ8oH78uOJWDM8yGmh1qFwyPPAam2Okjg1BS024dA1UC+ttpctr0r/gfQntsP548nGLafAUC7nLv2qjccVufAS1tzjOGKp8T31EwDvFqy9aPhFcQOLnyEst8d40rRWyDaVD5k/Ad47aidpNfxhhcFPUCX7QbJQLtoORzxlnYwtvQc+CoaoykA6aj5yBfnbiWyqQWlzT5IKiBwwOxcURlS6t36vYKT6nxAqC1PLB/VGps+V1V+Iw1A7l5XPq7v2+HK6yEtAO8tSXVbLK3GrQtdT1q/1yka/MZBTnRixlpUXGC1mLRZafRZn6/h5jLjSZr0eND3dSIyq2lyJBjSSqQ7rqSbNSGEQP7h9wck1VpSFTv7YP38qzakb28seZBanJFdC7I2S/7ZkL163zevSQGm5PqP55emgN+6PTWk8vtMUgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMi0wMy0yN1QwMDowMTowNCswMDowMLPSDkQAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjItMDMtMjdUMDA6MDE6MDQrMDA6MDDCj7b4AAAAV3pUWHRSYXcgcHJvZmlsZSB0eXBlIGlwdGMAAHic4/IMCHFWKCjKT8vMSeVSAAMjCy5jCxMjE0uTFAMTIESANMNkAyOzVCDL2NTIxMzEHMQHy4BIoEouAOoXEXTyQjWVAAAAAElFTkSuQmCC",
    title: "",
    tooltip: "Tips",
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
