import styled from "@emotion/styled";
import { primaryColor } from "../common/style";

const ButtonWrapper = styled.button`
  width: auto;
  height: 28px;
  margin: 0 5px;
  padding: 0 10px;
  line-height: 28px;
  border-radius: 3px;
  background-color: ${primaryColor};
  color: #fff;
  border: none;
  cursor: pointer;
  outline: none;
  &:hover {
    opacity: 0.8;
  }
`;

export { ButtonWrapper };
