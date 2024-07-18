import styled from "styled-components";
import { ReactComponent as PlusIcon } from "../../assets/icons/icon-plus.svg";
import { ReactComponent as MinusIcon } from "../../assets/icons/icon-minus.svg";

const VoteSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
  background-color: hsl(228, 33%, 97%);
  width: 40px;
  border-radius: 10px;
`;

const VoteCount = styled.span`
  color: hsl(238, 40%, 52%);
  margin: 5px 0;
  font-weight: bold;
`;

const VoteButtonStyled = styled.button`
  all: unset;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  border-radius: 4px;
  padding: 5px;
  &:hover svg {
    fill: #7879F1;
  }
`;

const StyledPlusIcon = styled(PlusIcon)`
  fill: #C5C6EF;
  transition: fill 0.3s;
`;

const StyledMinusIcon = styled(MinusIcon)`
  fill: #C5C6EF;
  transition: fill 0.3s;
`;

function VoteButton({ score, onIncrement, onDecrement }) {
  return (
    <VoteSection>
      <VoteButtonStyled onClick={onIncrement}>
        <StyledPlusIcon />
      </VoteButtonStyled>
      <VoteCount>{score}</VoteCount>
      <VoteButtonStyled onClick={onDecrement}>
        <StyledMinusIcon />
      </VoteButtonStyled>
    </VoteSection>
  );
}

export default VoteButton;
