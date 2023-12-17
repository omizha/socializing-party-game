import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { UserStore } from '../../../store';
import { Query } from '../../../hook';
import { supabase } from '../../../library/supabase';

interface Props {
  size?: number;
}

export default function AvatarSetter({ size = 150 }: Props) {
  const supabaseSession = useAtomValue(UserStore.supabaseSession);

  const { data, isFetching } = Query.useMyProfile({ supabaseSession });

  const [avatarUrl, setAvatarUrl] = useState(data?.data?.avatar_url);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (avatarUrl) downloadImage(avatarUrl);
  }, [avatarUrl]);

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log('Error downloading image: ', error);
    }
  }

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    try {
      setUploading(true);

      if (!supabaseSession?.user) return;

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const updates = {
        avatar_url: filePath,
        id: supabaseSession.user.id,
        updated_at: new Date(),
      };

      const { error } = await supabase.from('profiles').upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {avatarUrl ? (
        <img src={avatarUrl} alt="Avatar" className="avatar image" style={{ height: size, width: size }} />
      ) : (
        <div className="avatar no-image" style={{ height: size, width: size }} />
      )}
      <div style={{ width: size }}>
        <label className="button primary block" htmlFor="single">
          {uploading ? 'Uploading ...' : 'Upload'}
        </label>
        <input
          style={{
            position: 'absolute',
            visibility: 'hidden',
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  );
}
