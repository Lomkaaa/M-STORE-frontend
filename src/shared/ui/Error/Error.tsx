import React from "react";
import styles from "./error.module.css";
import { Search } from "lucide-react";

type TextProps = {
    text:string
}

export const Error: React.FC<TextProps>= ({text}) => {
  return (
    <div className={styles.errorWrapper}>
      <div className={styles.errorContent}>
        <Search size={40} className={styles.errorIcon} />
        <span>{text}</span> {/* Сообщение, если корзина пуста */}
      </div>
    </div>
  );
};
