export type UserProfile = {
  nickname: string;
  profilePictureUrl: string;
};

export type ReturnUploadAvatar = {
  file: Express.Multer.File;
}