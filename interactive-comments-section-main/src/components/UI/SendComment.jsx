import styled from "styled-components";

const CommentBox = styled.div`
  width: ${(props) => (props.$isReply ? "556px" : "640px")};
  height: 124px;
  line-height: 1.6;
  display: flex;
  align-items: flex-start;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 20px;
  margin-left: ${(props) => (props.$isReply ? "42px" : "0px")};
`;

const UserImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 16px;
`;

const Textarea = styled.textarea`
  width: 456px;
  height: 100px;
  margin-right: 16px;
  resize: none;
  border: 1px solid rgb(235, 235, 235);
  border-radius: 8px;
  padding: 10px;
  font-family: inherit;
  font-size: 14px;
  &:focus {
    border-color: hsl(238, 40%, 52%);
    outline: none;
  }
`;

const SendButton = styled.button`
  all: unset;
  cursor: pointer;
  width: 120px;
  height: 40px;
  border-radius: 10px;
  background-color: hsl(238, 40%, 52%);
  color: white;
  font-weight: bold;
  text-align: center;
  transition: background-color 0.3s;
  &:hover {
    background-color: hsl(239, 57%, 85%);
  }
`;

function SendComment({
  imgPath,
  commentText,
  handleCommentChange,
  handleSendClick,
  isReply = false,
}) {
  return (
    <CommentBox $isReply={isReply}>
      <UserImage src={imgPath} alt="user image" />
      <Textarea
        placeholder="Add a comment..."
        value={commentText}
        onChange={handleCommentChange}
      ></Textarea>
      <SendButton onClick={handleSendClick}>SEND</SendButton>
    </CommentBox>
  );
}

export default SendComment;
