import { Link } from "react-router-dom"
import styles from "./NavBar.module.css"

import logo from "../../img/costs_logo.png"

function NavBar() {
    return (
        <nav className={styles.navbar}>
            <Link>
                <img className={styles.costs_logo} src={logo} alt="costs logo" />
            </Link>
            <ul className={styles.list}>
                <li className={styles.item}><Link to="/home">Home</Link></li>
                <li className={styles.item}><Link to="/projects">Projects</Link></li>
                <li className={styles.item}><Link to="/about">About</Link></li>
                <li className={styles.item}><Link to="/contact">Contact</Link></li>
            </ul>
        </nav>
    )
}

export default NavBar