import styles from "./Select.module.css"

function Select({ name, text, options, handleOnChange, value }) {
    return (
        <div className={styles.select_container}>
            <label htmlFor={name}>{text}:</label>
            <select name={name} id={name}>
                <option selected>Selecione uma opção</option>
            </select>
        </div>
    )
}

export default Select