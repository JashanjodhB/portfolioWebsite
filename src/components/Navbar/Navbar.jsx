import React, {useState} from 'react'
import styles from "./Navbar.module.css";

export const Navbar = () => {
    const[menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
        
        <a href='/'>
          <img  className={styles.logo} src='/logo.svg' />
        </a>
        <div className={styles.menu}>

        <img
          className={styles.menuBtn}
          src={
            menuOpen
            ? "/closeIcon.png"
            : "/menuIcon.png"
            
          }
          alt="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        />

            <ul className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`} onClick={() => setMenuOpen(false)}>
                <li>
                    <a href='#about'>About</a>
                </li>
                <li>
                    <a href='#projects'>Projects</a>
                </li>
                <li>
                    <a href='#contact'>Contact</a>
                </li>
                
            </ul>
        </div>
    </nav>
  );
};
