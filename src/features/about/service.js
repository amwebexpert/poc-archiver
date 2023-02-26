import LICENCES from "../../../assets/licenses.json";

const numberRegex = /\d+(\.\d+)*/;
const atRegex = /(?:@)/gi;

export const parseLicenceData = () => {
  const licencesArray = [];

  for (const [id, licence] of Object.entries(LICENCES)) {
    const version = id.match(numberRegex);

    // Removes the part after the @
    const nameWithoutVersion = id
      .replace(atRegex, "")
      .replace(version ? version[0] : "", "");

    licencesArray.push({
      title: nameWithoutVersion,
      version: version ? version[0] : "",
      licenceType : licence.licenses,
      repository: licence.repository,
      licenseUrl: licence.licenseUrl,
    });
  }

  return licencesArray;
};
