import { useMutation } from '@tanstack/react-query';
import { UserSchema } from 'shared~type-stock';

const useSetUser = () => {
  const { mutateAsync } = useMutation<UserSchema[], unknown, UserSchema>(
    ['game', 'setUser'],
    async (user: UserSchema) => {
      const response = await fetch('http://localhost:3000/game/user', {
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });

      return response.json();
    },
  );

  return { mutateAsync };
};

export default useSetUser;
