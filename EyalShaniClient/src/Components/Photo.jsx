import React from "react";
import "../style/albums.css";

export default function Photo({ url, title, removePhoto }) {
  return (
    <div className="photo">
      <h3>{title}</h3>
      <img src={url} />
      <button className="remove-photo remove-button" onClick={removePhoto}>
        {" "}
        Remove Photo
      </button>
    </div>
  );
}
