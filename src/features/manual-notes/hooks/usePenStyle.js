import { useCallback, useState } from "react";

export const usePenStyle = () => {
  const [penStyle, setPenStyle] = useState({
    strokeColor: "red",
    strokeWidth: 1,
  });

  const setStrokeColor = useCallback((color = "black") => {
    setPenStyle((prev) => ({ ...prev, strokeColor: color }));
  }, []);

  const setStrokeWidth = useCallback((width = 1) => {
    setPenStyle((prev) => ({ ...prev, strokeWidth: width }));
  }, []);

  return {
    penStyle,
    setStrokeColor,
    setStrokeWidth,
  };
};
