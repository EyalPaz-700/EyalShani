import React from "react";
import "../style/post.css";
import { Link } from "react-router-dom";
export default function MinimizedPost({
  user,
  title,
  body,
  postId,
  currentUser,
  removePost,
}) {
  return (
    <div className="post">
      <div className="post-header">
        <Link to={`/posts/${postId}`}>See Full Post</Link>
        <h4>{user}</h4>
        {user === currentUser.id && (
          <button className="remove-button" onClick={removePost}>
            Remove Post
          </button>
        )}
      </div>
      <h4 className="post-title">{title}</h4>
      <h6>{body}</h6>
    </div>
  );
}
