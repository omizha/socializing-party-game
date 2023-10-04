import styled from '@emotion/styled';
import { useAtomValue } from 'jotai';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Physics, useSphere } from '@react-three/cannon';
import { Environment } from '@react-three/drei';
import { Suspense } from 'react';
import { SocketStore } from '../../../../store';
import Clump from './Clump';

function Pointer() {
  const viewport = useThree((state) => state.viewport);
  const [, api] = useSphere(() => ({ args: [3], position: [0, 0, 0], type: 'Kinematic' }));
  return useFrame((state) =>
    api.position.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0),
  );
}

const CurrentUserList = () => {
  const userList = useAtomValue(SocketStore.userList);

  return (
    <Container>
      {/* {userList.map((userProfile) => {
        return (
          <div key={`${userProfile.nickname}_${userProfile.profilePictureUrl}`}>
            <AvatarImage src={userProfile.profilePictureUrl} alt="profile" />
            <div>{userProfile.nickname}</div>
          </div>
        );
      })} */}
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
        {/* <EffectComposer disableNormalPass multisampling={0}> */}
        {/* <N8AO halfRes color="black" aoRadius={2} intensity={1} aoSamples={6} denoiseSamples={4} /> */}
        {/* <SMAA /> */}
        {/* </EffectComposer> */}
      </Canvas>
    </Container>
  );
};

const Container = styled.div`
  background-color: #eeeeee;
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const AvatarImage = styled.img`
  width: 100px;
  height: 100px;
`;

export default CurrentUserList;
