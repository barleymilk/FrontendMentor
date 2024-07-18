import { useState } from "react";
import ViewComment from "./UI/ViewComment";
import SendComment from "./UI/SendComment";

function Comment({
  currentUser,
  comment,
  username,
  onDelete,
  onUpdateComment,
  onAddReply,
  onIncrement, 
  onDecrement,
}) {
  // edit 상태, reply 상태 관리
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [replyMode, setReplyMode] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  // Delete 버튼 클릭 시
  const handleDeleteClick = () => {
    onDelete(comment.id);
  };

  // Edit 버튼 클릭 시 -> editMode 활성화
  const handleEditClick = () => {
    setEditMode(true);
  };

  // Edit 마친 후
  const handleUpdateClick = () => {
    onUpdateComment(comment.id, editedContent);
    setEditMode(false);
  };

  // Reply 버튼 클릭 시 -> replyMode 활성화
  const handleReplyClick = () => {
    setReplyMode(true);
  };

  // Reply 입력 필드에 글자 입력 시 replyContent 상태 업데이트
  const handleReplyChange = (e) => {
    setReplyContent(e.target.value);
  };

  // Reply 마친 후
  const handleReplySubmit = () => {
    onAddReply(comment.id, replyContent);
    setReplyContent("");
    setReplyMode(false);
  };

  const handleIncrementScore = () => {
    onIncrement(comment.id);
  }
  const handleDecrementScore = () => {
    onDecrement(comment.id);
  }

  return (
    <>
      <ViewComment
        comment={comment}
        username={username}
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
