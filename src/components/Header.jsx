import { Link } from "react-router-dom"
import Nav from "./Nav"

const Header = () => {
    return (
        <div className = "header">
        <header>
            <h1 id="home-link">
                <Link to="/">NC News</Link>
            </h1>
            <Nav/>
        </header>
        </div>
    )
}

export default Header
