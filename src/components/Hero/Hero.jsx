import React from 'react'
import styles from "./Hero.module.css"
import Typewriter from '../Typewriter';

export const Hero = () => {
  return (
    <section className={styles.container}>
    <div className={styles.content}>
        <h1 className={styles.text}>
          <Typewriter text="Hi, I'm Jashan!" delay={50}  />
        </h1>
        <p className={styles.description}>
            I'm a computer science student at Texas A&M University in College Station,Texas.
        </p>
        <a className= {styles.contactBtn} href='#contact'>Contact Me</a>
    </div>
    <img className={styles.heroImg} src={"/heroImage.png"} alt='Image of me'/>
    <div className={styles.topBlur}/>
    <div className={styles.bottomblur}/>

  </section>
  );
};
