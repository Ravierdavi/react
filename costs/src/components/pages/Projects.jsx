import { useLocation } from "react-router-dom"
import Message from "../layout/Message"
import LinkButton from "../layout/LinkButton"
import ProjectCard from "../project/ProjectCard"

import styles from "./Projects.module.css"
import { useEffect, useState } from "react"

function Projects() {
    const location = useLocation()
    const [projects, setProjects] = useState([])

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await fetch("http://localhost:5000/projects", {
                method: "Get",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json()
            setProjects(data)
        }
        fetchProjects()
    }, [])

    return (
        <div className={styles.projects_container}>
            <div className={styles.title_container}>
                <h1>Meus projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto" />
            </div>
            {location.state && <Message type="success" msg={location.state} />}
            {
                projects.map((project) => (
                    <ProjectCard id={project.id} name={project.name} budget={project.budget} category={project.category.name} />
                ))
            }
        </div>
    )
}

export default Projects