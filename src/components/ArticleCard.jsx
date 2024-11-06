import { useState, useEffect } from "react"
import { getArticleById } from "../api"
import { Link } from "react-router-dom"
import { formatDate } from "../utils"

const ArticleCard = (props) => {
    const { article } = props
    const [articleCard, setArticleCard] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    
    useEffect(() => {
        setIsLoading(true)
        getArticleById(article.article_id)
        .then((articleCard) => {
            setArticleCard(articleCard)
            setIsLoading(false)
        })
        .catch((err) => {
            setIsError(true)
        })
    },[])

    if (isLoading) {
        return <p></p>
    }
    
    if (isError) {
        return <p>Sorry, article not found</p>
    }

    const articleDate = formatDate(article.created_at)

    return (
        <section id="article-card">
            <ul className="display-line1">
                <img className="article-img" src={articleCard.article_img_url}></img>
                <div>
                    <Link to={{pathname: `/articles/${articleCard.article_id}`}}>
                    <h3>{articleCard.title}</h3>
                    </Link>
                    <p><span className="bold">Topic: </span>{article.topic}</p>
                    <p>By <span className="bold">{article.author}</span> on {articleDate}</p>
                    <p className="text-intro">{articleCard.body}</p>
                </div>
            </ul>
            <div>
            <ul className="display-votes-comments">
                <h4 className="votes">Votes: </h4><p><span className="lighter">{article.votes}</span></p>
                <h4 className="comments">Comments: </h4><p><span className="lighter">{article.comment_count}</span></p>
            </ul>
            </div>
        </section>
  )
}

export default ArticleCard
