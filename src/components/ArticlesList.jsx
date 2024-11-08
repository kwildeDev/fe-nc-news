import { useState, useEffect } from 'react';
import { getArticles } from '../api';
import { formatDate } from '../utils';
import { Link, useSearchParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const ArticlesList = () => {
    const { pathname } = useLocation()
    const [searchParams, setSearchParams] = useSearchParams();
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [sortBy, setSortBy] = useState(undefined)
    const [orderBy, setOrderBy] = useState(undefined)

    const topicSlug = pathname.startsWith("/topics/") ? pathname.slice(8) : undefined

    const handleSort = (event) => {
        event.preventDefault()
        setSortBy(current => event.target.value || undefined)           
    }
    
    const handleOrder = (event) => {
        event.preventDefault()
        setOrderBy(current => event.target.value || undefined)
    }

    useEffect(() => {
        const params = {}
        if (sortBy) {
            params.sort_by = sortBy
        }
        if (orderBy) {
            params.order = orderBy
        }
        setSearchParams(params)
    }, [sortBy, orderBy])

    useEffect(() => {
        setIsLoading(true)
        getArticles(topicSlug,sortBy,orderBy)
        .then((articles) => {
            setArticles(articles)
            setIsLoading(false)
        })
        .catch((err) => {
            setIsError(true)
            setIsLoading(false)
        })
    },[topicSlug, sortBy, orderBy])

    if (isError) {
        return <p>There was an error</p>
    }

    return (
        <section id='articles-list'>
            <h2>{topicSlug || "All articles"}</h2>
            <div className="sort__forms">
            <form>
                <label>
                Sort by:
                    <select onChange={handleSort} name="selectedQuery" defaultValue={sortBy}>
                        <option value="created_at">Date</option>
                        <option value="author">Author</option>
                        <option value="title">Title</option>
                        <option value="topic">Topic</option>
                        <option value="votes">Most popular</option>
                        <option value="comment_count">Most talked about</option>
                    </select>
                </label>
            </form>
            <form>
                <label>
                    Order by:
                    <select onChange={handleOrder} defaultValue={orderBy}>
                        <option value="desc">Descending</option>
                        <option value="asc">Ascending</option>
                    </select>
                </label>
            </form>
            </div>
            {isLoading && <p>Loading...</p>}
            {!isLoading && <ul className="list-display">
                {articles.map((article) => {
                    return <li id="article-card" key={article.article_id}>
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
                })}
            </ul>}
        </section>
  )


  return (
    <section id="article-card">
        
    </section>
)


}

export default ArticlesList
