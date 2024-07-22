import { useState, useContext } from "react";
import { CommentContext } from "../context/CommentContext";
import SendComment from "./UI/SendComment";

function AddComment() {
  const { currentUser, handleAddComment } = useContext(CommentContext);
  const [commentText, setCommentText] = useState("");

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleSendClick = () => {
    if (commentText.trim() === "") return;
    handleAddComment(commentText);
    setCommentText("");
  };

  return (
    <SendComment
      imgPath={currentUser.image.webp}
      commentText={commentText}
      handleCommentChange={handleCommentChange}
      handleSendClick={handleSendClick}
    />
  );
}

export default AddComment;
