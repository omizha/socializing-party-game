export type UserProfile = {
  nickname: string;
  profilePictureUrl: string;
};

export type ReturnUploadAvatar = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  file: Express.Multer.File;
};
