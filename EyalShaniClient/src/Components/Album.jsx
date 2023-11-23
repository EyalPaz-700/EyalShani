import { useParams } from "react-router-dom";
import "../style/albums.css";
import { useEffect, useState, useRef } from "react";
import Photo from "./Photo";
export default function Album({ currentUser }) {
  const { id } = useParams();
  const [album, setAlbum] = useState({});
  const [photos, setPhotos] = useState([]);
  const [photoUrl, setPhotoUrl] = useState("www.photo.com");
  const [photoIndex, setPhotoIndex] = useState(6);
  const [photoTitle, setPhotoTitle] = useState("My Photo");
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  const removePhoto = async (photoId) => {
    let response = await fetch(`http://localhost:3000/photos/${photoId}`, {
      method: "DELETE",
    });
    response = await response.json();
    removePhotoFromState(photoId);
  };

  const removePhotoFromState = (photoId) => {
    setPhotos((prev) => {
      return prev.filter((el) => el.id !== photoId);
    });
  };

  const addPhoto = async () => {
    if (photoUrl.trim().length > 0) {
      const photoBody = {
        albumId: id,
        url: photoUrl,
        title: photoTitle,
      };
      let response = await fetch(`http://localhost:3000/photos/`, {
        method: "POST",
        body: JSON.stringify(photoBody),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      response = await response.json();
      setPhotos((prev) => {
        return [...prev, response];
      });
      setPhotoUrl("");
    }
  };

  useEffect(() => {
    fetch(`http://localhost:3000/albums/${id}`)
      .then((data) => data.json())
      .then((data) => setAlbum(data))
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;

      if (container) {
        const { scrollTop, scrollHeight, clientHeight } = container;

        if (scrollTop + clientHeight >= scrollHeight - 200 && !loading) {
          setLoading(true);
          setPhotoIndex((prev) => prev + 3);
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [loading]);

  useEffect(() => {
    fetch(`http://localhost:3000/photos/?albumId=${id}`)
      .then((data) => data.json())
      .then((data) => setPhotos(data.slice(0, photoIndex)))
      .catch((err) => console.log(err))
      .finally(setLoading(false));
  }, [id, photoIndex]);

  return (
    <div className="full-album">
      <h2 className="full-album-title">{album.title}</h2>
      <div ref={containerRef} className="images-container">
        {photos.map((photo, index) => {
          return (
            <Photo
              photoId={photo.id}
              key={index}
              title={photo.title}
              url={photo.url}
              removePhoto={() => removePhoto(photo.id)}
            />
          );
        })}
      </div>
      <div className="add-photo">
        <input
          placeholder="Photo Url"
          value={photoUrl}
          onInput={(e) => setPhotoUrl(e.target.value)}
          type="text"
        />
        <input
          placeholder="Photo Title"
          value={photoTitle}
          onInput={(e) => setPhotoTitle(e.target.value)}
          type="text"
        />
        <button onClick={addPhoto}> Add Photo</button>
      </div>
    </div>
  );
}
