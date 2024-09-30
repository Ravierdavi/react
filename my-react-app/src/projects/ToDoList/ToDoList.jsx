import { useState } from "react"
import styles from "./styles.module.css"

function ToDoList() {
    // UseState variables
    const [tasks, setTask] = useState(["Beggin"])
    const [inpTask, setInpTask] = useState("")

    // Functions for Input and Add Button
    function handleInputChange(event) {
        setInpTask(event.target.value)
    }

    function addTask() {
        // Check if the string is empty
        // Check if string length is greater than 36. If yes, show an Error Message
        if (inpTask.trim() && inpTask.length <= 36) {
            setTask(prevArray => [...prevArray, inpTask])
            setInpTask("")
        } else {
            console.log("Your task name is empty or greater than 36 characters")
        }
    }

    // Functions for logical buttons
    function removeTask(index) {
        setTask((prevArray) => prevArray.filter((_, i) => i !== index))
    }

    function upTask(index) {
        setTask(prevArray => {
            prevArray.splice(index !== 0 ? index - 1 : 0, 0, prevArray.splice(index, 1)[0])
            return [...prevArray]
        })
    }

    function downTask(index) {
        setTask(prevArray => {
            prevArray.splice(index + 1, 0, prevArray.splice(index, 1)[0])
            return [...prevArray]
        })
    }

    return (
        <div className={styles.containerApp}>
            <h1 className={styles.title}>To Do List</h1>

            <section className={styles.inputContainer}>
                <input type="text" value={inpTask} onChange={handleInputChange} placeholder="Enter a task" />
                <button onClick={addTask}>Add</button>
            </section>

            <section className={styles.tasksContainer}>
                {tasks.map((task, index) => (
                    <div key={index} className={styles.task}>
                        <h3>{task}</h3>
                        <div className={styles.buttonsContainer}>
                            <button className={styles.deleteButton} onClick={() => removeTask(index)}>Delete</button>
                            <button className={styles.button} onClick={() => upTask(index)}>☝️</button>
                            <button className={styles.button} onClick={() => downTask(index)}>👇</button>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    )
}

export default ToDoList