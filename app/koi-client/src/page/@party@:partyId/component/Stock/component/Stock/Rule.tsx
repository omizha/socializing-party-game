import styled from '@emotion/styled';
import { Query } from '../../../../hook';

const Rule = () => {
  const { data: game } = Query.Game.useGame();
  const { data: users } = Query.useUserList();

  return (
    <>
      <Line>1. 다른 사람에게 자신의 휴대폰 화면을 보여줄 수 없습니다</Line>
      <Line>2. 다른 플레이어들이 보유하고 있는 주식과 현금은 공개되지 않습니다</Line>
      <Line>3. 한 회사의 주식은 최대 {Math.floor(users.length - 1)}개 까지만 보유할 수 있습니다</Line>
      <Line>4. 플레이어들끼리의 주식이나 돈거래는 불가능합니다</Line>
      <Line>5. 거래(사기/팔기)를 한 번 하면 {game?.transactionInterval}초 동안 거래를 할 수 없습니다</Line>
      <Line>6. 각 회사마다 총 {users.length * 2 - 1}개의 주식이 판매됩니다</Line>
      <Line>7. 모든 주식은 한 번에 최대 (현재 가격 / 2)원 만큼 내려갈 수 있습니다</Line>
      <Line>8. 모든 주식은 한 번에 (현재 가격 / 2)원 만큼, 최대 5만원까지 올라갈 수 있습니다</Line>
    </>
  );
};

const Line = styled.div`
  margin-bottom: 24px;
`;

export default Rule;
