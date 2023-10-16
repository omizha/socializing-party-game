import { stock } from 'shared~config';
import React from 'react';
import styled from '@emotion/styled';
import { commaizeNumber } from '@toss/utils';
import prependZero from '../../../service/prependZero';
import { POV } from '../../../type';
import { Query } from '../../../hook';

interface Props {
  elapsedTime: Date;
  pov: POV;
}

const Table = ({ elapsedTime, pov }: Props) => {
  const { data: game } = Query.useGame();
  const { data: users } = Query.useUsers();

  if (!game?.companies) {
    return <></>;
  }

  const { companies, remainingStocks } = game;
  const companyNames = Object.keys(companies) as stock.CompanyNames[];

  return (
    <Wrapper>
      <TableElement>
        <thead>
          <tr>
            <Td rowSpan={2}>게임시각</Td>
            {companyNames.map((company) => (
              <Td colSpan={3} key={company}>
                {company}
              </Td>
            ))}
          </tr>
          <tr>
            {companyNames.map((company) => (
              <React.Fragment key={company}>
                <Td>등락</Td>
                <Td>가격</Td>
                <Td>정보</Td>
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 10 }, (_, idx) => {
            return (
              <tr key={idx}>
                <Td>{`${prependZero(idx * 5, 2)}분`}</Td>
                {companyNames.map((key) => {
                  const company = key as stock.CompanyNames;
                  const diff = idx === 0 ? 0 : companies[company][idx].가격 - companies[company][idx - 1].가격;
                  const 등락 = diff > 0 ? `${Math.abs(diff)}▲` : diff < 0 ? `${Math.abs(diff)}▼` : '-';
                  const 정보 = companies[company][idx].정보.join('/');

                  if (elapsedTime.getMinutes() >= idx * 5 || pov === 'host') {
                    return (
                      <React.Fragment key={company}>
                        <Td>{commaizeNumber(등락)}</Td>
                        <Td key={company}>{commaizeNumber(companies[company as stock.CompanyNames][idx]?.가격)}</Td>
                        <Td>{pov === 'host' ? 정보 : '.'}</Td>
                      </React.Fragment>
                    );
                  }

                  return (
                    <React.Fragment key={company}>
                      <Td>?</Td>
                      <Td key={company}>?</Td>
                      <Td>.</Td>
                    </React.Fragment>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </TableElement>

      <TableElement>
        <thead>
          <tr>
            <Td>잔여주식</Td>
            {companyNames.map((company) => (
              <Td key={company}>{company}</Td>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <Td>시장</Td>
            {companyNames.map((company) => (
              <Td key={company}>{remainingStocks[company]}</Td>
            ))}
          </tr>
          {users.map((user) => {
            return (
              <tr key={user.nickname}>
                <Td>{user.nickname}</Td>
                {companyNames.map((company) => {
                  return <Td key={company}>{user.inventory[company] ?? ''}</Td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </TableElement>

      <TableElement>
        <thead>
          <tr>
            <Td>소지금</Td>
            {users.map((user) => {
              return <Td key={user.nickname}>{user.nickname}</Td>;
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            <Td />
            {users.map((user) => {
              return <Td key={user.nickname}>{commaizeNumber(user.money)}</Td>;
            })}
          </tr>
        </tbody>
      </TableElement>

      {/* <TableElement>
        <thead>
          <tr>
            <Td rowSpan={2}>회사</Td>
            {users.map((user) => (
              <Td colSpan={3} key={user.nickname}>
                {user.nickname}
              </Td>
            ))}
          </tr>
          <tr>
            {users.map((user) => (
              <React.Fragment key={user.nickname}>
                <Td>소지금액</Td>
                <Td>팔고난후금액</Td>
                <Td>팔고난후수익률</Td>
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {companyNames.map((company) => {
            return (
              <tr key={company}>
                <Td>{company}</Td>
                {users.map((user) => {
                  return (
                    <React.Fragment key={user.nickname}>
                      <Td>{commaizeNumber(user.money)}</Td>
                      <Td />
                      <Td />
                    </React.Fragment>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </TableElement> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 20px;
  width: 80%;
  overflow-x: scroll;
  gap: 20px;

  display: flex;
  flex-direction: column;
`;

const TableElement = styled.table`
  width: 100%;
`;

const Td = styled.td`
  border: 1px solid black;
  padding: 10px;

  /* 1줄 텍스트 */
  white-space: nowrap;
`;

export default Table;
