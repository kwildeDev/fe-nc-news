import { useState, useEffect } from "react";
import { getCommentsByArticleId, postComment } from "../api";
import CommentsCard from "./CommentsCard"
import CommentAdder from "./CommentAdder";
import { useParams } from "react-router";

const CommentsList = (props) => {
    const { article_id } = useParams()
    const { showComments, updateCommentCount } = props
    const [commentsList, setCommentsList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const [isFormDisplayed, setIsFormDisplayed] = useState(false)
    const [isPosting, setIsPosting] = useState(false)

    function addNewComment(commentFormData) {
        setIsPosting(true)
        return postComment(article_id, commentFormData)
        .then((newComment) => {
            setIsFormDisplayed(false)
            updateCommentCount()
            setCommentsList((currentComments) => {
                return [newComment, ...currentComments]
            })
            setIsPosting(false)
        })
        .catch((err) => {
            setError(true)
            const msg = "Comment could not be posted. Please try again!"
        })
    }

    useEffect(() => {
        setIsLoading(true)
        getCommentsByArticleId(article_id)
        .then((commentsList) => {
            setCommentsList(commentsList)
            setIsLoading(false)
        })
        .catch((err) => {
            setError(true)
            const msg = "There was an error"
        })
    },[])

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>{msg}</p>
    }

    if (isPosting) {
        return <p>Posting...</p>
    }
    return (
        <>
        <section id='comments-list'>
            <button onClick={() => setIsFormDisplayed(!isFormDisplayed)}>
                {isFormDisplayed ? "Cancel" : "Add a comment"}
            </button>
            {isFormDisplayed && <CommentAdder addNewComment={addNewComment}/>}
            {showComments &&
            <ul>
                {commentsList.map((comment) => {
                    return <CommentsCard key={comment.comment_id} comment={comment}/>
                })}
            </ul>}
        </section>
        </>
    )
}

export default CommentsList
