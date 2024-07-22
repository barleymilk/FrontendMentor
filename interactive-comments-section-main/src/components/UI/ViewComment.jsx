import styled from "styled-components";
import VoteButton from "./VoteButton";
import { ReactComponent as ReplyIcon } from "../../assets/icons/icon-reply.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/icon-edit.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/icon-delete.svg";

const CommentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  background-color: #fff;
  width: ${(props) => (props.$isReply ? "556px" : "640px")};
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  margin-left: ${(props) => (props.$isReply ? "42px" : "0px")};
  line-height: 1.6;
`;

const CommentContent = styled.div`
  flex: 1;
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const UserImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 16px;
`;

const Username = styled.span`
  font-weight: bold;
  margin-right: 8px;
`;

const YouLabel = styled.span`
  background-color: hsl(238, 40%, 52%);
  color: white;
  border-radius: 5px;
  padding: 0 8px;
  margin-right: 16px;
`;

const TimeAgo = styled.span`
  color: #888;
  margin-right: auto;
`;

const CommentText = styled.p`
  margin: 0;
  color: #555;
  white-space: pre-wrap;
`;

const TextareaContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Textarea = styled.textarea`
  height: 100px;
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

const DeleteButton = styled.button`
  all: unset;
  color: hsl(358, 79%, 66%);
  font-weight: bold;
  margin-left: 16px;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: hsl(357, 100%, 86%);
  }
  &:hover svg {
    fill: hsl(357, 100%, 86%);
  }
`;

const EditButton = styled.button`
  all: unset;
  color: hsl(238, 40%, 52%);
  font-weight: bold;
  margin-left: 16px;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: hsl(239, 57%, 85%);
  }
  &:hover svg {
    fill: hsl(239, 57%, 85%);
  }
`;

const UpdateButton = styled.button`
  all: unset;
  cursor: pointer;
  width: 120px;
  height: 40px;
  border-radius: 10px;
  background-color: hsl(238, 40%, 52%);
  color: white;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
  transition: background-color 0.3s;
  margin-left: auto;
  &:hover {
    background-color: hsl(239, 57%, 85%);
  }
`;

const StyledReplyIcon = styled(ReplyIcon)`
  fill: hsl(238, 40%, 52%);
  transition: fill 0.3s;
`;

const StyledEditIcon = styled(EditIcon)`
  fill: hsl(238, 40%, 52%);
  transition: fill 0.3s;
`;

const StyledDeleteIcon = styled(DeleteIcon)`
  fill: hsl(358, 79%, 66%);
  transition: fill 0.3s;
`;

function ViewComment({
  comment,
  username,
  handleDeleteClick,
  handleEditClick,
  handleReplyClick,
  isEdit = false,
  editedContent,
  setEditedContent,
  handleUpdateClick,
  isReply = false,
  onIncrement,
  onDecrement,
}) {
  return (
    <CommentContainer $isReply={isReply}>
      <VoteButton
        score={comment.score}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
      />
      <CommentContent>
        <CommentHeader>
          <UserImage src={comment.user.image.webp} alt="user image" />
          <Username>{comment.user.username}</Username>
          {username === comment.user.username && <YouLabel>you</YouLabel>}
          <TimeAgo>{comment.createdAt}</TimeAgo>
          {username === comment.user.username && (
            <DeleteButton onClick={handleDeleteClick}>
              <StyledDeleteIcon /> Delete
            </DeleteButton>
          )}
          {username === comment.user.username && (
            <EditButton onClick={handleEditClick}>
              <StyledEditIcon /> Edit
            </EditButton>
          )}
          {username !== comment.user.username && (
            <EditButton onClick={handleReplyClick}>
              <StyledReplyIcon /> Reply
            </EditButton>
          )}
        </CommentHeader>
        {isEdit ? (
          <TextareaContainer>
            <Textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <UpdateButton onClick={handleUpdateClick}>UPDATE</UpdateButton>
          </TextareaContainer>
        ) : (
          <CommentText>{comment.content}</CommentText>
        )}
      </CommentContent>
    </CommentContainer>
  );
}

export default ViewComment;
