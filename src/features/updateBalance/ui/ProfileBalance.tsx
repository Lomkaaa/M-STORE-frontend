import { useState } from "react";
import { useUpdateBalance } from "../model/useUpdateBalance";
import styles from "./ProfileBalance.module.css";
import { FaCreditCard, FaMoneyBillWave } from "react-icons/fa";

export const ProfileBalance = ({ currentBalance }: { currentBalance: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [error, setError] = useState("");
  const { mutate: updateBalance, isPending } = useUpdateBalance();

  const handleDeposit = () => {
    setError("");
    const depositAmount = Number(amount);
    if (!depositAmount || depositAmount <= 0) {
      setError("Введите корректную сумму");
      return;
    }

    setTimeout(() => {
      const isSuccess = Math.random() > 0.2; // 80% вероятность успеха
      if (isSuccess) {
        updateBalance(depositAmount);
        setAmount("");
        setIsOpen(false);
      } else {
        setError("Ошибка платежа. Попробуйте снова.");
      }
    }, 1500);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.balance}>Баланс: <span>{currentBalance} ₽</span></h3>
      
      <button className={styles.openButton} onClick={() => setIsOpen(true)}>
        Пополнить баланс
      </button>

      {isOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Пополнение баланса</h2>

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Введите сумму"
              className={styles.input}
              disabled={isPending}
            />
            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.paymentMethods}>
              <button 
                className={`${styles.paymentButton} ${paymentMethod === "card" ? styles.active : ""}`} 
                onClick={() => setPaymentMethod("card")}
                disabled={isPending}
              >
                <FaCreditCard /> Карта
              </button>
              <button 
                className={`${styles.paymentButton} ${paymentMethod === "yoomoney" ? styles.active : ""}`} 
                onClick={() => setPaymentMethod("yoomoney")}
                disabled={isPending}
              >
                <FaMoneyBillWave /> ЮMoney
              </button>
            </div>

            <button 
              className={styles.confirmButton} 
              onClick={handleDeposit} 
              disabled={isPending}
            >
              {isPending ? "Обрабатываем..." : "Пополнить"}
            </button>

            <button className={styles.closeButton} onClick={() => setIsOpen(false)} disabled={isPending}>
              Отмена
            </button>
          </div>
        </div>
      )}
    </div>
  );
};