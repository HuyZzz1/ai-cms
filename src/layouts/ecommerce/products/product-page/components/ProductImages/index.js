import MDBox from "components/MDBox";

function ProductImages({ videoList, currentVideo, onChangeVideo }) {
  return (
    <MDBox>
      <MDBox
        position="relative"
        width="100%"
        paddingTop="56.25%"
        borderRadius="lg"
        overflow="hidden"
        shadow="lg"
      >
        <iframe
          src={currentVideo.src}
          title={currentVideo.title}
          allow="autoplay"
          allowFullScreen
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: 0,
          }}
        />
      </MDBox>

      <MDBox mt={2} pt={1}>
        <div className="flex gap-2.5 flex-wrap">
          {videoList
            .filter((video) => video.id !== currentVideo.id)
            .map((video) => (
              <MDBox
                className="flex-1 object-contain"
                key={video.id}
                component="img"
                src={video.thumbnail}
                alt={`Thumbnail ${video.id}`}
                borderRadius="lg"
                shadow="md"
                width="100px"
                height="5rem"
                sx={{ cursor: "pointer", objectFit: "cover" }}
                onClick={() => onChangeVideo(video)}
              />
            ))}
        </div>
      </MDBox>
    </MDBox>
  );
}

export default ProductImages;
