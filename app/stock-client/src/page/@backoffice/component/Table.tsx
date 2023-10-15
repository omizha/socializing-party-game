import { stock } from 'shared~config';
import { CompanyInfo } from 'shared~type-stock';
import React, { useState } from 'react';
import prependZero from '../../../service/prependZero';
import { POV } from '../../../type';

interface Props {
  elapsedTime: Date;
  pov: POV;
}

const Table = ({ elapsedTime, pov }: Props) => {
  const [playerLength, setPlayerLength] = useState<number>(29);

  const [players, setPlayers] = useState<string[]>(() => {
    const newPlayers = [...Array(playerLength).keys()].map((v) => `${v}`);
    // newPlayers.sort(() => Math.random() - 0.5);
    return newPlayers;
  });

  const [companies, setCompanies] = useState<Record<stock.CompanyNames, CompanyInfo[]>>(() => {
    const newCompanies = {} as Record<stock.CompanyNames, CompanyInfo[]>;
    const playerIdxs = [...Array(playerLength).keys()];
    const randomPlayers = [...playerIdxs, ...playerIdxs, ...playerIdxs].sort(() => Math.random() - 0.5);
    const companyPriceChange: string[][] = [[]];
    // 1:00 ~ 1:45
    for (let i = 1; i < 10; i++) {
      companyPriceChange[i] = [...stock.getRandomCompanyNames(Math.ceil(playerLength / 3))];
    }

    Object.keys(stock.getRandomCompanyNames()).forEach((key) => {
      const company = key as stock.CompanyNames;
      // 1:00 ~ 1:45
      for (let i = 0; i < 10; i++) {
        if (!newCompanies[company]) {
          newCompanies[company] = [];
        }

        if (i === 0) {
          newCompanies[company][0] = {
            가격: 1000,
            정보: [],
          };
        } else {
          const isChange = companyPriceChange[i].some((v) => v === key);
          const prevPrice = newCompanies[company][i - 1].가격;
          const price = isChange ? prevPrice + (Math.floor(Math.random() * 20) - 10) * 100 : prevPrice;
          const info = [];

          if (isChange) {
            const infoPlayerIdx = randomPlayers.pop();
            if (infoPlayerIdx !== undefined) {
              const partnerPlayerIdx = infoPlayerIdx === playerLength - 1 ? 0 : infoPlayerIdx + 1;
              info.push(players[infoPlayerIdx], players[partnerPlayerIdx]);
            }
          }

          newCompanies[company][i] = {
            가격: price,
            정보: info,
          };
        }
      }
    });
    return newCompanies;
  });

  return (
    <table>
      <thead>
        <tr>
          <td rowSpan={2}>게임시각</td>
          {Object.keys(companies).map((company) => (
            <td colSpan={3} key={company}>
              {company}
            </td>
          ))}
        </tr>
        <tr>
          {Object.keys(companies).map((company) => (
            <React.Fragment key={company}>
              <td>등락</td>
              <td>가격</td>
              <td>정보</td>
            </React.Fragment>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 10 }, (_, idx) => {
          return (
            <tr key={idx}>
              <td>{`${prependZero(idx * 5, 2)}분`}</td>
              {Object.keys(companies).map((key) => {
                const company = key as stock.CompanyNames;
                const diff = idx === 0 ? 0 : companies[company][idx].가격 - companies[company][idx - 1].가격;
                const 등락 = diff > 0 ? `${Math.abs(diff)}▲` : diff < 0 ? `${Math.abs(diff)}▼` : '-';
                const 정보 = companies[company][idx].정보.join('/');

                if (elapsedTime.getMinutes() >= idx * 5 || pov === 'host') {
                  return (
                    <React.Fragment key={company}>
                      <td>{등락}</td>
                      <td key={company}>{companies[company as stock.CompanyNames][idx]?.가격}</td>
                      <td>{pov === 'host' ? 정보 : '.'}</td>
                    </React.Fragment>
                  );
                }

                return (
                  <React.Fragment key={company}>
                    <td>?</td>
                    <td key={company}>?</td>
                    <td>.</td>
                  </React.Fragment>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
