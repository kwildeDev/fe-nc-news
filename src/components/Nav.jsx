import { useState, useEffect } from 'react';
import { getTopics } from '../api';
import { useContext } from 'react';
import UserContext from '../contexts/userContext';
import { NavLink } from 'react-router-dom';
import { RxCross1, RxHamburgerMenu } from 'react-icons/rx';

const Nav = () => {
    const user = useContext(UserContext)

    const [topics, setTopics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        getTopics()
        .then((topics) => {
            setTopics(topics)
            setIsLoading(false)
        })
        .catch((err) => {
            setIsError(true)
        })
    },[])

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (isError) {
        return <p>There was an error</p>
    }

    const handleMenuItemClick = () => {
        setIsMenuOpen(false)
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <>
        <nav className={`navbar ${isMenuOpen ? 'responsive' : ''}`} id='navbar'>
            <div className='navlinks'>
            <h1 className="home-link">
                <NavLink to="/">NC News</NavLink>
            </h1>
            <NavLink>Welcome {user}!</NavLink>
            <NavLink to={{pathname: `/`}}>Most recent</NavLink>
            <div className="dropdown">
                <button className="dropbtn">Topics
                    &#9660;
                </button>
                <div className="dropdown-content">
                    {topics.map((topic) => {
                        return <span onClick={handleMenuItemClick} className="nav__link" key={topic.slug}>
                            <NavLink className={`nav__topic--${topic.slug}`} to={{pathname: `/topics/${topic.slug}`}}><strong>{topic.slug}:</strong> <em>{topic.description}</em></NavLink>
                        </span>
                    })}
                </div>
            </div>
            </div>
        </nav>
        <a href="javascript:void(0);" className='nav__icon' onClick={toggleMenu}>
            {isMenuOpen ? (
                <RxCross1 className='close-icon' />
            ) : (
                <RxHamburgerMenu className='hamburger-icon' />
            )}
        </a>
        </>
    )
}

export default Nav
    
    
    
    
    
/*    
    return (
        <nav className='navbar__container'>
            <ul className={`navbar ${isMenuOpen ? 'responsive' : ''}`} id='navbar'>
                <li><NavLink to={{pathname: `/`}}>Most recent</NavLink></li>
                <li className="dropdown"><button className='dropbtn'>Topics    &#9660;</button></li>
                <ul className='dropdown-content'>
                    {topics.map((topic) => {
                    return <li onClick={handleMenuItemClick} className="nav__link" key={topic.slug}>
                            <NavLink to={{pathname: `/topics/${topic.slug}`}}>{topic.slug}: {topic.description}</NavLink>
                        </li>
                    })}
                </ul>
            </ul>
            <div className='nav__icon' onClick={toggleMenu}>
                {isMenuOpen ? (
                    <RxCross1 className='close-icon' />
                ) : (
                    <RxHamburgerMenu className='hamburger-icon' />
                )}
            </div>    
        </nav>
    )
*/