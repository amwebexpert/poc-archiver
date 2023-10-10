import { resolveAsync } from "expo-asset-utils";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FileSystem } from "react-native-unimodules";
import { decode } from "base64-arraybuffer";

async function loadFileAsync({ asset, funcName }) {
  if (!asset) {
    throw new Error(`ExpoTHREE.${funcName}: Cannot parse a null asset`);
  }
  return (await resolveAsync(asset)).localUri ?? null;
}

export async function loadGLTFAsync({ asset, onAssetRequested }) {
  const uri = await loadFileAsync({
    asset,
    funcName: "loadGLTFAsync",
  });

  if (!uri) {
    return;
  }

  console.info("Loading GLTF as base64", uri);
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  console.info("Decoding GLTF");
  const arrayBuffer = decode(base64);

  console.info("Parsing GLTF");
  const loader = new GLTFLoader();
  const path = ""; // The base path from which to find subsequent glTF resources such as textures and .bin data files.

  return new Promise((resolve, reject) =>
    // https://threejs.org/docs/#examples/en/loaders/GLTFLoader.parse
    loader.parse(
      arrayBuffer,
      path,
      (result) => resolve(result),
      (err) => reject(err)
    )
  );
}
