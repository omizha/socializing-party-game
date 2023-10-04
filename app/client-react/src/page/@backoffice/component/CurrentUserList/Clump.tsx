import * as THREE from 'three';
import { Sphere, useTexture } from '@react-three/drei';
import { useSphere } from '@react-three/cannon';
import { useFrame } from '@react-three/fiber';

const { randFloatSpread } = THREE.MathUtils;
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const baubleMaterial = new THREE.MeshStandardMaterial({ color: 'white', envMapIntensity: 1, roughness: 0 });

interface Props {
  mat?: THREE.Matrix4;
  vec?: THREE.Vector3;
}

function Clump({ mat = new THREE.Matrix4(), vec = new THREE.Vector3() }: Props) {
  const texture = useTexture('/default-avatar.png');
  const [ref, api] = useSphere<
    THREE.Mesh<
      THREE.BufferGeometry<THREE.NormalBufferAttributes>,
      THREE.Material | THREE.Material[],
      THREE.Object3DEventMap
    >
  >(() => ({
    angularDamping: 0.1,
    args: [1],
    linearDamping: 0.65,
    mass: 1,
    position: [randFloatSpread(20), randFloatSpread(20), randFloatSpread(20)],
  }));
  useFrame((state) => {
    if (!ref.current) return;

    // Normalize the position and multiply by a negative force.
    // This is enough to drive it towards the center-point.
    api.applyForce(vec.setFromMatrixPosition(ref.current.matrix).normalize().multiplyScalar(0).toArray(), [0, 0, 0]);
  });
  return (
    <Sphere
      ref={ref}
      castShadow
      receiveShadow
      geometry={sphereGeometry}
      material={baubleMaterial}
      material-map={texture}
    />
  );
}

export default Clump;
