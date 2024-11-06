import { useEffect, useState } from "react";
import Input from "../form/Input";
import Select from "../form/Select";
import Submit from "../form/SubmitButton";
import styles from "./ProjectForm.module.css";

function ProjectForm({ handleSubmit, projectData }) {
    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || {name: "", budget: "", category: {id: "", name: ""}})
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:5000/categories", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Não foi possível encontrar as categorias:" + error);
            }
        };

        fetchCategories();
    }, []);

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(project)
    }

    function handleChange(e) {
        setProject((p) => ({ ...p, [e.target.name]: e.target.value }))
    }

    function handleCategory(e) {
        setProject((p) => ({
            ...p, category: {
                id: e.target.value,
                name: e.target.options[e.target.options.selectedIndex].text
            }
        }))
    }

    return (
        <form className={styles.form} onSubmit={submit}>
            <Input
                type="text"
                name="name"
                placeholder="Insira o nome do projeto"
                text="Nome do projeto"
                handleOnChange={handleChange}
                value={project.name ? project.name : ""}
            />
            <Input
                type="number"
                name="budget"
                placeholder="Insira o orçamento do projeto"
                text="Orçamento do projeto"
                handleOnChange={handleChange}
                value={project.budget ? project.budget : ""}
            />
            <Select
                name="category_id"
                text="Selecione uma categoria"
                options={categories}
                handleOnChange={handleCategory}
                value={project.category ? project.category.id : ""}
            />
            <Submit text="Criar Projeto" />
        </form>
    );
}

export default ProjectForm;
