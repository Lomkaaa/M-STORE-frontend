import { LogoutButton } from "@/shared/ui/LogoutButton";
import  {useAuthStatus} from "@/features/auth/model/useAuthStatus"

const ProfilePage = () => {
  const { userId, isAuthenticated } = useAuthStatus();

  if (!isAuthenticated) {
    return <p>Вы не авторизованы</p>;
  }

  return (
    <div>
      <h1>Личный кабинет</h1>
      <p>ID пользователя: {userId}</p>
      <LogoutButton/>
    </div>
  );
};

export default ProfilePage;
