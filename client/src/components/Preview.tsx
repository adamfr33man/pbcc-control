import { useCallback, useEffect, useRef } from "react";
import { obs } from "../core";

type PreviewProps = {
  currentImage?: string;
  newImage?: string;
  refreshInterval: number;
};

export const Preview = ({ currentImage, refreshInterval }: PreviewProps) => {
  const previewEl = useRef<HTMLImageElement>(null);
  const timerHandle = useRef(-1);

  const getScreenshot = useCallback(
    (sourceName: string) => {
      if (!sourceName.length) {
        console.info("Can't get screenshot without an activeSceneName");
        return;
      }

      const imageWidth = previewEl.current?.width ?? window.innerWidth * 0.8;

      const startTime = performance.now();

      obs
        .call("GetSourceScreenshot", {
          sourceName,
          imageFormat: "png",
          imageWidth,
        })
        .then(({ imageData }) => {
          previewEl.current?.setAttribute("src", imageData);
          console.log(
            `Screenshot time: ${(performance.now() - startTime).toFixed()}ms`
          );
        });
    },
    [previewEl]
  );

  useEffect(() => {
    if (currentImage) {
      getScreenshot(currentImage);
    }

    if (timerHandle.current === -1 && refreshInterval > 0) {
      console.info(`Start a timer for ${refreshInterval}ms`);
      timerHandle.current = window.setInterval(
        () => currentImage && getScreenshot(currentImage),
        refreshInterval
      );

      return () => {
        clearInterval(timerHandle.current);
        timerHandle.current = -1;
      };
    }
  }, [currentImage, refreshInterval, timerHandle, getScreenshot]);

  return (
    <img
      ref={previewEl}
      alt="Preview"
      style={{
        display: "inline-block",
        width: "100%",
        background: "#00000022",
      }}
    />
  );
};
