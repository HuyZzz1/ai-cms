import { useEffect, useRef } from "react";
import Hls from "hls.js";

const HlsPlayer = ({
  src,
  width = 640,
  height = 360,
  controls = false,
  autoPlay = true,
  muted = true,
  className,
}) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    let hls;

    if (!video || typeof src !== "string" || !src.trim()) return;

    video.setAttribute("playsinline", "true");
    if (muted) video.setAttribute("muted", "true");

    const tryPlay = () => {
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch((e) => {
          console.warn("Autoplay blocked or failed:", e.message);
        });
      }
    };

    if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 30,
        maxBufferLength: 60,
        maxMaxBufferLength: 120,
        maxBufferHole: 0.5,
        maxBufferSize: 60 * 1000 * 1000, // 60MB
        highBufferWatchdogPeriod: 2,
      });

      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (autoPlay) tryPlay();
        hls.currentLevel = -1; // auto level
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error("🔥 HLS.js error:", data);

        if (data?.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.warn("🔁 Recovering from NETWORK_ERROR...");
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.warn("🔁 Recovering from MEDIA_ERROR...");
              hls.recoverMediaError();
              break;
            default:
              console.warn(
                "💥 Unrecoverable fatal error. Destroying instance."
              );
              hls.destroy();
              break;
          }
        } else {
          // Optional: retry buffer appending errors
          if (data.details === "bufferAppendError") {
            console.warn("⚠️ Buffer append error, possible discontinuity");
          }
        }
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      video.addEventListener("loadedmetadata", tryPlay);
    } else {
      console.error("🚫 HLS is not supported in this browser.");
    }

    return () => {
      if (hls) hls.destroy();
      if (video) {
        video.pause();
        video.removeAttribute("src");
        video.load();
      }
    };
  }, [src, autoPlay, muted]);

  return (
    <video
      ref={videoRef}
      controls={controls}
      muted={muted}
      crossOrigin="anonymous"
      style={{
        width: width,
        height: height,
        backgroundColor: "#000",
        objectFit: "cover", // nếu bạn muốn fill khung
      }}
      className={` ${className}`}
    />
  );
};

export default HlsPlayer;
