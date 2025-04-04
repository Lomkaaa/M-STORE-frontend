import { BASE_URL } from "@/shared/config/api";


interface ProfileAvatarProps {
  avatar?: string;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ avatar }) => {
  const avatarSrc = avatar ? BASE_URL + avatar : "/default-avatar.png";

  return <img  src={avatarSrc} alt="Аватар" width={150} height={150} />;
};

export default ProfileAvatar;
