import { useState, useEffect } from 'react';
import { getTopics } from '../api';
import { useContext } from 'react';
import UserContext from '../contexts/userContext';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { IconButton, MenuItem, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close'

const Nav = () => {
    const user = useContext(UserContext)
    const { search } = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [topics, setTopics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
    },[searchParams])

    if (isError) {
        return <p>There was an error</p>
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const handleMenuItemClick = () => {
        setIsMenuOpen(false)
    }

    const getTopicLink = (slug) => {
        const searchString = search.includes("sort_by=topic") ? search.replace("topic","created_at") : search
        return `/topics/${slug}${searchString}`;
    };

    const getHomeLink = () => {
        searchParams.delete("sort_by")
        searchParams.delete("order")
        return {pathname: `/`, search: ``}
    }

    return (
        <>
        <Toolbar>
            <Typography variant="h5" component="h1" sx={{ flexGrow: 1 }}>
                <NavLink 
                    to={getHomeLink()}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    NC News</NavLink>
            </Typography>
            {!isSmallScreen && (
                <>
                <Typography variant="body1" sx={{ marginLeft: 2 }}>
                    <NavLink style={{ textDecoration: 'none', color: 'inherit' }}>Welcome {user}!</NavLink>
                </Typography>
                <Typography variant="body1" sx={{ marginLeft: 2 }}>
                    <NavLink
                        to={{pathname: `/`, search }}
                        style={({ isActive }) => ({
                            textDecoration: 'none',
                            color: 'inherit',
                            paddingBottom: '21px',
                            borderBottom: isActive ? '3px solid white' : 'none',
                        })}
                    >
                        All topics
                    </NavLink>
                </Typography>
                {topics.map((topic) => (
                    <Typography variant="body1" sx={{ marginLeft: 2, textTransform: 'capitalize' }}>
                        <NavLink
                            key={topic.slug}
                            to={getTopicLink(topic.slug)}
                            style={({ isActive }) => ({
                                textDecoration: "none",
                                marginLeft: '16px',
                                color: 'inherit',
                                paddingBottom: "21px",
                                borderBottom: isActive ? `3px solid white` : "none",
                                })}
                        >
                            {topic.slug}
                        </NavLink>
                    </Typography>
                ))}
                </>
            )}                
            {isSmallScreen && (
                <IconButton onClick={toggleMenu}>
                {isMenuOpen ? (
                    <CloseIcon sx={{color: "white"}}/>
                ) : (
                    <MenuIcon sx={{color: "white"}}/>
                )}
                </IconButton>
            )}
        </Toolbar>
        {isSmallScreen && isMenuOpen && (
            <div
                style={{
                    position: 'absolute',
                    top: 64,
                    left: 0,
                    right: 0,
                    backgroundColor: 'white',
                    color: 'black',
                    zIndex: 1300,
                    padding: '10px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    }}
            >
                <MenuItem onClick={toggleMenu}>
                    <NavLink
                        to={{pathname: `/`, search }} 
                        style={{ textDecoration: 'none', color: 'inherit' }}>
                        All topics
                    </NavLink>
                </MenuItem>
                <MenuItem onClick={toggleMenu}>
                    <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Welcome {user}!
                    </NavLink>
                </MenuItem>
                {topics.map((topic) => (
                    <MenuItem
                        key={topic.slug}
                        onClick={() => {
                        handleMenuItemClick(topic.slug);
                        toggleMenu();
                        }}
                    >
                        <NavLink
                            to={getTopicLink(topic.slug)}
                            style={{ textDecoration: 'none', color: 'inherit', textTransform: 'capitalize' }}
                        >
                        {topic.slug}
                        </NavLink>
                    </MenuItem>
                ))}
            </div>
        )}
        </>
    );
}

export default Nav
    