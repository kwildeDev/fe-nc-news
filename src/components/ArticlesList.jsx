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
            <h2 className="topic__heading">{topicSlug || "All articles"}</h2>
            <div className="sort-order__select">
            <form>
                <label htmlFor="selectSortBy" className="drop-down__label">
                Sort by:
                    <select id="selectSortBy" className="drop-down" onChange={handleSort} name="selectedQuery" defaultValue={sortBy}>
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
                <label htmlFor="selectOrderBy" className="drop-down__label">
                    Order by:
                    <select id="selectOrderBy" className="drop-down" onChange={handleOrder} defaultValue={orderBy}>
                        <option value="desc">Descending</option>
                        <option value="asc">Ascending</option>
                    </select>
                </label>
            </form>
            </div>
            {isLoading && <p>Loading...</p>}
            {!isLoading && <ul className="articles__list">
                {articles.map((article) => {
                    return <li className="article-card" id="article-card" key={article.article_id}>
                        <div className="article-card__content">
                            <img className="article-img" src={article.article_img_url}></img>
                            <Link className={`topic__link topic__link--${article.topic}`} to={{pathname: `/topics/${article.topic}`}}>
                                {article.topic}
                            </Link>
                            <p>By {article.author} on {formatDate(article.created_at)}</p>
                            <Link className="article__title" to={{pathname: `/articles/${article.article_id}`}}>
                                <h3>{article.title}</h3>
                            </Link>
                            
                        </div>
                        <div className="article-card__footer">
                            <p><strong>Votes: </strong>{article.votes}</p>
                            <p><strong>Comments: </strong>{article.comment_count}</p>
                        </div>
                    </li>
                })}
            </ul>}
        </section>
  )
}

export default ArticlesList
