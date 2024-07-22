import { createContext, useState } from 'react';
import data from '../data.json';
import { v4 as uuidv4 } from 'uuid';

const CommentContext = createContext();

const CommentProvider = ({ children }) => {
  const { currentUser, comments } = data;
  const [commentData, setCommentData] = useState(comments);

  const handleDeleteComment = (commentId) => {
    const updatedComments = commentData.filter((comment) => comment.id !== commentId);
    setCommentData(updatedComments);
  };

  const handleDeleteReply = (commentId, replyId) => {
    const updatedComments = commentData.map((comment) => {
      if (comment.id === commentId) {
        const updatedReplies = comment.replies.filter((reply) => reply.id !== replyId);
        return { ...comment, replies: updatedReplies };
      }
      return comment;
    });
    setCommentData(updatedComments);
  };

  const handleUpdateComment = (commentId, updatedContent) => {
    const updatedComments = commentData.map((comment) =>
      comment.id === commentId ? { ...comment, content: updatedContent } : comment
    );
    setCommentData(updatedComments);
  };

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

  const handleAddReply = (commentId, replyContent) => {
    const updatedComments = commentData.map((comment) => {
      if (comment.id === commentId) {
        const newReply = {
          id: uuidv4(),
          content: replyContent,
          createdAt: 'now',
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

  const handleAddComment = (commentContent) => {
    const newComment = {
      id: uuidv4(),
      content: commentContent,
      createdAt: 'now',
      score: 0,
      user: {
        image: {
          png: currentUser.image.png,
          webp: currentUser.image.webp,
        },
        username: currentUser.username,
      },
      replies: [],
    };
    setCommentData([...commentData, newComment]);
  };

  const handleIncrement = (commentId, replyId = null) => {
    const updatedComments = commentData.map((comment) => {
      if (comment.id === commentId) {
        if (replyId) {
          const updatedReplies = comment.replies.map((reply) =>
            reply.id === replyId ? { ...reply, score: reply.score + 1 } : reply
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

  const handleDecrement = (commentId, replyId = null) => {
    const updatedComments = commentData.map((comment) => {
      if (comment.id === commentId) {
        if (replyId) {
          const updatedReplies = comment.replies.map((reply) =>
            reply.id === replyId ? { ...reply, score: reply.score - 1 } : reply
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
    <CommentContext.Provider
      value={{
        currentUser,
        commentData,
        handleDeleteComment,
        handleDeleteReply,
        handleUpdateComment,
        handleUpdateReply,
        handleAddReply,
        handleAddComment,
        handleIncrement,
        handleDecrement,
        setCommentData,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export { CommentContext, CommentProvider };
