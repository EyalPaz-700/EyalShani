import React from "react";

export default function Comment({
  removeComment,
  currentUser,
  postOwner,
  commenter,
  body,
}) {
  return (
    <div className="comment">
      <h4>{commenter}</h4>
      <h5>{body}</h5>
      {postOwner === currentUser.id && (
        <button onClick={removeComment}>Remove Comment</button>
      )}
    </div>
  );
}
