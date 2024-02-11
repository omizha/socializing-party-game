'use client';

import 'lib-dayjs/locale/ko';

import { useState } from 'react';
import styled from 'styled-components';
import Lottie from 'lottie-react';
import { animated } from '@react-spring/web';
import dayjs from 'lib-dayjs';
import AirpodLottieJson from './104114-airpods.json';

export default function Home() {
  const [isAirpod, setIsAirpod] = useState(false);
  const diff = dayjs('2024-02-23').diff(new Date(), 'd');

  return (
    <main
      style={{
        background: 'black',
        height: '100%',
        width: '100%',
      }}
    >
      {isAirpod ? (
        <>
          <div
            style={{
              backgroundColor: 'black',
              height: '100%',
              opacity: 0.7,
              position: 'absolute',
              width: '100%',
            }}
          >
            <Video autoPlay loop preload="auto" playsInline>
              <source src="bg.mp4" type="video/mp4" />
            </Video>
          </div>
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <TitleSpan>설레는 일상으로 초대할게요 💌</TitleSpan>
            <TitleSpan>D - {diff}</TitleSpan>
          </div>
        </>
      ) : (
        <animated.div
          style={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'center',
          }}
        >
          <Lottie animationData={AirpodLottieJson} autoplay loop style={{ height: '380px' }} />
          <PleaseAirpodSpan>들어가기 전에, 에어팟을 착용해주세요</PleaseAirpodSpan>
          <PlaeseAirpodButton
            onClick={() => {
              setIsAirpod(true);
            }}
          >
            💌
          </PlaeseAirpodButton>
        </animated.div>
      )}
      {/* <BlackCover /> */}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
    </main>
  );
}

const Video = styled.video`
  position: absolute;
  width: 100%;
  height: 100%;

  // video 기준점 중앙
  object-fit: cover;
`;

const PleaseAirpodSpan = styled.span`
  font-family: 'Pretendard Variable';
  font-weight: 100;
  font-size: 18px;
  color: white;
  margin: 8px;
`;

const PlaeseAirpodButton = styled.button`
  border: 1px solid white;
  background-color: rgba(0, 0, 0, 0);
  border-radius: 4px;
  color: white;
  width: 120px;
  height: 20px;
`;

const TitleSpan = styled.span`
  font-family: 'Pretendard Variable';
  font-weight: 100;
  font-size: 24px;
  color: white;
  margin: 8px;
`;
