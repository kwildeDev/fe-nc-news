import { useState, useEffect } from "react";
import { getCommentsByArticleId } from "../api";
import CommentsCard from "./CommentsCard"

const CommentsList = (props) => {
    const { showComments, article_id } = props
    const [commentsList, setCommentsList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        getCommentsByArticleId(article_id)
        .then((commentsList) => {
            setCommentsList(commentsList)
            setIsLoading(false)
        })
        .catch((err) => {
            setIsError(true)
        })
    },[])

    console.log(isLoading)
    if (isLoading) {
        return <p>Loading...</p>
    }

    if (isError) {
        return <p>Sorry, article not found</p>
    }

    if (showComments) {
        return (
            <section id='comments-list'>
             <ul>
                 {commentsList.map((comment) => {
                     return <CommentsCard key={comment.comment_id} comment={comment}/>
                 })}
             </ul>
         </section>
        )
    }
}

export default CommentsList
