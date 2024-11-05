import { useState, useEffect } from 'react';
import ArticleCard from './ArticleCard';
import { getArticles, getUsers } from '../api';

const ArticlesList = () => {
    const [articles, setArticles] = useState([]);
//    const [authors, setAuthors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        getArticles()
        .then((articles) => {
            setArticles(articles)
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
        return <p>Sorry, articles not found</p>
    }

    return (
        <section id='articles-list'>
            <ul>
                {articles.map((article) => {
                    return <ArticleCard key={article.article_id} article={article}/>
                })}
            </ul>
        </section>
  )
}

export default ArticlesList
