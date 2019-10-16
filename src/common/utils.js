/**
 * 公共方法
 */
import { useState, useRef, useEffect, useLayoutEffect } from "react";

// 获取上一个 props
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export { usePrevious };
