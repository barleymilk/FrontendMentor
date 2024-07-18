import { useState } from "react";
import SendComment from "./UI/SendComment";

function AddComment({ currentUser, setCommentData, commentData }) {
  // 입력 필드(textarea)에 적힌 댓글 내용 -> 상태 관리
  const [commentText, setCommentText] = useState("");

  // 입력 필드에 글자 입력 시 commentText 상태 업데이트
  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  // SEND 버튼 클릭 시 commentData 상태 업데이트
  const handleSendClick = () => {
    if (commentText.trim() === "") return;

    const newComment = {
      id: commentData.length + 1, // 임의의 ID
      content: commentText,
      createdAt: "now",
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
    setCommentText(""); // 입력 필드(textarea) 초기화
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
