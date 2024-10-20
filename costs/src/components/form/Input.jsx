import styles from "./Input.module.css"

function Input({ type, name, placeholder, text, value, handleOnChange }) {
    return (
        <div className={styles.input_container}>
            <label htmlFor={name}>{text}:</label>
            <input type={type} name={name} id={name} placeholder={placeholder} value={value} onChange={handleOnChange} />
        </div>
    )
}

export default Input