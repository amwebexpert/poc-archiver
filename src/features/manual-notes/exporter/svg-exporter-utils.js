import React from "react";
import ReactDOMServer from "react-dom/server";

const isWeb = Platform.OS === "web";

const childToWeb = (child) => {
  const { type, props } = child;
  const name = type && type.displayName;
  const webName = name && name[0].toLowerCase() + name.slice(1);
  const Tag = webName ? webName : type;
  return <Tag {...props}>{toWeb(props.children)}</Tag>;
};

const toWeb = (children) => React.Children.map(children, childToWeb);

export const exportElementAsSVG = (element) => {
  const webJsx = isWeb ? element : toWeb(element);
  return ReactDOMServer.renderToStaticMarkup(webJsx);
};
