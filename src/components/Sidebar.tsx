import AppNav from '../pages/AppNav'
import styles from './Sidebar.module.css'
import Logo from '../components/Logo';
import { Outlet } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo/>
      <AppNav/>
      <Outlet/>
      <footer className={styles.footer}>
        <p> Copyright &copy; {new Date().getFullYear()} Inc.</p>
      </footer>
    
    </div>
  )
}

export default Sidebar