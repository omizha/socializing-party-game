import { useQuery } from '@tanstack/react-query';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../../../library/supabase';
import { Query } from '../..';

interface Props {
  supabaseSession: Session | null;
}

const useQueryAvatarUrl = ({ supabaseSession }: Props) => {
  const { data: profile, refetch } = Query.Supabase.useMyProfile({ supabaseSession });

  const { data, isFetching } = useQuery({
    enabled: !!profile?.data?.avatar_url,
    queryFn: async () => {
      const result = await supabase.storage.from('avatars').download(profile?.data?.avatar_url);
      if (result.error) {
        throw result.error;
      }

      return URL.createObjectURL(result.data);
    },
    queryKey: ['useQueryAvatarUrl', supabaseSession?.user.id, profile?.data?.avatar_url],
  });

  return { data, isFetching, refetch };
};

export default useQueryAvatarUrl;
