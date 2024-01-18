import { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useSearchParams } from 'react-router-dom';

const navItem = ['홈', '사기', '팔기'] as const;
type NavName = (typeof navItem)[number];

const BottomNav = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pressNavItem, setPressNavItem] = useState<NavName>('홈');

  useEffect(() => {
    const page = searchParams.get('page') as NavName;
    setPressNavItem(page);

    if (!navItem.includes(page)) {
      setSearchParams({ page: '홈' });
    }
  }, [searchParams, setSearchParams]);

  /* 각 바텀네비게이션 별 이동하는 페이지 */
  const onClick = useCallback(
    (navItem: NavName) => {
      switch (navItem) {
        case '홈':
          setSearchParams({ page: '홈' });
          break;
        case '사기':
          setSearchParams({ page: '사기' });
          break;
        case '팔기':
          setSearchParams({ page: '팔기' });
          break;
        default:
          setSearchParams({ page: '홈' });
          break;
      }
    },
    [setSearchParams],
  );

  return (
    <Container>
      {navItem.map((navItem) => (
        <ItemWrap key={navItem} onClick={() => onClick(navItem)}>
          <ItemTitle isPressed={pressNavItem === navItem}>{navItem}</ItemTitle>
        </ItemWrap>
      ))}
    </Container>
  );
};

export default BottomNav;

const Container = styled.div`
  position: fixed;
  display: grid;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 56px;
  z-index: 11;
  background: #fff;
  border-top: solid 1px #efefef;
  grid-template-columns: repeat(3, 1fr);
  text-align: center;
  transition: bottom 0.5s;
  transition-timing-function: cubic-bezier(0.5, -0.02, 0, 0.99);

  /* 아이폰 하단바 padding */
  padding-bottom: constant(safe-area-inset-bottom); /* ios 11.1 이하 버전 대응 */
  padding-bottom: env(safe-area-inset-bottom); /* ios 11.2 이상 버전 대응 */
`;

const ItemWrap = styled.button`
  cursor: pointer;
  text-align: center;
  display: block;
`;

const ItemTitle = styled.div<{ isPressed: boolean }>`
  font-size: 12px;
  font-weight: normal;
  line-height: 1.5;
  color: ${({ isPressed }) => (isPressed ? `#444444` : `#a0a0a0`)};
`;
