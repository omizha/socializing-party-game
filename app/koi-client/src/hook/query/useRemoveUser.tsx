import { useMutation } from '@tanstack/react-query';
import { serverApiUrl } from '../../config/baseUrl';

const useRemoveUser = () => {
  const { mutateAsync } = useMutation<void, unknown, string>(['game', 'removeUser'], async (nickname) => {
    const response = await fetch(`${serverApiUrl}/game/user?nickname=${nickname}`, {
      method: 'DELETE',
    });

    return response.json();
  });

  return { mutateAsync };
};

export default useRemoveUser;
