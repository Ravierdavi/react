import { useEffect, useState } from "react";
import Input from "../form/Input";
import Select from "../form/Select";
import Submit from "../form/SubmitButton";
import styles from "./ProjectForm.module.css";

function ProjectForm() {
    const [categories, setCategories] = useState([]);
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
    return (
        <form className={styles.form}>
            <Input
                type="text"
                name="name"
                placeholder="Insira o nome do projeto"
                text="Nome do projeto"
            />
            <Input
                type="number"
                name="budget"
                placeholder="Insira o orçamento do projeto"
                text="Orçamento do projeto"
            />
            <Select
                name="category_id"
                text="Selecione uma categoria"
                options={categories}
            />
            <Submit text="Criar Projeto" />
        </form>
    );
}

export default ProjectForm;
