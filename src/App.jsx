import './App.css';
import ArticlesList from './components/ArticlesList';
import Header from './components/Header';
import Nav from './components/Nav';
import SingleArticle from './components/SingleArticle';
import UserContext from './contexts/userContext';
import { Route, Routes } from "react-router-dom";
import { useState } from 'react';
import { Container } from '@mui/material';

function App() {

    const [user, setUser] = useState("jessjelly");

    return (
        <UserContext.Provider value={user}>
            
            <Container maxWidth={false}>
            <Header/>
            <Routes>
                <Route path = "/" element={<ArticlesList/>} />
                <Route path = "/articles/:article_id" element={<SingleArticle/>} />
                <Route path = "/topics" element={<Nav/>} />
                <Route path = "/topics/:topic_slug" element={<ArticlesList/>} />
            </Routes>
            </Container>
        </UserContext.Provider>
    )

}

export default App
