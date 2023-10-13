import { useMutation } from '@tanstack/react-query';
import { UserSchema } from 'shared~type';

const useSetUser = (user: UserSchema) => {
  const { mutateAsync } = useMutation<UserSchema[]>(['game', 'setUser'], async () => {
    const response = await fetch('http://localhost:3000/game/user', {
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    return response.json();
  });

  return { mutateAsync };
};

export default useSetUser;
