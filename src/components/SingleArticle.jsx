import { useState, useEffect } from 'react'
import { getArticleById } from '../api'
import { useParams } from 'react-router'

const SingleArticle = (props) => {
    const { article_id } = useParams()
    const [singleArticle, setSingleArticle] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        getArticleById(article_id)
        .then((singleArticle) => {
            setSingleArticle(singleArticle)
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

    const shortDate = singleArticle.created_at.slice(8,10)+"/"+singleArticle.created_at.slice(5,7)+"/"+singleArticle.created_at.slice(0,4)
    const formattedDate = `${shortDate} at ${singleArticle.created_at.slice(11,16)}`
    const avatarPlaceholder = "https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg"

    return (
        <section id="single-article">
            <h2>{singleArticle.title}</h2>
            <h4>Topic: <span className='lighter'>{singleArticle.topic}</span></h4>
            <div>
                <img className="responsive" src={singleArticle.article_img_url}></img>
            </div>
            <p>By <span className='bold'>{singleArticle.author}</span> on {formattedDate}</p>
            <p className='body-text'>{singleArticle.body}</p>
            <ul className='display-votes-comments'>
                <h4 className='votes'>Votes: </h4><p><span className='lighter'>{singleArticle.votes}</span></p>
                <h4 className='comments'>Comments: </h4><p><span className="lighter">{singleArticle.comment_count}</span></p>
            </ul>
        </section>
  )
}

export default SingleArticle
