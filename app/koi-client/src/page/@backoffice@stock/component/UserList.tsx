import React from 'react';
import { Query } from '../../../hook';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface UserListProps {
  stockId: string;
}

const UserList: React.FC<UserListProps> = ({ stockId }) => {
  const { data: users } = Query.Stock.useUserList(stockId);

  const { mutateAsync: mutateRemoveUser } = Query.Stock.useRemoveUser();
  const { mutateAsync: mutateSetUser } = Query.Stock.useSetUser();

  return (
    <>
      <input
        placeholder="초기화할 유저 닉네임"
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            mutateSetUser({
              inventory: {},
              lastActivityTime: new Date(),
              money: 1000000,
              nickname: event.currentTarget.value,
            });
          }
        }}
      />
      <table>
        <thead>
          <tr>
            <td>
              <div>참가자 {users?.length}명</div>
            </td>
            {users?.map((user) => (
              <td key={user.nickname}>
                <button
                  onClick={() => {
                    mutateRemoveUser(user.nickname);
                  }}
                >
                  {user.nickname}
                </button>
              </td>
            ))}
          </tr>
        </thead>
      </table>
    </>
  );
};

export default UserList;
