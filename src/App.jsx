import './App.css';
import ArticlesList from './components/ArticlesList';
import Header from './components/Header';
import { Route, Routes } from "react-router-dom";
import SingleArticle from './components/SingleArticle';
import UserContext from './contexts/userContext';
import { useState } from 'react';

function App() {

    const [user, setUser] = useState("jessjelly");

    return (
        <UserContext.Provider value={user}>
            <Header/>
            <Routes>
                <Route path = "/" element={<ArticlesList/>} />
                <Route path = "/articles/:article_id" element={<SingleArticle/>} />
            </Routes>
        </UserContext.Provider>
    )

}

export default App
