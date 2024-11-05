import { useState, useEffect } from "react"
import { getArticleById } from "../api"

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
        return <p>Loading...</p>
    }
    
    if (isError) {
        return <p>Sorry, article not found</p>
    }

    const shortDate = article.created_at.slice(8,10)+"/"+article.created_at.slice(5,7)+"/"+article.created_at.slice(0,4)
    const formattedDate = `${shortDate} ${article.created_at.slice(12,16)}`
    
    return (
        <section id="article-card">
            <ul className="display-line1">
                <img className="article-img" src={articleCard.article_img_url}></img>
                <div>
                    <h3>{articleCard.title}</h3>
                    <p>{formattedDate}</p>
                    <p className="text-intro">{articleCard.body}</p>
                </div>
            </ul>
            <div>
            <ul className="display-line2-left">
                <li><img className="avatar" src={"https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg"}/></li>
                <li>{article.author}</li>
                <li>{article.topic}</li>
            </ul>
            <ul className="display-line2-right">
                <li><span className="bold">Votes: </span>{article.votes}</li>
                <li><span className="bold">Comments: </span>{article.comment_count}</li>
            </ul>
            </div>
        </section>
  )
}

export default ArticleCard
