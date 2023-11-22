import { useState } from "react";
import Modal from "react-modal";
import "../style/modal.css";
Modal.setAppElement("#root"); // Set the root element for accessibility

const AddPostModal = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit({ title, content });
    setTitle("");
    setContent("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add Post Modal"
    >
      <h2>Add a New Post</h2>
      <label>
        Title:
        <input type="text" value={title} onChange={handleTitleChange} />
      </label>
      <br />
      <label>
        Content:
        <textarea value={content} onChange={handleContentChange} />
      </label>
      <br />
      <button onClick={() => handleSubmit(title)}>Submit</button>
      <button onClick={onClose}>Cancel</button>
    </Modal>
  );
};

export default AddPostModal;
