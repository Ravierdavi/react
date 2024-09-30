import { useContext } from "react"
import { UserNameContext } from "./A.jsx"

function D() {
    const name = useContext(UserNameContext)

    return (
        <div>
            <p>It's D</p>
            <p>Hello {name}!</p>
        </div>
    )
}

export default D