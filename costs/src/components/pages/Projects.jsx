import { useLocation } from "react-router-dom"
import Message from "../layout/Message"

function Projects() {
    const location = useLocation()

    return (
        <div>
            <h1>Meus projetos</h1>
            {location.state && <Message type="success" msg={location.state} />}
        </div>
    )
}

export default Projects