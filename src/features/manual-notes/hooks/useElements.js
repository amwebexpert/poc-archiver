import { useCallback, useState } from "react";

export const useElements = () => {
  const [elements, setElements] = useState([]);
  const hasElements = elements.length > 0;

  const addElement = useCallback(
    (element) => {
      setElements((elements) => [...elements, element]);
    },
    [setElements]
  );

  const removeElement = useCallback(
    (id) => {
      setElements((elements) => elements.filter((item) => item.id !== id));
    },
    [setElements]
  );

  const removeLastElement = useCallback(() => {
    setElements((elements) => elements.slice(0, -1));
  }, [setElements]);

  const updateElement = useCallback(
    (newElement) => {
      setElements((elements) => elements.map((item) => (item.id === newElement.id ? newElement : item)));
    },
    [setElements]
  );

  const clearElements = useCallback(() => {
    setElements([]);
  }, [setElements]);

  return {
    elements,
    setElements,
    hasElements,

    addElement,
    removeElement,
    removeLastElement,
    updateElement,
    clearElements,
  };
};
