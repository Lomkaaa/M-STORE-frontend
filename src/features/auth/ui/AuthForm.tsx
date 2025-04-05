import { useEffect, useState } from "react";
import { useLogin, useRegister } from "@/features/auth/model/useAuth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "@/entities/auth/model/authSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./authForm.module.css";
import { RegisterCredentials } from "../api/authApi";


const schema = yup.object().shape({
  email: yup.string().email("Некорректный email").required("Введите email"),
  password: yup.string().min(4, "Минимум 4 символов").required("Введите пароль"),
});

export const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState(""); 
  const [messageOkey, setMessageOkey] = useState(""); 
  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setMessage("");
    setMessageOkey("");
  }, [isLogin]);


  const onSubmit = async (data: RegisterCredentials) => {
    try {
      if (isLogin) {
        const response = await loginMutation.mutateAsync(data);
        dispatch(login({ token: response.token }));
        navigate("/")
      } else {
        const response = await registerMutation.mutateAsync(data);
        dispatch(login({ token: response.token }));
        setMessageOkey("Регистрация успешна!"); 
        setTimeout(() => {
          setMessageOkey("")
          navigate("/login")
        }, 2000); 
      }
      reset();
    } catch (error: any) {
      setMessage(error?.response?.data?.message || "Ошибка входа/регистрации");
    }
  };
  return (
    <div className={styles.authContainer}>
       <div className={styles.storeText}>STORE</div>
      <div className={styles.form}>
        <h2>{isLogin ? "Вход" : "Регистрация"}</h2>
        {message && <p className={styles.success}>{message}</p>}
        {messageOkey && <p className={styles.successOkey}>{messageOkey}</p>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="email" placeholder="Email" {...register("email")} />
          <p className={styles.error}>{errors.email?.message}</p>

          <input type="password" placeholder="Пароль" {...register("password")} />
          <p className={styles.error}>{errors.password?.message}</p>

          <button
            className={styles.formButton}
            type="submit"
            disabled={loginMutation.isPending || registerMutation.isPending}
          >
            {isLogin ? "Войти" : "Зарегистрироваться"}
          </button>
        </form>

        <p>
          {isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}
          <button
            className={styles.switch}
            onClick={() => {
              setIsLogin(!isLogin);
              reset()
              navigate(isLogin ? "/register" : "/login");
            }}
          >
            {isLogin ? "Регистрация" : "Войти"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;