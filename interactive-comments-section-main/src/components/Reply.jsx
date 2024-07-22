import { useState, useContext } from "react";
import { CommentContext } from "../context/CommentContext";
import ViewComment from "./UI/ViewComment";
import SendComment from "./UI/SendComment";

function Reply({ reply, commentId }) {
  const { currentUser, handleDeleteReply, handleUpdateReply, handleAddReply, handleIncrement, handleDecrement } = useContext(CommentContext);
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(reply.content);
  const [replyMode, setReplyMode] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const handleDeleteClick = () => {
    handleDeleteReply(commentId, reply.id);
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleUpdateClick = () => {
    handleUpdateReply(commentId, reply.id, editedContent);
    setEditMode(false);
  };

  const handleReplyClick = () => {
    setReplyMode(true);
  };

  const handleReplyChange = (e) => {
    setReplyContent(e.target.value);
  };

  const handleReplySubmit = () => {
    handleAddReply(commentId, replyContent);
    setReplyContent("");
    setReplyMode(false);
  };

  const handleIncrementScore = () => {
    handleIncrement(commentId, reply.id);
  };

  const handleDecrementScore = () => {
    handleDecrement(commentId, reply.id);
  };

  return (
    <>
      <ViewComment
        comment={reply}
        username={currentUser.username}
        handleDeleteClick={handleDeleteClick}
        handleEditClick={handleEditClick}
        handleReplyClick={handleReplyClick}
        isEdit={editMode}
        editedContent={editedContent}
        setEditedContent={setEditedContent}
        handleUpdateClick={handleUpdateClick}
        isReply={true}
        onIncrement={handleIncrementScore}
        onDecrement={handleDecrementScore}
      />
      {replyMode && (
        <SendComment
          imgPath={currentUser.image.webp}
          commentText={replyContent}
          handleCommentChange={handleReplyChange}
          handleSendClick={handleReplySubmit}
          isReply={true}
        />
      )}
    </>
  );
}

export default Reply;
