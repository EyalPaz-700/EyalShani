import { useEffect, useState } from "react";
import MinimizedPost from "./MinimizedPost";
import "../style/post.css";
import AddPostModal from "./Modal";

export default function Posts({ currentUser }) {
  const [posts, setPosts] = useState([]);
  const [queryPosts, setQueryPosts] = useState([]);
  const removePost = async (PostId) => {
    let response = await fetch(`http://localhost:3000/posts/${PostId}`, {
      method: "DELETE",
    });
    response = await response.json();
    await postCleanup(PostId);
    removePostFromState(PostId);
  };

  const removePostFromState = (PostId) => {
    setPosts((prev) => {
      return prev.filter((el) => el.id !== PostId);
    });
  };

  const postCleanup = async (postIdToDelete) => {
    fetch(`http://localhost:3000/comments/?postId=${postIdToDelete}`)
      .then((response) => response.json())
      .then((comments) => {
        const deletePromises = comments.map((comment) =>
          fetch(`http://localhost:3000/comments/${comment.id}`, {
            method: "DELETE",
          })
        );
        return Promise.all(deletePromises);
      })
      .then(() => {
        console.log(
          `All comments with postId=${postIdToDelete} have been deleted.`
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

  const handleAddPost = async (title) => {
    const postBody = {
      userId: currentUser.id,
      title: title.title,
      body: title.content,
    };
    let response = await fetch(`http://localhost:3000/posts/`, {
      method: "POST",
      body: JSON.stringify(postBody),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setPosts((prev) => {
      return [...prev, response];
    });
  };

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((data) => data.json())
      .then((data) => {
        setPosts(data);
        setQueryPosts(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="add-btns">
        <button className="add-post" onClick={handleOpenModal}>
          New Post
        </button>
        <input
          type="text"
          placeholder="Search"
          onInput={(e) => {
            setQueryPosts(
              posts.filter((el) => el.body.includes(e.target.value.trim()))
            );
          }}
          className="search-query"
        />
      </div>

      <AddPostModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddPost}
      />
      <div className="posts-container">
        {queryPosts.map((post, index) => (
          <MinimizedPost
            currentUser={currentUser}
            key={index}
            user={post.userId}
            title={post.title}
            body={post.body}
            postId={post.id}
            removePost={() => removePost(post.id)}
          />
        ))}
      </div>
    </>
  );
}
