import React, { useState, useRef, useEffect, useCallback } from "react";
import { ModalContainer, Overlay, ModalContent, CloseButton } from "./style";

/**
 * 弹窗组件
 */
function Modal(props) {
  const [visible, setVisible] = useState(props.visible || false);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  const contentAnimation = [
    { opacity: 0, transform: "translateY(-30%)" },
    { opacity: 1, transform: "translateY(-50%)" }
  ];
  const overlayAnimation = [{ opacity: 0 }, { opacity: 0.3 }];
  const animationSettings = { duration: 150, fill: "both" };
  const reverseAnimationSettings = {
    ...animationSettings,
    direction: "reverse"
  };

  const animateIn = useCallback(() => {
    contentRef.current.animate(contentAnimation, animationSettings);
    overlayRef.current.animate(overlayAnimation, animationSettings);
    setVisible(true);
  }, [animationSettings, overlayAnimation, contentAnimation]);

  const animateOut = useCallback(async () => {
    await Promise.all([
      contentRef.current.animate(contentAnimation, reverseAnimationSettings)
        .finished,
      overlayRef.current.animate(overlayAnimation, reverseAnimationSettings)
        .finished
    ]);
    setVisible(false);
  }, [contentAnimation, overlayAnimation, reverseAnimationSettings]);

  // 关闭弹窗
  const onCancel = () => {
    props.onCancel && props.onCancel();
  };

  useEffect(() => {
    if (props.visible) {
      animateIn();
    } else {
      animateOut();
    }
  }, [props.visible, animateIn, animateOut]);

  return (
    <ModalContainer>
      <div hidden={!visible}>
        <Overlay ref={overlayRef} onClick={onCancel} />
        <ModalContent ref={contentRef}>
          {props.children}
          <CloseButton onClick={onCancel}>×</CloseButton>
        </ModalContent>
      </div>
    </ModalContainer>
  );
}

export default Modal;
