import React, { FormEvent, useState } from "react";
import "./Modal.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onTextChange: (text: string) => void;
};

const Modal: React.FC<Props> = ({ setOpen, onTextChange }) => {
  const [textInput, setTextInput] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setOpen(false);
    onTextChange(textInput);
    console.log(textInput);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setTextInput(text);
  };

  return (
    <div className="modal">
      <form action="" onSubmit={handleSubmit} className="modal-form">
        <h1 className="form-title">Enter your text to video</h1>
        <input
          type="text"
          id="text"
          placeholder="Enter text"
          className="form-input"
          required
          onChange={handleInputChange}
          value={textInput}
        />
        <input
          type="submit"
          name=""
          id=""
          value="Enter"
          className="form-submit"
        />

        <button className="form-btn" onClick={() => setOpen(false)}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </form>
    </div>
  );
};

export default Modal;
