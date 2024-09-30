import { BrowserRouter as Router, Routes, Link, Route, Outlet } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Contato from "./pages/Contato.jsx"
import Forum from "./pages/Forum.jsx"

function Layout() {
    return (
        <>
            <header>
                <ul>
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/contato">Contato</Link></li>
                    <li><Link to="/forum">Forúm</Link></li>
                </ul>
                <h1>Meu site</h1>
            </header>
            <Outlet />
            <footer><p>Feito por Cr2</p></footer>
        </>
    )
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="contato" element={<Contato />} />
                    <Route path="forum" element={<Forum />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App