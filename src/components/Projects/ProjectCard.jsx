import React from 'react'
import styles from "./ProjectCard.module.css"

export const ProjectCard = ( {project : {title,imageSrc,description,skills,link,github},} ) => {
  return (
        <div className={styles.container}>
            <img src={imageSrc} alt={title} className={styles.image} />
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
            <ul className={styles.skills}>
                {skills.map((skill,id) =>{
                    return(
                    <li key={id} className={styles.skill}>{skill}</li>
                    );
                })}
            </ul>
            <div className={styles.links}>
                <a target='_blank' href={github} className={styles.link}>Github</a>
            </div>
        </div>
  )
}
