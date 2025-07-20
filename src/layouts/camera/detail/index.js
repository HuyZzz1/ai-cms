import { useCallback, useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import "video.js/dist/video-js.css";
import DashboardLayout from "@/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@/examples/Navbars/DashboardNavbar";
import videojs from "video.js";
import { getCameraDetailQuery } from "@/service/api/camera";
import { QueryKey } from "@/service/constant";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import dayjs from "dayjs";

const CAMERAS_ENDPOINT = "https://camera.otalk.ai/api/v1/cameras/stream/urls";
const START_STREAM_ENDPOINT = "https://camera.otalk.ai/api/v1/streams/start";
const STOP_STREAM_ENDPOINT = "https://camera.otalk.ai/api/v1/streams/stop";
const PROCESS_STATUS_ENDPOINT =
  "https://camera.otalk.ai/api/v1/streams/process-status";
const HLS_URLS_ENDPOINT = "https://camera.otalk.ai/api/v1/streams/hls-urls";

export default function CameraDetail() {
  const { id } = useParams();
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [streamUrl, setStreamUrl] = useState("");
  const [startedAt, setStartedAt] = useState(null);
  const [sourceUrl, setSourceUrl] = useState("");
  const [pollingCount, setPollingCount] = useState(0);
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  const [hasAttached, setHasAttached] = useState(false);
  const hasStartedStream = useRef(false);

  console.log("streamUrl", streamUrl);

  const { data } = useQuery({
    queryKey: [QueryKey.cameraDetail, id],
    queryFn: () => getCameraDetailQuery(id).then((res) => res.data),
    enabled: !!id,
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      // case "Đang kiểm tra":
      //   return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "inactive":
        return "bg-red-100 text-red-800 border-red-200";
      case "error":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return null;
    }
  };

  const getName = (status) => {
    switch (status) {
      case "active":
        return "Đang hoạt động";
      case "inactive":
        return "Không hoạt động";
      case "error":
        return "Lỗi";
      default:
        return null;
    }
  };

  const startStream = async () => {
    const payload = {
      cameraId: selectedCamera.cameraId,
      url: selectedCamera.url,
      tenantId: selectedCamera.tenantId || "default",
    };

    setSourceUrl(selectedCamera.url);
    setStartedAt(new Date().toLocaleString());
    setPollingCount(0);

    const res = await fetch(START_STREAM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (data.status === "starting") {
      pollForStream(data.cameraId, data.hlsUrl);
    } else {
    }
  };

  const pollForStream = async (cameraId, hlsUrl, attempt = 0) => {
    if (attempt >= 30) {
      console.warn("❌ Quá 30 lần polling – thử startStream() lại");

      // Gọi lại startStream() sau 1s để tránh spam liên tục
      setTimeout(() => {
        startStream();
      }, 1000);

      return;
    }

    setPollingCount(attempt + 1);

    try {
      const processStatusRes = await fetch(PROCESS_STATUS_ENDPOINT);
      const processData = await processStatusRes.json();
      if (processData.status !== "active") {
        throw new Error("Backend not running");
      }

      const hlsListRes = await fetch(HLS_URLS_ENDPOINT);
      const hlsData = await hlsListRes.json();
      const found = hlsData.streams?.some(
        (s) => s.cameraId === cameraId && s.status === "active"
      );
      if (!found) {
        throw new Error("Stream not registered yet");
      }

      const response = await fetch(hlsUrl + "?t=" + Date.now());
      if (response.ok) {
        const text = await response.text();
        if (text.includes("#EXTINF")) {
          setStreamUrl(hlsUrl);
          return;
        }
      }
    } catch (e) {
      console.warn(`Poll attempt ${attempt + 1} failed:`, e.message);
    }

    setTimeout(() => pollForStream(cameraId, hlsUrl, attempt + 1), 1000); // rút gọn polling interval 2s ➜ 1s (hoặc giữ nguyên tuỳ bạn)
  };

  const stopStream = useCallback(async () => {
    if (!streamUrl) return;

    try {
      await fetch(STOP_STREAM_ENDPOINT, { method: "POST" });
    } catch (err) {
      console.warn("stopStream error:", err.message);
    }

    setStreamUrl("");
    setSourceUrl("");
    setStartedAt(null);
    setPollingCount(0);
  }, [streamUrl]);

  useEffect(() => {
    const video = videoRef.current;
    let hls;

    if (!streamUrl || !video || hasAttached) return;

    setHasAttached(true);
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("autoplay", "");

    const tryPlay = () => {
      video.play().catch((err) => {
        console.warn("Autoplay failed", err.message);
        if (["NotAllowedError", "AbortError"].includes(err.name)) {
          const onVisible = () => {
            if (document.visibilityState === "visible") {
              document.removeEventListener("visibilitychange", onVisible);
              tryPlay();
            }
          };
          document.addEventListener("visibilitychange", onVisible);
        }
      });
    };

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = streamUrl;
      video.onloadedmetadata = tryPlay;
    } else if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(streamUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, tryPlay);
      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data?.fatal) hls.destroy();
      });
    } else {
      playerRef.current = videojs(video, {
        autoplay: true,
        controls: false,
        responsive: true,
        fluid: true,
        sources: [{ src: streamUrl, type: "application/x-mpegURL" }],
      });
    }

    return () => {
      if (hls) hls.destroy();
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
      if (video) {
        video.pause();
        video.removeAttribute("src");
        video.load();
      }
      setHasAttached(false);
    };
  }, [streamUrl]);

  useEffect(() => {
    setStreamUrl("");
    setSourceUrl("");
    setStartedAt(null);
    setPollingCount(0);
    fetch(CAMERAS_ENDPOINT)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          // Delay để tránh race condition
          setTimeout(() => {
            setSelectedCamera(data[0]);
          }, 0);
        }
      })
      .catch(() => {
        const fallback = {
          cameraId: "test-camera",
          url: "rtsp://103.95.197.123:8554/mystream",
          tenantId: "default",
        };
        // Delay để đảm bảo selectedCamera được set đúng lúc
        setTimeout(() => {
          setSelectedCamera(fallback);
        }, 0);
      });
  }, []);

  useEffect(() => {
    if (!selectedCamera?.cameraId || hasStartedStream.current) return;

    const timer = setTimeout(() => {
      startStream();
      hasStartedStream.current = true;
    }, 0);

    return () => clearTimeout(timer);
  }, [selectedCamera]);

  useEffect(() => {
    return () => {
      stopStream();
    };
  }, []);

  useEffect(() => {
    const handleUnload = () => {
      stopStream();
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar breadcrumbRoute={["Giám sát", "Giám sát trực tiếp"]} />
      <div className="flex items-center justify-between mb-6 sm:flex-col sm:items-start sm:gap-2 w-full h-full">
        <h2 className="text-xl font-semibold text-left flex-1">
          Thiết bị: {data?.device}
        </h2>
      </div>

      <div className="flex justify-between gap-10 md:flex-col md:gap-5">
        <div className="w-[60%] relative md:w-full">
          <div className="w-full h-full pointer-events-none rounded-xl">
            {streamUrl ? (
              <div className="video-container h-[800px] xxl:h-[500px] md:!h-full">
                <video
                  ref={videoRef}
                  className="video-js vjs-default-skin rounded-xl "
                  preload="auto"
                  playsInline
                  muted
                  style={{ width: "100%", height: "auto", borderRadius: 8 }}
                />
              </div>
            ) : (
              <iframe
                src={data?.url}
                style={{ width: "100%" }}
                className="rounded-xl h-[800px] xxl:h-[500px] md:!h-[300px]"
              />
            )}

            {data?.status === "active" && (
              <div className="absolute top-2 left-2">
                <div className="flex items-center gap-1 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  LIVE
                </div>
              </div>
            )}
          </div>
        </div>

        <div className=" flex-1 flex-col  md:w-full">
          <div>
            <div className="flex items-center gap-2 mb-2 w-full">
              <Badge
                variant="outline"
                className={`text-xs ${getStatusColor(data?.status)}`}
              >
                Trạng thái: {getName(data?.status)}
              </Badge>
            </div>
            <p className="font-medium text-md sm:text-base mb-1">
              Mã camera: {data?.device}
            </p>
            <p className="text-sm  font-medium ">
              Khu vực: {data?.districtId?.name}
            </p>
            <p className="text-sm font-medium ">Vị trí: {data?.location}</p>
            <p className="text-sm text-gray-600 mt-1">
              Cập nhật: {dayjs(data?.updatedAt).format("DD/MM/YYYY HH:mm")}
            </p>
          </div>

          {!streamUrl && (
            <div className="mt-2 text-sm font-medium">
              {pollingCount >= 30 ? (
                <span className="text-red-600">
                  Không nhận được luồng sau 30 giây, đang thử lại...
                </span>
              ) : pollingCount > 0 ? (
                <span className="text-blue-500">
                  Chờ phân tích trực tiếp ({pollingCount}/30s)...
                </span>
              ) : null}
            </div>
          )}

          {streamUrl && (
            <div className="stream-card" style={{ marginTop: 20 }}>
              <div className="text-sm font-medium">PROCESSING & STREAMING</div>
              <div style={{ fontSize: 12, marginTop: 5 }}>
                Started: {startedAt}
              </div>
              <div style={{ fontSize: 12, marginTop: 5 }}>
                Source: {sourceUrl}
              </div>
              <div style={{ fontSize: 12, marginTop: 5 }}>
                Output: AI-enhanced HLS stream with object tracking
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
