import { StyleSheet, View } from "react-native";
import { useAssets } from "expo-asset";
import { useEffect, useRef, useState } from "react";

import { Canvas, useFrame } from "@react-three/fiber/native";
import { loadGLTFAsync } from "./rn-three-utils";

const Spinner = (props) => {
  const meshRef = useRef(null);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((_state, delta) => (meshRef.current.rotation.x += delta));

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 2 : 1}
      onClick={() => setActive((value) => !value)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "red"} />
    </mesh>
  );
};

const Model = ({ object }) => {
  const meshRef = useRef(null);

  useFrame((_state, delta) => {
    meshRef.current.rotation.y += delta / 2;
    meshRef.current.rotation.z += delta / 2;
  });

  return (
    <mesh ref={meshRef}>
      <primitive object={object} />
    </mesh>
  );
};

export const SceneWithR2D2Model = () => {
  const [assets, error] = useAssets([
    require("../../../assets/3dmodels/Buggy.glb"),
  ]);
  const [obj, setObj] = useState(null);

  useEffect(() => {
    if (error) {
      console.error("assets not loaded", error);
    }
  }, [error]);

  useEffect(() => {
    if (assets) {
      loadGLTFAsync({ asset: assets[0] }).then((gltf) => {
        console.info("gltf.scene", Object.keys(gltf.scene));
        gltf.scene.scale.set(0.03, 0.03, 0.03);
        setObj(gltf.scene);
      });
    }
  }, [assets]);

  return (
    <View style={styles.container}>
      <Canvas style={styles.canvas}>
        <perspectiveCamera makeDefault position={[0, 0, 50]} />
        <ambientLight intensity={1} />
        <directionalLight
          key="keyLight"
          color="#ffbf80"
          position={[-100, 0, 100]}
          intensity={1}
        />
        <directionalLight
          key="fillLight"
          color="#8080ff"
          position={[100, 0, 100]}
          intensity={0.75}
        />
        <directionalLight
          key="backLight"
          color="#ffffff"
          position={[100, 100, 100]}
          intensity={1}
        />

        {obj ? <Model object={obj} /> : <Spinner />}
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    borderWidth: 1,
    borderColor: "green",
  },
  canvas: {
    flex: 1,
    backgroundColor: "black",
    width: "100%",
  },
});
