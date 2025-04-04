
import { Header } from '../header/Header';  
import { Footer } from '../footer/Footer';  
import { Outlet } from 'react-router-dom';  
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