import './App.css';
import ArticlesList from './components/ArticlesList';
import Header from './components/Header';
import Nav from './components/Nav';
import SingleArticle from './components/SingleArticle';
import UserContext from './contexts/userContext';
import { Route, Routes } from "react-router-dom";
import { useState } from 'react';
import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme, darkTheme } from './themes'

function App() {

    const [user, setUser] = useState("jessjelly");
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleThemeChange = () => {
        console.log("isDarkMode", isDarkMode)
        setIsDarkMode(!isDarkMode);
    };

    return (
        <UserContext.Provider value={user}>
            <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                <CssBaseline />
                <Container maxWidth="lg">
                <Header onThemeToggle={handleThemeChange} isDarkMode={isDarkMode}/>
                <Routes>
                    <Route path = "/" element={<ArticlesList/>} />
                    <Route path = "/articles/:article_id" element={<SingleArticle/>} />
                    <Route path = "/topics" element={<Nav/>} />
                    <Route path = "/topics/:topic_slug" element={<ArticlesList/>} />
                </Routes>
                </Container>
            </ThemeProvider>
        </UserContext.Provider>
    )
}

export default App
