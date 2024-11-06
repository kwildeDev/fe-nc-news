import './App.css';
import ArticlesList from './components/ArticlesList';
import Header from './components/Header';
import { Route, Routes } from "react-router-dom";
import SingleArticle from './components/SingleArticle';


function App() {
    return (
        <>
            <Header/>
            <Routes>
                <Route path = "/" element={<ArticlesList/>} />
                <Route path = "/articles/:article_id" element={<SingleArticle/>} />
            </Routes>
        </>
    )

}

export default App
