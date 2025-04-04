import { useState } from "react";
import { useRegister } from "@/features/auth/model/useAuth"

const RegisterForm = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { mutate, isPending, isError, error } = useRegister(); // Получаем мутацию для регистрации

  const handleRegister = () => {
    mutate({ password, email }); // Вызываем мутацию с данными пользователя
  };
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
        placeholder="Password"
      />
      <button onClick={handleRegister} disabled={isPending}>Register</button>
      {isError && <p>{(error as Error).message}</p>} {/* Отображение ошибки, если она есть */}
    </div>
  );
};

export default RegisterForm;