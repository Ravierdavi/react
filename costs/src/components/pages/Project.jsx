import styles from "./Project.module.css"

import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

import Loading from "../layout/Loading"
import ProjectForm from "../project/ProjectForm"
import Message from "../layout/Message"

function Project() {
    const { id } = useParams()

    const [showProjectForm, setShowProjectForm] = useState(false)
    const [project, setProject] = useState({})

    const [message, setMessage] = useState("")
    const [type, setType] = useState("")
    
    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch((`http://localhost:5000/projects/${id}`), {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                const data = await response.json()
                setProject(data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchProject()
    }, [id])

    const editPost = async (project) => {
        // budget validation
        if(project.budget < project.cost) {
            // Mensagem
            setMessage("O custo não pode ser menor do que o orçamento do projeto!")
            setType("error")
            resetMessage()
            return
        }
        try {
            const response = await fetch(`http://localhost:5000/projects/${project.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(project)
            })
            const data = await response.json()
            setProject(data)
            setShowProjectForm(false)

            // Mensagem
            setMessage("Projeto Editado com Sucesso!")
            setType("success")
            resetMessage()
        } catch (error) {
            console.log(error)
        }

        const resetMessage = setTimeout(() => {
            setMessage("")
            setType("")
        }, 3000)
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    return (
        <>
            {project.name ? (
                <div className={styles.project_container}>
                    <h1>{project.name}</h1>
                    <button onClick={toggleProjectForm}>
                        {!showProjectForm ? "Editar Projeto" : "Fechar"}
                    </button>
                    {message && <Message type={type} msg={message} />}
                    <Message type="success" msg="Olá"></Message>
                    {!showProjectForm ? (
                        <div className={styles.project_info}>
                            <p>
                                <span>Categoria:</span> {project.category.name}
                            </p>
                            <p>
                                <span>Orçamento:</span> R${project.budget}
                            </p>
                            <p>
                                <span>Total Utilizado:</span> R${project.cost}
                            </p>
                        </div>
                    ) : (
                        <div className={styles.project_info}>
                            <ProjectForm handleSubmit={editPost} btnText="Salvar" projectData={project} />
                        </div>
                    )}
                </div>
            ) : (
                <Loading />
            )}
        </>
    )
}

export default Project