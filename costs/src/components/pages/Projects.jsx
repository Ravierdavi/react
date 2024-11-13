import { useLocation } from "react-router-dom"
import Message from "../layout/Message"
import LinkButton from "../layout/LinkButton"
import ProjectCard from "../project/ProjectCard"

import styles from "./Projects.module.css"
import { useEffect, useState } from "react"
import Loading from "../layout/Loading"

function Projects() {
    const location = useLocation()
    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState("")

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
            setRemoveLoading(true)
        }

        fetchProjects()
    }, [])

    async function removeProject(id) {
        if (projectMessage === "") {
            try {
                await fetch((`http://localhost:5000/projects/${id}`), {
                    method: "DELETE"
                })
                setProjects((p) => p.filter((project) => project.id !== id))
                setProjectMessage("Projeto removido com sucesso!")
                setTimeout(() => {
                    location.state = ""
                    setProjectMessage("")
                }, 3000)
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <div className={styles.projects_container}>
            <div className={styles.title_container}>
                <h1>Meus projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto" />
            </div>
            {location.state && !projectMessage && <Message type="success" msg={location.state} />}
            {projectMessage && <Message type="success" msg={projectMessage} />}
            {
                projects.map((project) => (
                    <ProjectCard id={project.id} key={project.id} name={project.name} budget={project.budget} category={project.category.name} handleRemove={removeProject} />
                ))
            }
            {!removeLoading && <Loading />}
            {removeLoading && projects.length === 0 && (
                <p>Não há projetos cadastrados!</p>
            )}
        </div>
    )
}

export default Projects