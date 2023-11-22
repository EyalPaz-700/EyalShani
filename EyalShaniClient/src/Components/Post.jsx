import { useParams } from "react-router-dom";
import "../style/post.css";
import { useEffect, useState } from "react";
import Comment from "./Comment";

export default function Post({ currentUser }) {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");

  const removeComment = async (commentId) => {
    debugger;
    let response = await fetch(`http://localhost:3000/comments/${commentId}`, {
      method: "DELETE",
    });
    response = await response.json();
    removeCommentFromState(commentId);
  };

  const removeCommentFromState = (commentId) => {
    setComments((prev) => {
      return prev.filter((el) => el.id !== commentId);
    });
  };

  const addComment = async () => {
    const commentBody = {
      postId: id,
      name: currentUser.username,
      body: commentContent,
      email: currentUser.email,
    };
    let response = await fetch(`http://localhost:3000/comments/`, {
      method: "POST",
      body: JSON.stringify(commentBody),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setComments((prev) => {
      return [...prev, response];
    });
  };

  useEffect(() => {
    fetch(`http://localhost:3000/posts/${id}`)
      .then((data) => data.json())
      .then((data) => setPost(data))
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:3000/comments/?postId=${id}`)
      .then((data) => data.json())
      .then((data) => setComments(data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="full-post">
      <h1 className="full-post-header">{post.userId}</h1>
      <h2>{post.title}</h2>
      <article>{post.body}</article>
      <div className="comment-section">
        <h3 className="comments-header">Comments</h3>
        <div className="comment-container">
          {comments.map((comment, index) => {
            debugger;
            return (
              <Comment
                currentUser={currentUser}
                commenter={comment.name}
                body={comment.body}
                key={index}
                postOwner={post.userId}
                removeComment={() => removeComment(comment.id)}
              />
            );
          })}
        </div>
      </div>
      <div className="add-comment">
        <input onInput={(e) => setCommentContent(e.target.value)} type="text" />
        <button onClick={addComment}> Add Comment</button>
      </div>
    </div>
  );
}
