import React, { useState, useEffect } from "react";
import "./sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faT,
  faVideo,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "../Modal/Modal";
import { fabric } from "fabric";

type Props = {
  videoFile: File | null;
  handleVideoChange: (file: File | null) => void;
  handleImageChange: (file: File | null) => void;
  handleTextChange: (text: string) => void;
  removeVideo: () => void;
};



const Sidebar: React.FC<Props> = ({
  videoFile,
  handleVideoChange,
  handleImageChange,
  removeVideo,
}) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [textInput, setTextInput] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.type.startsWith("image")) {
        const reader = new FileReader();
        reader.onload = function (e) {
          if (e.target && typeof e.target.result === "string") {
            setImageUrl(e.target.result);
          }
        };
        reader.readAsDataURL(file);
        handleImageChange(file);
      } else if (file.type.startsWith("video")) {
        handleVideoChange(file); // Call handleVideoChange for video files
      }
    }
  };

  useEffect(() => {
    if (imageUrl) {
      const canvas = new fabric.Canvas("c", {
        width: 1300,
        height: 200,
      });

      fabric.Image.fromURL(imageUrl, function (oImg) {
        canvas.add(oImg);
      });

      return () => {
        canvas.dispose();
      };
    }
  }, [imageUrl]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleTextChange = (text: string) => {
    setTextInput(text); // Обновляем состояние текста при изменении в модальном окне
  };

  return (
    <section className="sidebar">
      <h1 className="sidebar-title">Tools</h1>
      <div className="sidebar-tools">
        <div className="tool">
          <label htmlFor="image">
            <FontAwesomeIcon icon={faImage} />
            <h1>Images</h1>
          </label>
          <input
            type="file"
            name=""
            id="image"
            hidden
            accept="image/png, image/gif, image/jpeg"
            onChange={handleFileChange}
          />
        </div>
        <div className="tool">
          <label htmlFor="text" onClick={openModal}>
            <FontAwesomeIcon icon={faT} />
            <h1>Text</h1>
          </label>
        </div>
        <div className="tool tool-btn">
          <button className="tool-export">Export Video</button>
        </div>
        <div className="tool-upload">
          {videoFile ? (
            <button onClick={removeVideo} className="btn-remove">
              <FontAwesomeIcon icon={faTrash} className="remove-icon" />
              Remove Video
            </button>
          ) : (
            <>
              <label htmlFor="video">
                <FontAwesomeIcon icon={faVideo} />
                <span>Upload video</span>
              </label>
              <input
                type="file"
                name=""
                id="video"
                hidden
                accept="video/mp4"
                onChange={handleFileChange}
              />
            </>
          )}
        </div>
      </div>
      {isModalOpen && (
        <Modal setOpen={setIsModalOpen} onTextChange={handleTextChange} />
      )}
      <div className="">{textInput}</div>
    </section>
  );
};

export default Sidebar;
