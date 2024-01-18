import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../../library/supabase';

const useQueryProfile = () => {
  const { data, isFetching, refetch } = useQuery({
    queryFn: async () => {
      const result = await supabase.from('profiles').select(`id, username, gender, avatar_url`);

      return result;
    },
    queryKey: ['useQueryProfile'],
  });

  return { data, isFetching, refetch };
};

export default useQueryProfile;
