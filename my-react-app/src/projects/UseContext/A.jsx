import { createContext } from "react"
import B from "./B.jsx"

export const UserNameContext = createContext()

function A() {
    return (
        <div>
            <p>It's A</p>
            <UserNameContext.Provider value="Roberto">
                <B></B>
            </UserNameContext.Provider>
        </div>
    )
}

export default A