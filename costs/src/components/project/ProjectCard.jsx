import { Link } from "react-router-dom"
import styles from "./ProjectCard.module.css"

import { BsPencil, BsFillTrashFill } from "react-icons/bs"

function ProjectCard({ id, name, budget, category, handleRemove }) {
    return (
        <div className={styles.ProjectCard_container} key={id}>
            <h4>{name}</h4>
            <div className={styles.informations_container}>
                <div>
                    <h5>Orçamento:</h5>
                    <p>R${budget}</p>
                </div>
                <div>
                    <span className={`${styles.category_bullet} ${styles[category.toLowerCase()]}`}></span>
                    <p>{category}</p>
                </div> 
            </div>
            <div className={styles.controls}>
                <Link to="/">
                    <BsPencil /> Editar
                </Link>
                <button>
                    <BsFillTrashFill/> Excluir
                </button>
            </div>
        </div>
    )
}

export default ProjectCard