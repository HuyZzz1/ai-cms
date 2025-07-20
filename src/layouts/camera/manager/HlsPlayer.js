import { useEffect, useRef } from "react";
import Hls from "hls.js";

const HlsPlayer = ({
  src,
  width = 640,
  height = 360,
  controls = false,
  autoPlay = true,
  muted = true,
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
        promise.catch((e) =>
          console.warn("Autoplay blocked or failed:", e.message)
        );
      }
    };

    if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });
      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (autoPlay) tryPlay();
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error("HLS.js error:", data);
        if (data?.fatal) {
          hls.destroy();
        }
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      video.addEventListener("loadedmetadata", tryPlay);
    } else {
      console.error("HLS is not supported in this browser.");
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
      width={width}
      height={height}
      controls={controls}
      muted={muted}
      crossOrigin="anonymous"
      style={{ borderRadius: 8 }}
    />
  );
};

export default HlsPlayer;
