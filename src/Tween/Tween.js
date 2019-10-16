import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
  useMemo
} from "react";

function Tween(props) {
  let timerRef = useRef(null);
  const tweenRef = useRef(null);

  const { keyframes, reverse, settings, pause, playbackRate = 1 } = props;
  const getPlay = useCallback(
    () => {
      let player = tweenRef.current.animate(
        keyframes,
        reverse ? { ...settings, direction: "reverse" } : settings
      );
      timerRef.current = player;
    },
    [keyframes, settings, reverse]
  );

  useEffect(
    () => {
      getPlay();
    },
    [getPlay]
  );

  useEffect(
    () => {
      if (settings && keyframes) {
        // 设置一个动画的播放速度。动画提供了一个比例因子，
        // 将会改变动画timeline和currentTime的变化比率。其初始值为1。
        timerRef.current.playbackRate = playbackRate;
        if (!pause) {
          timerRef.current.play();
        } else {
          timerRef.current.pause();
        }
      }
    },
    [pause, keyframes, settings, reverse, playbackRate]
  );
  // console.log("document.timeline", document.timeline);
  return <div ref={tweenRef}>{props.children}</div>;
}

export default React.memo(Tween);
