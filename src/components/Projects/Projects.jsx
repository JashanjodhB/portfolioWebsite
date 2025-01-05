import React from "react";
import styles from "./Projects.module.css";
import skills from "../../data/skills.json";
import projects from "../../data/projects.json";
import { ProjectCard } from "./ProjectCard";



export const Projects = () => {
  return (
    <section className={styles.container} id="projects">
      <h2 className={styles.title}>Projects</h2>
      
      <div className={styles.skills}>
          {skills.map((skill, id) => {
            return (
              <div key={id} className={styles.skill}>
                <div className={styles.skillImageContainer}>
                  <img src={`src/assets/${skill.imageSrc}`} alt={skill.title} className={styles.image} />
                </div>
                <p>{skill.title}</p>
              </div>
            );
          })}
        </div>



      <div className={styles.projects}>{
        projects.map((project,id)=> {
          return (
            <ProjectCard key={id} project={project}/>
          );
        })}
        </div>
    </section>
  );

};
