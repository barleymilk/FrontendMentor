import React, { useContext } from "react";
import styled from "styled-components";
import { CommentContext } from "./context/CommentContext";
import "./App.css";
import AddComment from "./components/AddComment";
import Comment from "./components/Comment";
import ReplyContainer from "./components/ReplyContainer";

const Wrap = styled.div`
  width: 680px;
  margin: 0 auto;
`;

function App() {
  const { commentData } = useContext(CommentContext);

  return (
    <>
      <Wrap>
        {commentData.map((comment) => (
          <React.Fragment key={comment.id}>
            <Comment comment={comment} />
            {comment.replies && <ReplyContainer replies={comment.replies} commentId={comment.id} />}
          </React.Fragment>
        ))}
        <AddComment />
      </Wrap>
    </>
  );
}

export default App;
