import { useEffect, useState } from "react";
import "../style/albums.css";
import MinimizedAlbum from "./MinimizedAlbum";
import AddAlbumModal from "./AddAlbumsModal";

export default function Albums({ currentUser }) {
  const [albums, setAlbums] = useState([]);
  const [queryAlbums, setQueryAlbums] = useState([]);
  const removeAlbum = async (albumID) => {
    let response = await fetch(`http://localhost:3000/albums/${albumID}`, {
      method: "DELETE",
    });
    response = await response.json();
    await albumCleanup(albumID);
    removeAlbumFromState(albumID);
  };

  const removeAlbumFromState = (albumID) => {
    setAlbums((prev) => {
      return prev.filter((el) => el.id !== albumID);
    });
  };

  useEffect(() => {
    setQueryAlbums(albums);
  }, [albums]);
  const albumCleanup = async (albumIDToDelete) => {
    fetch(`http://localhost:3000/photos/?albumId=${albumIDToDelete}`)
      .then((response) => response.json())
      .then((photos) => {
        const deletePromises = photos.map((comment) =>
          fetch(`http://localhost:3000/photos/${comment.id}`, {
            method: "DELETE",
          })
        );
        return Promise.all(deletePromises);
      })
      .then(() => {
        console.log(
          `All photos with album Id=${albumIDToDelete} have been deleted.`
        );
      })
      .catch((error) => console.error("Error:", error));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddAlbum = async (title) => {
    const albumBody = {
      userId: currentUser.id,
      title: title,
    };
    let response = await fetch(`http://localhost:3000/Albums/`, {
      method: "POST",
      body: JSON.stringify(albumBody),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setAlbums((prev) => {
      return [...prev, response];
    });
  };

  useEffect(() => {
    fetch(`http://localhost:3000/albums/?userId=${currentUser.id}`)
      .then((data) => data.json())
      .then((data) => {
        setAlbums(data);
        setQueryAlbums(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="add-btns">
        <button className="add-post" onClick={handleOpenModal}>
          New Album
        </button>
        <input
          type="text"
          placeholder="Search"
          onInput={(e) => {
            setQueryAlbums(
              albums.filter((el) => el.title.includes(e.target.value.trim()))
            );
          }}
          className="search-query"
        />
      </div>

      <AddAlbumModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddAlbum}
      />
      <div className="albums-container">
        {queryAlbums.map((album, index) => (
          <MinimizedAlbum
            currentUser={currentUser}
            key={index}
            user={album.userId}
            title={album.title}
            albumId={album.id}
            removeAlbum={() => removeAlbum(album.id)}
          />
        ))}
      </div>
    </>
  );
}
