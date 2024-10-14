import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import NavBar from "./NavBar"

import styles from "./Layout.module.css"

function Layout() {
    return (
        <>
            <NavBar />
            <div className={styles.container}>
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default Layout