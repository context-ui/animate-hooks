import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { usePrevious } from "../common/utils";

function Queue(props) {
  const queueRef = useRef(null);
  const [count, setCount] = useState(0);

  // 上一状态的count
  const preCount = usePrevious(count);

  // 每个item delay的时间间隔
  const deltaDelay = (props.duration || 400) / count;

  // 动画属性
  const itemAnimation = [
    { opacity: 0, transform: "translateX(-40%)" },
    { opacity: 1, transform: "translateX(0%)" }
  ];

  // 正向动画配置项
  const animationSettings = {
    delay: +props.delay || 0,
    duration: +props.duration || 500,
    fill: "both"
  };

  // 逆向动画配置项
  const reverseAnimationSettings = {
    ...animationSettings,
    direction: "reverse"
  };

  /**
   * @description 触发动画
   * @param {动画配置项} animationSettings
   */
  const triggerAnimation = animationSettings => {
    const queueList = queueRef.current.querySelector(props.components);
    new Array(count).fill(0).forEach((item, index) => {
      queueList.children[index].animate(itemAnimation, {
        ...animationSettings,
        delay: deltaDelay * index
      });
    });
  };

  // 进场动画
  const animateIn = () => {
    triggerAnimation(animationSettings);
  };
  // 离场动画
  const animateOut = () => {
    triggerAnimation(reverseAnimationSettings);
  };

  useEffect(() => {
    const queueList = queueRef.current.querySelector(props.components);
    const count = queueList.children ? queueList.children.length : 0;
    setCount(count);
  });

  useLayoutEffect(() => {
    if (props.components) {
      const queueList = queueRef.current.querySelector(props.components)
        .children;
      if (queueList && queueList.length > 0) {
        if (preCount > count) {
          animateOut();
        } else {
          animateIn();
        }
      } else {
        animateOut();
      }
    }
  }, [count]);
  return <div ref={queueRef}>{props.children}</div>;
}

export default React.memo(Queue);
