export const htmlDocumentMessage = (message = {}) => {
  const jsonMessage = JSON.stringify(message ?? {});
  return `
      window.onReactNativeMessage('${jsonMessage}');
      true;
    `;
};

export const logHtmlDocumentEvent = ({ type, log }) =>
  console[type](`[webview] ${log}`);
