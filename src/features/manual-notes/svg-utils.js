import { XMLParser } from "fast-xml-parser";
import * as fileService from "~/services/file-service";

const DEFAULT_XML_PARSER_OPTIONS = {
  ignoreAttributes: false,
  ignoreDeclaration: true,
  ignorePiTags: true,
  removeNSPrefix: true,
};

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
const pathXmlElementDeserializer = (path) => ({
  type: "path",
  path: path["@_d"],
  color: path["@_color"],
  width: path["@_width"],
});

export const SVG_ELEMENTS = new Map([
  [
    "path",
    {
      serializationMapper: pathElementMapper,
      xmlDeserializationMapper: pathXmlElementDeserializer,
      serializer: pathElementSerializer,
    },
  ],
]);

export const toSvgContent = ({ elements = [] }) => {
  const internalElementsContent = elements.map((element) => SVG_ELEMENTS.get(element.type).serializer(element));

  return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    ${internalElementsContent.join("\n")}
  </svg>`;
};

export const exportAsSvg = async ({ elements = [], fileUri = "" }) => {
  const xml = toSvgContent({ elements });
  await fileService.saveTextContent({ fileUri, text: xml });
  fileService.shareFile(fileUri);
};

export const importSvg = async () => {
  const { exists, uri } = await fileService.pickSingleFile({
    type: ["text/xml", "image/svg+xml"],
    copyToCacheDirectory: true,
  });

  if (!exists) {
    return;
  }

  const { content } = await fileService.loadTextContent(uri);
  const parser = new XMLParser(DEFAULT_XML_PARSER_OPTIONS);
  const result = parser.parse(content);

  const paths = result.svg.path.map(SVG_ELEMENTS.get("path").xmlDeserializationMapper);

  return [...paths]; // TODO: other elements ...circles, ...lines, ...texts...
};
