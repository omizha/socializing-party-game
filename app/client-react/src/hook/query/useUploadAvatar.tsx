import { useMutation } from '@tanstack/react-query';
import { Response } from 'shared~type';

const useUploadAvatar = () => {
  const { mutateAsync, isLoading } = useMutation<Response.UploadAvatar, unknown, FormData>(async (formData) => {
    const response = await fetch('http://localhost:3000/user/avatar', {
      body: formData,
      method: 'POST',
    });

    return response.json();
  });

  return { isLoading, mutateAsync };
};

export default useUploadAvatar;
