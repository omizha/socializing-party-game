import { useQuery } from '@tanstack/react-query';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../../../library/supabase';
import { Query } from '../..';

interface Props {
  supabaseSession: Session | null;
}

const useQueryAvatarUrl = ({ supabaseSession }: Props) => {
  const { data: profile } = Query.Supabase.useMyProfile({ supabaseSession });
  console.debug('🚀 ~ file: useQueryAvatarUrl.tsx:12 ~ useQueryAvatarUrl ~ profile:', profile);

  const { data, isFetching } = useQuery({
    enabled: !!profile?.data?.avatar_url,
    queryFn: async () => {
      const result = await supabase.storage.from('avatars').download(profile?.data?.avatar_url);
      if (result.error) {
        throw result.error;
      }

      return URL.createObjectURL(result.data);
    },
    queryKey: ['useQueryAvatarUrl', supabaseSession?.user.id],
  });
  console.debug('🚀 ~ file: useQueryAvatarUrl.tsx:26 ~ useQueryAvatarUrl ~ data:', data);

  return { data, isFetching };
};

export default useQueryAvatarUrl;
