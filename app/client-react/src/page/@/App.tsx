import { useAtomValue } from 'jotai';
import { useAtomCallback } from 'jotai/utils'
import { NicknameStore } from '../../store';
import { useCallback, useEffect } from 'react';
import { socket } from '../../library/socket-io/socket';

export default function App() {
  const nickname = useAtomValue(NicknameStore.nickname)

  const onChangeNickname = useAtomCallback<void, [React.ChangeEvent<HTMLInputElement>]>(useCallback((get, set, event) => {
    set(NicknameStore.nickname, event.target.value)
  }, []))

  useEffect(() => {
    socket.emit('setNickname', nickname)
  }, [nickname])

  return (
    <div className="App">
      <span>{nickname}</span>
      <hr />
      <input type="text" onChange={onChangeNickname} />
    </div>
  );
}