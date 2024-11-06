import { useState, useEffect } from 'react';
import { getArticles } from '../api';
import { formatDate } from '../utils';
import { Link } from 'react-router-dom';

const ArticlesList = () => {
    const [articles, setArticles] = useState([]);
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
        return <p>There was an error</p>
    }

    return (
        <section id='articles-list'>
            <ul className="list-display">
                {articles.map((article) => {
                    return <>
                        <li id="article-card" key={article.article_id}>
                        <div className="article-img-details-container">
                            <img className="article-img" src={article.article_img_url}></img>
                            <div className="article-card-details">
                                <Link to={{pathname: `/articles/${article.article_id}`}}>
                                    <h3>{article.title}</h3>
                                </Link>
                                <p><span className="bold">Topic: </span>{article.topic}</p>
                                <p>By <span className="bold">{article.author}</span> on {formatDate(article.created_at)}</p>
                            </div>
                        </div>
                        <div className="votes-comments-line">
                            <h4 className="votes">Votes: </h4><p><span className="lighter">{article.votes}</span></p>
                            <h4 className="comments">Comments: </h4><p><span className="lighter">{article.comment_count}</span></p>
                        </div>
                        </li>
                    </>
                })}
            </ul>
        </section>
  )


  return (
    <section id="article-card">
        
    </section>
)


}

export default ArticlesList
