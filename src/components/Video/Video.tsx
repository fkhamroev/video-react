import React, { useEffect, useRef, useState } from "react";
import "./Video.css";
import { Player, ControlBar, BigPlayButton } from "video-react";
import "video-react/dist/video-react.css";

type Props = {
  videoFile: File | null;
};

const Video: React.FC<Props> = ({ videoFile }) => {
  const [videoDimensions, setVideoDimensions] = useState({
    width: 0,
    height: 0,
  });
  const canvasRef = useRef(null);

  const handleMetadata = (e) => {
    const { videoWidth, videoHeight } = e.target;
    setVideoDimensions({ width: videoWidth, height: videoHeight });
  };

  useEffect(() => {
    if (canvasRef.current && videoDimensions.width && videoDimensions.height) {
      const canvas = canvasRef.current;
      canvas.width = videoDimensions.width;
      canvas.height = videoDimensions.height;
      canvas.style.width = "100%";
      canvas.style.height = "auto";
    }
  }, [videoDimensions]);

  return (
    <section className="video-div">
      <div className="video">
        {videoFile ? (
          <Player fluid={false} height={500} width="100%">
            <source src={URL.createObjectURL(videoFile)} type="video/mp4" />
            <ControlBar autoHide={true} disableCompletely={false} />
            <BigPlayButton position="center" />
            <video
              onLoadedMetadata={handleMetadata}
              style={{ display: "none" }}
            ></video>
          </Player>
        ) : (
          <div className="no-video">No video uploaded</div>
        )}
        <canvas
          ref={canvasRef}
          id="c"
          className="canvas"
          style={{ position: "absolute", top: 0, left: 0, zIndex: 2 }}
        ></canvas>
      </div>
    </section>
  );
};

export default Video;
