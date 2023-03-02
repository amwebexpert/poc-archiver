import { XMLParser } from "fast-xml-parser";
import * as fileService from "~/services/file-service";
import { sample_svg_data } from "./data";

export const buildSvgPath = (coordinates = []) => {
  "worklet";

  if (!coordinates?.length > 0) {
    return "";
  }

  const [firstCoord, ...rest] = coordinates;
  const pathStart = `M ${firstCoord.x},${firstCoord.y}`;

  const path = rest.reduce((acc, { x, y }) => {
    return `${acc} L ${x},${y}`;
  }, pathStart);

  return path;
};

const pathElementMapper = ({ path = "", color = "red", width = 3 }) => ({
  type: "path",
  path,
  color,
  width,
});

const pathElementSerializer = ({ path, color, width }) =>
  `<path d="${path}" stroke="${color}" stroke-width="${width}" fill="none" />`;

export const SVG_ELEMENTS = new Map([
  [
    "path",
    {
      mapper: pathElementMapper,
      serializer: pathElementSerializer,
    },
  ],
]);

export const toSvgContent = ({ elements = [] }) => {
  const internalElementsContent = elements.map((element) =>
    SVG_ELEMENTS.get(element.type).serializer(element)
  );

  return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    ${internalElementsContent.join("\n")}
  </svg>`;
};

export const exportAsSvg = async ({ elements = [], fileUri = "" }) => {
  const xml = toSvgContent({ elements });
  await fileService.saveTextContent({ fileUri, text: xml });
  fileService.shareFile(fileUri);
};

export const importSvg = () => {
  const xml = sample_svg_data;

  const options = {
    ignoreAttributes: false,
    ignoreDeclaration: true,
    ignorePiTags: true,
    removeNSPrefix: true,
  };
  const parser = new XMLParser(options);
  const result = parser.parse(xml);

  const paths = result.svg.path.map((path) => ({
    type: "path",
    path: path["@_d"],
    color: path["@_color"],
    width: path["@_width"],
  }));
  //console.log("SVG paths", paths);

  return paths;
};
