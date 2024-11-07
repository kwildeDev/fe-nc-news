import { Link } from "react-router-dom"

const Header = () => {
    return (
        <div className = "header">
        <header>
            <h1 id="home-link">
                <Link to="/">NC News</Link>
            </h1>
        </header>
        </div>
    )
}

export default Header
