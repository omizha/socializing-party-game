import { Query } from '..';

const useUser = (nickname: string) => {
  const { data } = Query.useUserList();

  return { user: data?.find((user) => user.nickname === nickname) };
};

export default useUser;
