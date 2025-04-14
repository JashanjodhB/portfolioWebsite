import React from 'react'
import styles from "./About.module.css"
import { faBook,faServer, faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const About = () => {
  return (
    <section className={styles.container} id='about'>
        <h2 className={styles.title}>About</h2>
        <div className={styles.content}>
            <img className={styles.aboutImage} src={"/aboutImage.png"} alt='A picture of me' />

            <ul className={styles.aboutItems}>
                <li className={styles.aboutItem}>
                    <FontAwesomeIcon icon={faGraduationCap} className={styles.icons}/>
                    <div className={styles.aboutItemText}>
                        <h3>Student Researcher</h3>
                        <p>I am currently a freshman at Texas A&M University studying computer science and working in the AGGIES Lab.</p>
                    </div>
                </li>
                <li className={styles.aboutItem}>
                    <FontAwesomeIcon icon={faServer} className={styles.icons}/>
                    <div className={styles.aboutItemText}>
                        <h3>Interests</h3>
                        <p>I'm currently intrested mainly in the areas of cybersecurity and data science.</p>
                    </div>
                </li>
                <li className={styles.aboutItem}>
                    <FontAwesomeIcon icon={faBook} className={styles.icons}/>
                    <div className={styles.aboutItemText}>
                        <h3>Hobbies</h3>
                        <p>Some of my current hobbies are reading, playing music, playing video games,and playing basketball.</p>
                    </div>
                </li>
            </ul>
        </div>
    </section>
  )
}
