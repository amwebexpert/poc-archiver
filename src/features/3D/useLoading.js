import { useState } from "react";

export const useLoading = () => {
  const [isProgressVisible, setIsProgressVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const onLoadingModelUpdate = ({ isVisible = false, progress = 0 }) => {
    setIsProgressVisible(isVisible);
    setProgress(progress);
  };

  return {
    isProgressVisible,
    progress,
    onLoadingModelUpdate,
  };
};
