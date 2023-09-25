import { useAtomValue } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { useCallback, useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import { NicknameStore } from '../../store';
import { socket } from '../../library/socket-io/socket';

export default function App() {
  const nickname = useAtomValue(NicknameStore.nickname);
  const nicknameInputRef = useRef(null);

  const onChangeNickname = useAtomCallback<void, [React.ChangeEvent<HTMLInputElement>]>(
    useCallback((get, set, event) => {
      set(NicknameStore.nickname, event.target.value);
    }, []),
  );

  useEffect(() => {
    if (nickname) socket.emit('setNickname', nickname);
  }, [nickname]);

  return (
    <div className="App">
      <div
        css={css`
          height: 30px;
        `}
      >
        {nickname}
      </div>
      <hr />
      <input type="text" onChange={onChangeNickname} />
      <button>닉네임 변경</button>
    </div>
  );
}
