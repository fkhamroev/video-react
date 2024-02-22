import React, { useRef, useEffect } from "react";
import "./Video.css";
import { FFmpeg } from "@ffmpeg/ffmpeg";

type Props = {
  videoFile: File | null;
};

const Video: React.FC<Props> = ({ videoFile }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ffmpeg = new FFmpeg();

  const videoTrim = async () => {
    if (!videoFile) return;

    await ffmpeg.load();
    ffmpeg.FS("writeFile", "input.mp4", await fetchFile(videoFile));
    await ffmpeg.run("-i", "input.mp4", "-ss", "00:00:03", "-to", "00:00:10", "-c", "copy", "output.mp4");
    const data = ffmpeg.FS("readFile", "output.mp4");
    const blob = new Blob([data.buffer], { type: "video/mp4" });
    const url = URL.createObjectURL(blob);
    const videoElement = document.createElement("video");
    videoElement.src = url;
    videoElement.controls = true;
    document.body.appendChild(videoElement);
    videoElement.play(); // Воспроизведение видео после обработки
  };

  const fetchFile = async (file: File) => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onerror = reject;
      reader.onload = () => {
        resolve(new Uint8Array(reader.result as ArrayBuffer));
      };
      reader.readAsArrayBuffer(file);
    });
  };

  useEffect(() => {
    if (!videoFile || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    const video = document.createElement('video');

    video.addEventListener('loadedmetadata', () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      video.play(); // Воспроизведение видео после загрузки
      drawFrame();
    });

    const drawFrame = () => {
      if (video.paused || video.ended) return;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      requestAnimationFrame(drawFrame);
    };

    video.src = URL.createObjectURL(videoFile);
    video.autoplay = true;

    return () => {
      URL.revokeObjectURL(video.src);
    };
  }, [videoFile]);

  return (
    <section className="video-div">
      <div className="video">
        <canvas ref={canvasRef} id="c" className="canvas"></canvas>
        {videoFile && <button onClick={videoTrim}>Trim Video</button>}
      </div>
    </section>
  );
};

export default Video;
