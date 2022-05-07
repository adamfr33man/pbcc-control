import { useCallback, useEffect, useRef } from "react";
import { obs } from "../core";

type PreviewProps = {
  enabled: boolean;
  currentImage?: string;
  newImage?: string;
  refreshInterval: number;
};

export const Preview = ({
  enabled,
  currentImage,
  refreshInterval,
}: PreviewProps) => {
  const previewEl = useRef<HTMLImageElement>(null);
  const timerHandle = useRef(-1);

  const getScreenshot = useCallback(
    (sourceName: string) => {
      if (!sourceName.length) {
        console.info(`Skipped screenshot: ${state.activeSceneName ?? "???"}`);
        return;
      }

      const imageWidth = previewEl.current?.width ?? window.innerWidth / 2;

      obs
        .call("GetSourceScreenshot", {
          sourceName,
          imageFormat: "png",
          imageWidth,
        })
        .then(({ imageData }) =>
          previewEl.current?.setAttribute("src", imageData)
        );
    },
    [previewEl]
  );

  useEffect(() => {
    if (currentImage) {
      getScreenshot(currentImage);
    }

    if (timerHandle.current === -1 && refreshInterval > 0) {
      console.info("Start a timer");
      timerHandle.current = window.setInterval(
        () => currentImage && getScreenshot(currentImage),
        refreshInterval * 1000
      );

      return () => {
        clearInterval(timerHandle.current);
        timerHandle.current = -1;
      };
    }
  }, [currentImage, refreshInterval, timerHandle, getScreenshot]);

  return enabled ? (
    <>
      <img
        ref={previewEl}
        alt="Preview"
        style={{
          display: "inline-block",
          width: "100%",
          background: "#00000022",
        }}
      />
    </>
  ) : (
    <></>
  );
};
