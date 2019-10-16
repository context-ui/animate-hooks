import React, {
  useState,
  useMemo,
  useEffect,
  useLayoutEffect,
  useCallback,
  useRef
} from "react";
import ReactDOM from "react-dom";
import "web-animations-js/web-animations-next-lite.min";
import "./styles.css";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { Queue } from "./Queue";
import { Tween } from "./Tween";

// 弹窗动画
function ModalAnimation() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <div>
      <Modal
        visible={modalVisible}
        onCancel={() => setModalVisible(!modalVisible)}
      >
        <div>
          <p>弹窗组件动画测试</p>
          <p>基于React Hooks+Web Animation API搭建的动画方案</p>
        </div>
      </Modal>
      <div>
        <p>1.弹窗动画</p>
        <Button onClick={() => setModalVisible(!modalVisible)}>打开弹窗</Button>
      </div>
    </div>
  );
}

// 队列动画
function QueueAnimation() {
  const [queueAnime, setQueueAnime] = useState(true);

  return (
    <div>
      <p>队列动画</p>
      <Button onClick={() => setQueueAnime(!queueAnime)}>切换</Button>
      {/* <Button onClick={() => setQueueAnime(!queueAnime)}>新增</Button>
        <Button onClick={() => setQueueAnime(!queueAnime)}>删除</Button> */}
      <Queue components="ul" delay="100" duration="400">
        {queueAnime ? (
          <ul className="queue-list">
            <li key="1">1</li>
            <li key="2">2</li>
            <li key="3">3</li>
            <li key="4">4</li>
          </ul>
        ) : (
          <ul className="queue-list">
            <li key="1">1</li>
            <li key="2">2</li>
            <li key="3">3</li>
          </ul>
        )}
      </Queue>
    </div>
  );
}
const keyframes = [
  { transform: "translate3d(-100px,0,0)" },
  { transform: "translate3d(-70px,0,0)", offset: 0.2 },
  { transform: "translate3d(-50px, 0px, 0)", offset: 0.4 },
  { transform: "translate3d(-30px, 0px, 0)", offset: 0.43 },
  { transform: "translate3d(30px,0,0)", offset: 0.53 },
  { transform: "translate3d(50px,0px,0)", offset: 0.7 },
  { transform: "translate3d(70px,0,0)", offset: 0.8 },
  { transform: "translate3d(90px,0,0)", offset: 0.9 },
  { transform: "translate3d(100px,0,0)" }
];
const settings = {
  id: "anime",
  duration: 1000,
  delay: 0,
  fill: "both",
  easing: "ease",
  direction: "alternate",
  iterations: Infinity
};
// bounce动画
function TweenAnimation() {
  const [pause, setPause] = useState(true);
  const [reverse, setReverse] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  const handleRestart = () => {
    setPause(false);
    setReverse(false);
  };

  const handleReverse = () => {
    setReverse(!reverse);
    setPause(false);
  };

  const handlePlaybackRate = playbackRate => {
    setPlaybackRate(playbackRate);
    setPause(false);
  };
  return (
    <div>
      <p>单个元素动画</p>
      <p>
        <Button onClick={() => setPause(false)}>Play</Button>
        <Button onClick={() => setPause(true)}>Pause</Button>
        <Button onClick={handleReverse}>Reverse</Button>
        <Button onClick={handleRestart}>Restart</Button>
      </p>
      <p>
        <Button onClick={handlePlaybackRate.bind(null, 0.5)}>0.5X</Button>
        <Button onClick={handlePlaybackRate.bind(null, 1)}>1X</Button>
        <Button onClick={handlePlaybackRate.bind(null, 2)}>2X</Button>
        <Button onClick={handlePlaybackRate.bind(null, 3)}>3X</Button>
      </p>
      <Tween
        keyframes={keyframes}
        settings={settings}
        pause={pause}
        reverse={reverse}
        playbackRate={playbackRate}
      >
        {/* <div className="bounce-text">Thie is a test bouncing</div> */}
        <div className="tween-box" />
      </Tween>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <ModalAnimation />
      <QueueAnimation />
      <TweenAnimation />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
