import { useState } from "react";
import Modal from "react-modal";
import "../style/modal.css";
Modal.setAppElement("#root"); // Set the root element for accessibility

const AddAlbumModal = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(title);
    setTitle("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add Album Modal"
    >
      <h2>Add a New Album</h2>
      <label>
        Title:
        <br />
        <input type="text" value={title} onChange={handleTitleChange} />
      </label>

      <button onClick={() => handleSubmit(title)}>Submit</button>
      <button onClick={onClose}>Cancel</button>
    </Modal>
  );
};

export default AddAlbumModal;
