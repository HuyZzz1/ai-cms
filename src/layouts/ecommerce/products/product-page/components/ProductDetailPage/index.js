import { useState } from "react";
import Grid from "@mui/material/Grid";
import ProductImages from "../ProductImages";
import ProductInfo from "../ProductInfo";

const videoList = [
  {
    id: 0,
    cameraId: "CAM_0975",
    address: "Đường Lũy Bán Bích, Tân Phú, Tp.Hồ Chí Minh",
    status: "Tốt",
    time: "1 ngày trước",
    src: "https://www.youtube.com/embed/ByED80IKdIU?autoplay=1&mute=1",
    thumbnail: "https://img.youtube.com/vi/ByED80IKdIU/mqdefault.jpg",
    description: ["AI", "Nhận diện", "Tốc độ"],
  },
  {
    id: 1,
    cameraId: "CAM_0976",
    address: "Đường Tô Hiệu, Tân Phú, Tp.Hồ Chí Minh",
    status: "Tốt",
    time: "2 ngày trước",
    src: "https://www.youtube.com/embed/5WN2PJ_Qxjs?autoplay=1&mute=1",
    thumbnail: "https://img.youtube.com/vi/5WN2PJ_Qxjs/mqdefault.jpg",
    description: ["AI", "Nhận diện", "Tốc độ"],
  },
  {
    id: 2,
    cameraId: "CAM_0977",
    address: "Đường Tân Sơn, Tân Bình, Tp.Hồ Chí Minh",
    status: "Tốt",
    time: "2 ngày trước",
    src: "https://www.youtube.com/embed/DLmn7f9SJ5A?autoplay=1&mute=1",
    thumbnail: "https://img.youtube.com/vi/DLmn7f9SJ5A/mqdefault.jpg",
    description: ["AI", "Nhận diện", "Tốc độ"],
  },
  {
    id: 3,
    cameraId: "CAM_0978",
    address: "Đường Út Tịch, Tân Bình, Tp.Hồ Chí Minh",
    status: "Tốt",
    time: "5 ngày trước",
    src: "https://www.youtube.com/embed/RGY622xx1s4?autoplay=1&mute=1",
    thumbnail: "https://img.youtube.com/vi/RGY622xx1s4/mqdefault.jpg",
    description: ["AI", "Nhận diện", "Tốc độ"],
  },
  {
    id: 4,
    cameraId: "CAM_0979",
    address: "Đường Trần Văn Đang, Tân Bình, Tp.Hồ Chí Minh",
    status: "Tốt",
    time: "7 ngày trước",
    src: "https://www.youtube.com/embed/Q71sLS8h9a4?autoplay=1&mute=1",
    thumbnail: "https://img.youtube.com/vi/Q71sLS8h9a4/mqdefault.jpg",
    description: ["AI", "Nhận diện", "Tốc độ"],
  },
  {
    id: 5,
    cameraId: "CAM_0980",
    address: "Đường Trịnh Đình Thảo, Tân Phú, Tp.Hồ Chí Minh",
    status: "Tốt",
    time: "2 ngày trước",
    src: "https://www.youtube.com/embed/83VPsAPWiME?autoplay=1&mute=1",
    thumbnail: "https://img.youtube.com/vi/83VPsAPWiME/mqdefault.jpg",
    description: ["AI", "Nhận diện", "Tốc độ"],
  },
];

function ProductDetailPage() {
  const [selectedVideo, setSelectedVideo] = useState(videoList[0]);

  return (
    <Grid container spacing={10}>
      <Grid item xs={12} lg={7}>
        <ProductImages
          videoList={videoList}
          currentVideo={selectedVideo}
          onChangeVideo={setSelectedVideo}
        />
      </Grid>
      <Grid item xs={12} lg={5}>
        <ProductInfo video={selectedVideo} />
      </Grid>
    </Grid>
  );
}

export default ProductDetailPage;
