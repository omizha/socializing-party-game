import { useMutation } from '@tanstack/react-query';

const useRemoveUser = () => {
  const { mutateAsync } = useMutation<void, unknown, string>(['game', 'removeUser'], async (nickname) => {
    const response = await fetch(`http://localhost:3000/game/user?nickname=${nickname}`, {
      method: 'DELETE',
    });

    return response.json();
  });

  return { mutateAsync };
};

export default useRemoveUser;
