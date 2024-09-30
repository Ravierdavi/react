import { useState, useEffect } from "react"
import styles from "./styles.module.css"

function DigitalClock() {
    const [time, setTime] = useState("")

    // Update Time
    useEffect(() => {
        const interval = setInterval(() => {
            const date = new Date()
            const hours = date.getHours().toString().padStart(2, "0")
            const minutes = date.getMinutes().toString().padStart(2, "0")
            const seconds = date.getSeconds().toString().padStart(2, "0")
            setTime(`${hours}:${minutes}:${seconds}`)
        }, 1000);

        return () => {
            clearInterval(interval)
        }
    }, [])

    // Update title
    useEffect(() => {
        document.title = time
    }, [time])

    return (
        <div className={styles.container}>
            <div className={styles.clockContainer}>
                <p>{time}</p>
            </div>
        </div>
    )
}

export default DigitalClock