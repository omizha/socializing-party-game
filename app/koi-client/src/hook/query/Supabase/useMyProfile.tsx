import { useQuery } from '@tanstack/react-query';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../../../library/supabase';

interface Props {
  supabaseSession: Session | null;
}

const useMyProfile = ({ supabaseSession }: Props) => {
  const { data, isFetching } = useQuery({
    enabled: !!supabaseSession?.user,
    queryFn: async () => {
      const result = await supabase
        .from('profiles')
        .select(`username, gender, avatar_url`)
        .eq('id', supabaseSession?.user.id)
        .single();

      return result;
    },
    queryKey: ['useMyProfile', supabaseSession?.user.id],
  });

  return { data, isFetching };
};

export default useMyProfile;
