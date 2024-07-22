import React from "react";
import styled from "styled-components";
import Reply from "./Reply";

const ReplyBox = styled.div`
  margin-left: 42px;
  border-left: 1px solid rgb(235, 235, 235);
`;

function ReplyContainer({ replies, commentId }) {
  return (
    <ReplyBox>
      {replies.map((reply) => (
        <React.Fragment key={reply.id}>
          <Reply reply={reply} commentId={commentId} />
        </React.Fragment>
      ))}
    </ReplyBox>
  );
}

export default ReplyContainer;
