import React from "react";
import { useAssets } from "expo-asset";
import { loadTextContent } from "~/services/file-service";

export const useHtmlViewerAssets = () => {
  const [assets, error] = useAssets([
    require("../../../assets/3DViewer/viewer.html"),
    require("../../../assets/3DViewer/three.js_"),
    require("../../../assets/3DViewer/OrbitControls.js_"),
    require("../../../assets/3DViewer/GLTFLoader.js_"),
    require("../../../assets/3DViewer/viewer.js_"),
  ]);

  const [isLoading, setIsLoading] = React.useState(true);
  const [html, setHtml] = React.useState("");
  const [injectedJavaScript, setInjectedJavaScript] = React.useState("");

  React.useEffect(() => {
    if (error) {
      console.error("error", error);
    }
  }, [error]);

  React.useEffect(() => {
    const loadFullHtmlDocument = async () => {
      const [assetHtml, ...jsFiles] = assets;

      const { content: html } = await loadTextContent(assetHtml.localUri);

      const jsContent = [];
      for (const jsFile of jsFiles) {
        // console.info("jsFile", jsFile.uri);
        jsContent.push((await loadTextContent(jsFile.localUri)).content);
      }

      setHtml(html);
      setInjectedJavaScript(jsContent.join("\n"));

      setIsLoading(false);
    };

    if (assets?.length > 0) {
      loadFullHtmlDocument();
    }
  }, [assets]);

  return {
    isLoading,
    html,
    injectedJavaScript,
  };
};
