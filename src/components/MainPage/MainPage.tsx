import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Video from "../Video/Video";
import "./mainpage.css";

const MainPage: React.FC = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const handleVideoChange = (file: File | null) => {
    setVideoFile(file);
  };

  const removeVideo = () => {
    setVideoFile(null);
  };
  const [textInput, setTextInput] = useState<string>("");

  const handleTextChange = (text: string) => {
    setTextInput(text);
  };

  return (
    <div className="main-page">
      <div className="sidebar">
        <Sidebar
          videoFile={videoFile}
          handleVideoChange={handleVideoChange}
          removeVideo={removeVideo}
          onTextChange={handleTextChange}
        />
      </div>
      <div className="video">
        <Video videoFile={videoFile} textInput={textInput} />
      </div>
    </div>
  );
};

export default MainPage;
