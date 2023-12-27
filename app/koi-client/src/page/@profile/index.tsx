import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { Button, Form, Input, Radio } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserStore } from '../../store';
import { Query } from '../../hook';
import AvatarSetter from './component/AvatarSetter';
import MobileLayout from '../../component-presentation/MobileLayout';
import MainHeader from './component/MainHeader';
import { supabase } from '../../library/supabase';

export default function Profile() {
  const navigate = useNavigate();

  const supabaseSession = useAtomValue(UserStore.supabaseSession);

  const { data, isFetching } = Query.Supabase.useMyProfile({ supabaseSession });

  const [loading, setLoading] = useState(isFetching);
  const [username, setUsername] = useState<string>(data?.data?.username);
  const [gender, setGender] = useState<string>(data?.data?.gender);

  useEffect(() => {
    setLoading(isFetching);
    setUsername(data?.data?.username);
    setGender(data?.data?.gender);
  }, [data?.data?.gender, data?.data?.username, isFetching]);

  if (!supabaseSession) return <></>;

  const updateProfile: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
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

    navigate(-1);
  };

  return (
    <MobileLayout justifyContent="flex-start" HeaderComponent={<MainHeader />}>
      <Form layout="vertical">
        <Form.Item>
          <AvatarSetter />
        </Form.Item>

        <Form.Item required label="닉네임">
          <Input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Item>

        <Form.Item label="성별">
          <Radio.Group value={gender} onChange={(e) => setGender(e.target.value)}>
            <Radio value="M">남성</Radio>
            <Radio value="F">여성</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={loading} onClick={updateProfile}>
            {loading ? 'Loading ...' : '저장'}
          </Button>
        </Form.Item>

        {/* <Form.Item>
          <Button type="primary" htmlType="button" disabled={loading}>
            로그아웃
          </Button>
        </Form.Item> */}
      </Form>
    </MobileLayout>
  );
}
