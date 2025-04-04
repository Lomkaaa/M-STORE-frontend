
import { Header } from '../header/Header';  // Header из того же widgets
import { Footer } from '../footer/Footer';  // Footer из того же widgets
import { Outlet } from 'react-router-dom';  // Для рендеринга дочерних страниц
import styles from "./layout.module.css"
export const Layout = () => {
  return (
    <div className={styles.container}>
      <Header />
      <main >
        <Outlet/>  
      </main>
      <Footer />
    </div>
  );
};