import { useState, useEffect } from "react";
import styles from "./scrollToTopButton.module.css"; 
import { FaArrowUp } from "react-icons/fa"

export const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`${styles.scrollToTopButton} ${visible ? styles.visible : ""}`}
    >
      {<FaArrowUp/>}
    </button>
  );
};

export default ScrollToTopButton;