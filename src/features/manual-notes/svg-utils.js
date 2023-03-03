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

const pathElementSerializer = ({ d = "", id = 0, strokeColor = "black", strokeWidth = 1 }) =>
  `<path id="${id}" d="${d}" stroke="${strokeColor}" stroke-width="${strokeWidth}" fill="none" />`;
const pathXmlElementDeserializer = (path = {}) => ({
  type: "path",
  d: path["@_d"],
  id: path["@_id"],
  strokeColor: path["@_stroke"],
  strokeWidth: path["@_stroke-width"],
});

export const SVG_ELEMENTS = new Map([
  [
    "path",
    {
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

  // TODO preserveOrder: true. c.f. https://github.com/NaturalIntelligence/fast-xml-parser/blob/master/docs/v4/2.XMLparseOptions.md
  // TODO: other elements ...circles, ...lines, ...texts...
  const paths = result.svg.path.map(SVG_ELEMENTS.get("path").xmlDeserializationMapper);
  const elements = [...paths];

  setupElementsId(elements);
  return elements;
};

const setupElementsId = (elements = []) => {
  let i = 1;

  elements.forEach((element) => {
    if (!!element.id) {
      element.id = `${i++}`;
    }
  });

  return elements;
};
