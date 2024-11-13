import { useNavigate } from "react-router-dom"
import ProjectForm from "../project/ProjectForm"
import styles from "./NewProject.module.css"

function NewProject() {
    const navigate = useNavigate()

    const createPost = async (project) => {
        try {
            // Initialize cost and services
            project.cost = 0
            project.services = []

            const response = await fetch("http://localhost:5000/projects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(project)
            });
            const data = await response.json();
            
            // redirect
            navigate("/projects", { state: "Projeto criado com sucesso!" })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className={styles.newproject_container}>
            <h1>Novo Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços.</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto" />
        </div>
    )
}

export default NewProject