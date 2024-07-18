import React from "react";
import styled from "styled-components";
import Reply from "./Reply";

const ReplyBox = styled.div`
  margin-left: 42px;
  border-left: 1px solid rgb(235, 235, 235);
`;

function ReplyContainer({
  currentUser,
  replies,
  username,
  commentId,
  onDelete,
  onUpdateReply,
  onAddReply,
  onIncrement,
  onDecrement,
}) {
  return (
    <ReplyBox>
      {replies.map((reply) => (
        <React.Fragment key={reply.id}>
          <Reply
            currentUser={currentUser}
            reply={reply}
            username={username}
            commentId={commentId}
            onDelete={onDelete}
            onUpdateReply={onUpdateReply}
            onAddReply={onAddReply}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
          />
        </React.Fragment>
      ))}
    </ReplyBox>
  );
}

export default ReplyContainer;
