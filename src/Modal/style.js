import styled from "@emotion/styled";

const ModalContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0;
`;

const ModalContent = styled.article`
  position: fixed;
  top: 50%;
  left: 10%;
  background-color: white;
  border-radius: 15px;
  width: 80%;
  max-height: 80%;
  padding: 25px;
  box-sizing: border-box;
  overflow: auto;
`;

const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer;
`;

export { ModalContainer, Overlay, ModalContent, CloseButton };
