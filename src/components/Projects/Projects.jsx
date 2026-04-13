import styles from "./Projects.module.css";
import projects from "../../data/projects.json";
import { ProjectCard } from "./ProjectCard";
import { techGroups } from "../../data/profile";

export const Projects = () => {
  const projectTools = techGroups.slice(0, 2).flatMap((group) => group.items);

  return (
    <section className={styles.container} id="projects">
      <div className={styles.header}>
        <p className={styles.eyebrow}>Selected Work</p>
        <h2 className={styles.title}>Projects with clear technical outcomes.</h2>
      </div>

      <div className={styles.toolbox}>
        {projectTools.map((tool) => (
          <span key={tool}>{tool}</span>
        ))}
      </div>

      <div className={styles.projects}>
        {projects.map((project) => {
          return <ProjectCard key={project.title} project={project} />;
        })}
      </div>
    </section>
  );
};
