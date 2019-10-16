import React from "react";
import { ButtonWrapper } from "./style";

/**
 * 弹窗组件
 */
export const Button = props => {
  return (
    <ButtonWrapper onClick={props.onClick}>{props.children}</ButtonWrapper>
  );
};
