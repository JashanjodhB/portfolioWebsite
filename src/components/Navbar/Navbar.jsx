import styles from "./Navbar.module.css";
import { navLinks } from "../../data/profile";

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.menuItems}>
        {navLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
