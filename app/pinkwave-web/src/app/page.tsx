import { css } from '../../styled-system/css';
import { styled } from '../../styled-system/jsx';

export default function Home() {
  const mainService = [
    {
      description: '개인 맞춤형 코칭을 통해 당신만의 시그니처 포트폴리오를 완성하세요.',
      title: '1:1 포트폴리오 코칭 프로그램',
    },
    {
      description: '전문가와의 1:1 상담을 통해 포트폴리오 디자인에 대한 깊이 있는 조언을 얻으세요.',
      title: '포트폴리오 디자인 상담',
    },
    {
      description: '포트폴리오를 더욱 빛나게 만드는 실질적인 코칭 프로그램을 제공합니다.',
      title: '포트폴리오 코칭 판매',
    },
  ];

  const subService = [
    {
      description: '일관된 시각적 아이덴티티로 브랜드 인지도를 높이세요.',
      title: '인스타그램 브랜딩',
    },
    {
      description: '짧고 강렬한 영상 콘텐츠로 팔로워의 관심을 유도하세요.',
      title: '릴스 제작',
    },
    {
      description: '외주와 비즈니스 협력을 위한 네트워킹 기회를 제공합니다.',
      title: '일친자 네트워킹 모임',
    },
  ];

  return (
    <main>
      <ContentSub2Container>
        <div
          className={css({
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '43px',
            height: '100%',
            justifyContent: 'center',
            textAlign: 'center',
            width: '100%',
          })}
        >
          <div
            className={css({
              backgroundColor: 'black',
              height: '100%',
              position: 'absolute',
              width: '100%',
              zIndex: -1,
            })}
          >
            <Video autoPlay loop muted playsInline>
              <source src="video.mp4" type="video/mp4" />
            </Video>
            <div
              className={css({
                backgroundColor: 'black',
                height: '100%',
                opacity: 0.8,
                position: 'absolute',
                width: '100%',
              })}
            />
          </div>
          <h1
            className={css({
              color: '#FFFCFC',
              fontSize: '3.625rem',
              fontWeight: 'bold',
            })}
          >
            나만의 시그니처 포트폴리오를 만드세요.
          </h1>
          <div
            className={css({
              color: '#FFFCFC',
              fontSize: '1.75rem',
              fontWeight: 'normal',
              letterSpacing: '.4px',
              width: '500px',
              wordBreak: 'keep-all',
            })}
          >
            남들과 다른 당신만의 차별화를 만들기 위한 1:1 포트폴리오 코칭 프로그램
          </div>
        </div>
      </ContentSub2Container>
      <ContentWhiteContainer>
        <div
          className={css({
            boxSizing: 'content-box',
            display: 'flex',
            flexDirection: 'column',
            paddingBottom: '5rem',
            paddingTop: '5rem',
            width: '100%',
          })}
        >
          <ServiceContainer>
            {mainService.map((service) => (
              <Box key={service.title}>
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceDescription>{service.description}</ServiceDescription>
              </Box>
            ))}
          </ServiceContainer>

          {/* <ServiceContainer>
            {subService.map((service) => (<Box key={service.title}>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
            </Box>))}
          </ServiceContainer> */}
        </div>
      </ContentWhiteContainer>
    </main>
  );
}

const ContentSub2Container = styled('div', {
  base: {
    alignItems: 'center',

    display: 'flex',
    // backgroundColor: "#FF7B73",
    height: '100vh',
    justifyContent: 'center',
  },
});

const ContentWhiteContainer = styled('div', {
  base: {
    backgroundColor: '#110000',
  },
});

const ServiceContainer = styled('div', {
  base: {
    color: '#FFFCFC',
    display: 'flex',
    gap: '2rem',
    justifyContent: 'center',
    marginTop: '3rem',
  },
});

const Box = styled('div', {
  base: {
    borderRadius: '10px',
    padding: '1rem',
    width: '300px',
  },
});

const ServiceTitle = styled('h2', {
  base: {
    fontSize: '24px',
    fontWeight: 'bold',
    lineHeight: '36px',
    wordBreak: 'keep-all',
  },
});

const ServiceDescription = styled('p', {
  base: {
    fontSize: '16px',
    fontWeight: 'normal',
    lineHeight: '24px',
    marginTop: '1rem',
    wordBreak: 'keep-all',
  },
});

const Video = styled('video', {
  base: {
    height: '100%',
    // video 기준점 중앙
    objectFit: 'cover',

    position: 'absolute',

    width: '100%',
  },
});
