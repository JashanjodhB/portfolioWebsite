import React from 'react'
import styles from "./About.module.css"
import { faBook,faServer, faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const About = () => {
  return (
    <section className={styles.container} id='about'>
        <h2 className={styles.title}>About</h2>
        <div className={styles.content}>
            <img className={styles.aboutImage} src='../../assets/about/aboutImage.png' alt='A picture of me' />

            <ul className={styles.aboutItems}>
                <li className={styles.aboutItem}>
                    <FontAwesomeIcon icon={faGraduationCap} className={styles.icons}/>
                    <div className={styles.aboutItemText}>
                        <h3>Student</h3>
                        <p>I am currently a freshman at Texas A&M University planning on studying computer science.</p>
                    </div>
                </li>
                <li className={styles.aboutItem}>
                    <FontAwesomeIcon icon={faServer} className={styles.icons}/>
                    <div className={styles.aboutItemText}>
                        <h3>Interests</h3>
                        <p>I'm currently intrested mainly in the areas cybersecurity and data science.</p>
                    </div>
                </li>
                <li className={styles.aboutItem}>
                    <FontAwesomeIcon icon={faBook} className={styles.icons}/>
                    <div className={styles.aboutItemText}>
                        <h3>Hobbies</h3>
                        <p>Some of my hobbies include video games, reading fantasy/Sci-fi, playing music, and going on walks.</p>
                    </div>
                </li>
            </ul>
        </div>
    </section>
  )
}
