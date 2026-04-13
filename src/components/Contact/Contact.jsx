import styles from "./Contact.module.css";
import { contactLinks } from "../../data/profile";

export const Contact = () => {
  return (
    <footer id="contact" className={styles.container}>
      <div className={styles.panel}>
        <div className={styles.text}>
          <p className={styles.eyebrow}>Contact</p>
          <h2>Open to internships, research, and engineering roles.</h2>
          <p>I&apos;m especially interested in cybersecurity, machine learning, and systems work.</p>
        </div>

        <ul className={styles.links}>
          {contactLinks.map((link) => (
            <li className={styles.link} key={link.label}>
              <span>{link.label}</span>
              <a className="textLink" target="_blank" rel="noreferrer" href={link.href}>
                {link.value}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};
