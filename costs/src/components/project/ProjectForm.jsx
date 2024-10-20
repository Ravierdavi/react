import Input from "../form/Input"
import Select from "../form/Select"
import Submit from "../form/SubmitButton"
import styles from "./ProjectForm.module.css"

function ProjectForm() {
    return (
        <form className={styles.form}>
            <Input type="text" name="name" placeholder="Insira o nome do projeto" text="Nome do projeto" />
            <Input type="number" name="budget" placeholder="Insira o orçamento do projeto" text="Orçamento do projeto" />
            <Select name="category_id" text="Selecione uma categoria" />
            <Submit text="Criar Projeto" />
        </form>
    )
}

export default ProjectForm