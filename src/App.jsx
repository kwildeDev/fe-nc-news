import './App.css';
import ArticlesList from './components/ArticlesList';
import Header from './components/Header';
import { Route, Routes } from "react-router-dom";
import Nav from './components/Nav';


function App() {
    return (
        <>
            <Header/>
            <Routes>
                <Route path = "/" element={<ArticlesList/>} />
            </Routes>
        </>
    )

}

export default App
