import './App.css';
import ArticlesList from './components/ArticlesList';
import Header from './components/Header';
import SingleArticle from './components/SingleArticle';
import Nav from './components/Nav';
import UserContext from './contexts/userContext';
import { Route, Routes } from "react-router-dom";
import { useState } from 'react';

function App() {

    const [user, setUser] = useState("jessjelly");

    return (
        <UserContext.Provider value={user}>
            <Header/>
            <Routes>
                <Route path = "/" element={<ArticlesList/>} />
                <Route path = "/articles/:article_id" element={<SingleArticle/>} />
                <Route path = "/topics" element={<Nav/>} />
                <Route path = "/topics/:topic_slug" element={<ArticlesList/>} />
            </Routes>
        </UserContext.Provider>
    )

}

export default App
