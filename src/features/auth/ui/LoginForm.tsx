import { useState } from "react";
import { useLogin } from "@/features/auth/model/useAuth"
import { useNavigate } from "react-router-dom";
import { login } from "@/entities/auth/model/authSlice";
import { useDispatch } from "react-redux";


const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLogin();

  const handleLogin = async () => {
    try {
      const response = await loginMutation.mutateAsync({ email, password });

      // После успешного логина сохраняем токен и userId в Redux
      dispatch(login({ token: response.token}));

      // Перенаправляем на профиль
      navigate("/profile"); // Переходим на страницу профиля
    } catch (error) {
      console.error("Ошибка входа:", error);
    }
  };
  console.log(email,password)
  return (
    <div>
       <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Пароль"
      />
      <button onClick={handleLogin} disabled={loginMutation.isPending}>
        Войти
      </button>
      {loginMutation.error && <p>{loginMutation.error.message}</p>}
    </div>
  );

  
};

export default LoginForm;