import React from 'react';
import { Query } from '../../../hook';

const RoundSetter = () => {
  const { data: game } = Query.Game.useGame();
  const { mutateAsync: mutateUpdateGame } = Query.Game.useUpdateGame();

  if (!game) return <></>;

  return (
    <>
      <>현재 라운드</>
      <button
        onClick={() => {
          mutateUpdateGame({
            round: game.round - 1,
          });
        }}
      >
        -1
      </button>
      <>{game.round}</>
      <button
        onClick={() => {
          mutateUpdateGame({
            round: game.round + 1,
          });
        }}
      >
        +1
      </button>
    </>
  );
};

export default RoundSetter;
