import { useState } from "react"
import { v4 as uuidv4 } from 'uuid'
import styles from "./styles.module.css"

function ColorPicker() {
    const [color, setColor] = useState("#000000")
    const [elements, setElements] = useState([{ id: uuidv4(), color: color }])

    function handleChange(e) {
        setColor(e.target.value)
    }

    function saveColor(color) {
        if (elements.length < 5) {
            setElements((prevArray) => [...prevArray, // Copia os elementos existentes
            { id: uuidv4(), color: color }])
        }
    }

    function displayPickedColor(e) {
        const rgb = e.target.style.backgroundColor.slice(4, -1).split(", ").map((str) => Number(str))
        setColor(rgbToHex(rgb))
    }

    function removePickedColor(id) {
        setElements((prevArray) =>
            prevArray.filter((element) => element.id !== id)
        )
    }

    const rgbToHex = (rgb) => '#' + rgb.map(x => {
        const hex = x.toString(16)
        return hex.length === 1 ? '0' + hex : hex
    }).join('')

    return (
        <div className={styles.container}>
            <div className={styles.display} style={{ backgroundColor: color }}>
                <p className={styles.colorText}>{color}</p>
            </div>
            <div className={styles.pickersContainer}>
                {
                    elements.map((element) => (
                        <div
                            key={element.id}
                            style={{ backgroundColor: element.color }}
                            onClick={displayPickedColor}
                            onDoubleClick={() => removePickedColor(element.id)}
                        />
                    ))
                }
            </div>
            <input type="color" value={color} onChange={handleChange} />
            <button className={styles.saveButton} onClick={() => saveColor(color)}>save</button>
        </div>
    )
}

export default ColorPicker