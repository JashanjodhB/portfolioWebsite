import React from 'react';
import styles from "./Contact.module.css";

export const Contact = () => {
  return (
    <footer id='contact' className={styles.container}>
      <div className={styles.text}>
        <h2 >Contact</h2>
        <p>Reach out to me through any of following:</p>
      </div>
      <ul className={styles.links}>
        <li className={styles.link}>
          <img src='src/assets/contact/emailIcon.png' alt='Email Icon'/>
          <a href='mailto:jashanjodhb@gmail.com'>jashanjodhb@gmail.com</a>
        </li>
        <li className={styles.link}>
          <img src='src/assets/contact/linkedinIcon.png' alt='LinkedIn Icon'/>
          <a href='https://www.linkedin.com/in/jashanjodh-bajwa-31894231b'>https://www.linkedin.com/in/jashanjodh-bajwa-31894231b</a>
        </li>
        <li className={styles.link}>
          <img src='src/assets/contact/githubIcon.png' alt='Github Icon'/>
          <a href='https://github.com/JashanjodhB'>https://github.com/JashanjodhB</a>
        </li>
      </ul>
    </footer>
  );
};
