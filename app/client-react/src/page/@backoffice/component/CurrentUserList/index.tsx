import { useAtomValue } from 'jotai';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import { Environment } from '@react-three/drei';
import { Suspense } from 'react';
import { SocketStore } from '../../../../store';
import Clump from './Clump';
import Pointer from './Pointer';

const CurrentUserList = () => {
  const userList = useAtomValue(SocketStore.userList);

  return (
    <Canvas camera={{ far: 40, fov: 35, near: 1, position: [0, 0, 20] }}>
      <ambientLight intensity={0.5} />
      <Suspense fallback={<></>}>
        <Physics gravity={[0, 2, 0]} iterations={10}>
          <Pointer />
          {userList.map(({ nickname, profilePictureUrl }) => (
            <Clump key={nickname} textureUrl={profilePictureUrl} />
          ))}
        </Physics>
      </Suspense>
      <Environment files="/adamsbridge.hdr" />
    </Canvas>
  );
};

export default CurrentUserList;
