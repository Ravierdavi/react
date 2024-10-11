import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Home from "./components/pages/Home"
import Projects from "./components/pages/Projects"
import About from "./components/pages/About"
import Contact from "./components/pages/Contact"

import Layout from "./components/layout/Layout"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/home"/>}/>
          <Route path="/home" element={<Home />}></Route>

          <Route path="/projects" element={<Projects />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>

          <Route path="/newproject"></Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App