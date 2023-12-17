import styled from '@emotion/styled';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { UserStore } from '../../store';
import { supabase } from '../../library/supabase';
import { Query } from '../../hook';
import AvatarSetter from './component/AvatarSetter';

export default function App() {
  const supabaseSession = useAtomValue(UserStore.supabaseSession);

  const { data, isFetching } = Query.useMyProfile({ supabaseSession });

  const [loading, setLoading] = useState(isFetching);
  const [username, setUsername] = useState<string>(data?.data?.username);
  const [gender, setGender] = useState<string>(data?.data?.gender);

  useEffect(() => {
    setLoading(isFetching);
    setUsername(data?.data?.username);
    setGender(data?.data?.gender);
  }, [data?.data?.gender, data?.data?.username, isFetching]);

  const updateProfile: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (!supabaseSession) return;

    setLoading(true);

    const { user } = supabaseSession;

    const updates = {
      gender,
      id: user.id,
      updated_at: new Date(),
      username,
    };

    const { error } = await supabase.from('profiles').upsert(updates);

    if (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  if (!supabaseSession) return <></>;

  return (
    <form onSubmit={updateProfile} className="form-widget">
      <AvatarSetter size={150} />
      <div>
        <label htmlFor="email">
          Email
          <input id="email" type="text" value={supabaseSession.user.email} disabled />
        </label>
      </div>
      <div>
        <label htmlFor="username">
          Username
          <input
            id="username"
            type="text"
            required
            value={username || ''}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="gender">
          Gender
          <input id="gender" type="text" value={gender || ''} onChange={(e) => setGender(e.target.value)} />
        </label>
      </div>

      <div>
        <button className="button block primary" type="submit" disabled={loading}>
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <button className="button block" type="button" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>
    </form>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  // box-sizing: border-box;
  // padding: 20px;
`;
