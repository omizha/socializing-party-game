import { useMutation } from '@tanstack/react-query';
import { UserSchema } from 'shared~type-koi';
import { serverApiUrl } from '../../config/baseUrl';

const useSetUser = () => {
  const { mutateAsync } = useMutation<UserSchema[], unknown, UserSchema>(
    ['game', 'setUser'],
    async (user: UserSchema) => {
      const response = await fetch(`${serverApiUrl}/game/user`, {
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
