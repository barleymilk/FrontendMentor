import { useState, useContext } from "react";
import { CommentContext } from "../context/CommentContext";
import ViewComment from "./UI/ViewComment";
import SendComment from "./UI/SendComment";

function Comment({ comment }) {
  const { currentUser, handleDeleteComment, handleUpdateComment, handleAddReply, handleIncrement, handleDecrement } = useContext(CommentContext);
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [replyMode, setReplyMode] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const handleDeleteClick = () => {
    handleDeleteComment(comment.id);
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleUpdateClick = () => {
    handleUpdateComment(comment.id, editedContent);
    setEditMode(false);
  };

  const handleReplyClick = () => {
    setReplyMode(true);
  };

  const handleReplyChange = (e) => {
    setReplyContent(e.target.value);
  };

  const handleReplySubmit = () => {
    handleAddReply(comment.id, replyContent);
    setReplyContent("");
    setReplyMode(false);
  };

  const handleIncrementScore = () => {
    handleIncrement(comment.id);
  };

  const handleDecrementScore = () => {
    handleDecrement(comment.id);
  };

  return (
    <>
      <ViewComment
        comment={comment}
        username={currentUser.username}
        handleDeleteClick={handleDeleteClick}
        handleEditClick={handleEditClick}
        handleReplyClick={handleReplyClick}
        isEdit={editMode}
        editedContent={editedContent}
        setEditedContent={setEditedContent}
        handleUpdateClick={handleUpdateClick}
        onIncrement={handleIncrementScore}
        onDecrement={handleDecrementScore}
      />
      {replyMode && (
        <SendComment
          imgPath={currentUser.image.webp}
          commentText={replyContent}
          handleCommentChange={handleReplyChange}
          handleSendClick={handleReplySubmit}
        />
      )}
    </>
  );
}

export default Comment;
