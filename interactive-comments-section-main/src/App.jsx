import React, { useState } from "react";
import styled from "styled-components";
import "./App.css";
import data from "./data.json";
import AddComment from "./components/AddComment";
import Comment from "./components/Comment";
import ReplyContainer from "./components/ReplyContainer";

const Wrap = styled.div`
  width: 680px;
  margin: 0 auto;
`;

const { currentUser, comments } = data;

function App() {
  // 댓글 리스트 -> 상태 관리
  const [commentData, setCommentData] = useState(comments);

  // 1-1) 댓글 Delete 후 -> 댓글 리스트 업데이트
  const handleDeleteComment = (commentId) => {
    const updatedComments = commentData.filter(
      (comment) => comment.id !== commentId
    );
    setCommentData(updatedComments);
  };

  // 1-2) 답글 Delete 후 -> 댓글 리스트 업데이트
  const handleDeleteReply = (commentId, replyId) => {
    const updatedComments = commentData.map((comment) => {
      if (comment.id === commentId) {
        const updatedReplies = comment.replies.filter(
          (reply) => reply.id !== replyId
        );
        return { ...comment, replies: updatedReplies };
      }
      return comment;
    });
    setCommentData(updatedComments);
  };

  // 2-1) 댓글 Edit 후 -> 댓글 리스트 업데이트
  const handleUpdateComment = (commentId, updatedContent) => {
    const updatedComments = commentData.map((comment) =>
      comment.id === commentId
        ? { ...comment, content: updatedContent }
        : comment
    );
    setCommentData(updatedComments);
  };

  // 2-2) 답글 Edit 후 -> 댓글 리스트 업데이트
  const handleUpdateReply = (commentId, replyId, updatedContent) => {
    const updatedComments = commentData.map((comment) => {
      if (comment.id === commentId) {
        const updatedReplies = comment.replies.map((reply) =>
          reply.id === replyId ? { ...reply, content: updatedContent } : reply
        );
        return { ...comment, replies: updatedReplies };
      }
      return comment;
    });
    setCommentData(updatedComments);
  };

  // 3-1) 답글 Reply 후 -> 댓글 리스트 업데이트
  const handleAddReply = (commentId, replyContent) => {
    const updatedComments = commentData.map((comment) => {
      if (comment.id === commentId) {
        const newReply = {
          id: comment.replies.length + 1,
          content: replyContent,
          createdAt: "now",
          score: 0,
          replyingTo: comment.user.username,
          user: {
            image: {
              png: currentUser.image.png,
              webp: currentUser.image.webp,
            },
            username: currentUser.username,
          },
        };
        return { ...comment, replies: [...comment.replies, newReply] };
      }
      return comment;
    });
    setCommentData(updatedComments);
  };

  // 4-1) 댓글 및 답글 Score 증가 후 -> 댓글 리스트 업데이트
  const handleIncrement = (commentId, replyId = null) => {
    const updatedComments = commentData.map((comment) => {
      if (comment.id === commentId) {
        if (replyId) {
          const updatedReplies = comment.replies.map((reply) =>
            reply.id === replyId
              ? { ...reply, score: reply.score + 1 }
              : reply
          );
          return { ...comment, replies: updatedReplies };
        } else {
          return { ...comment, score: comment.score + 1 };
        }
      }
      return comment;
    });
    setCommentData(updatedComments);
  };

  // 4-2) 댓글 및 답글 Score 감소 후 -> 댓글 리스트 업데이트
  const handleDecrement = (commentId, replyId = null) => {
    const updatedComments = commentData.map((comment) => {
      if (comment.id === commentId) {
        if (replyId) {
          const updatedReplies = comment.replies.map((reply) =>
            reply.id === replyId
              ? { ...reply, score: reply.score - 1 }
              : reply
          );
          return { ...comment, replies: updatedReplies };
        } else {
          return { ...comment, score: comment.score - 1 };
        }
      }
      return comment;
    });
    setCommentData(updatedComments);
  };

  return (
    <>
      <Wrap>
        {commentData.map((comment) => (
          <React.Fragment key={comment.id}>
            <Comment
              currentUser={currentUser}
              comment={comment}
              username={currentUser.username}
              onDelete={handleDeleteComment}
              onUpdateComment={handleUpdateComment}
              onAddReply={handleAddReply}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
            />
            {comment.replies && (
              <ReplyContainer
                currentUser={currentUser}
                replies={comment.replies}
                username={currentUser.username}
                commentId={comment.id}
                onDelete={handleDeleteReply}
                onUpdateReply={handleUpdateReply}
                onAddReply={handleAddReply}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
              />
            )}
          </React.Fragment>
        ))}
        <AddComment
          currentUser={currentUser}
          setCommentData={setCommentData}
          commentData={commentData}
        />
      </Wrap>
    </>
  );
}

export default App;
