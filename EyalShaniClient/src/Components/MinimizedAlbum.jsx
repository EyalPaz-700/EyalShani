import React from "react";
import { Link } from "react-router-dom";
import "../style/albums.css";
export default function MinimizedAlbum({
  currentUser,
  user,
  title,
  albumId,
  removeAlbum,
}) {
  return (
    <div className="album">
      <div className="album-header">
        <Link to={`/albums/${albumId}`}>See Full Album</Link>
        {user === currentUser.id && (
          <button className="remove-button" onClick={removeAlbum}>
            Remove Album
          </button>
        )}
      </div>
      <h4 className="album-title">{title}</h4>
    </div>
  );
}
