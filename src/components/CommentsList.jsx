import { useState, useEffect, useContext } from "react";
import { getCommentsByArticleId, postComment } from "../api";
import CommentsCard from "./CommentsCard"
import CommentAdder from "./CommentAdder";
import { useParams } from "react-router";
import { deleteComment } from "../api";
import UserContext from "../contexts/userContext";

const CommentsList = (props) => {
    const user = useContext(UserContext)

    const { article_id } = useParams()
    const { updateCommentCount } = props
    const [commentsList, setCommentsList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const [isFormDisplayed, setIsFormDisplayed] = useState(false)
    const [isPosting, setIsPosting] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

    function addNewComment(commentFormData) {
        setIsPosting(true)
        return postComment(article_id, commentFormData)
        .then((newComment) => {
            setIsFormDisplayed(false)
            updateCommentCount(1)
            setCommentsList((currentComments) => {
                return [newComment, ...currentComments]
            })
            setIsPosting(false)
        })
        .catch((err) => {
            setError(true)
            setErrorMsg("Comment could not be posted. Please try again!")
        })
    }


    function handleDelete(event) {
        event.preventDefault()
        const confirmDelete = window.confirm("Are you sure you want to delete this comment?")
        if (confirmDelete) {
            setIsDeleting(true)
            const commentId = event.target.value
            deleteComment(commentId)
            .then(() => {
                setIsDeleted(true)
                updateCommentCount(-1)
                setIsDeleting(false)        
            })
            .catch((err) => {
                setError(true)
                setErrorMsg("Comment could not be deleted")
            })
        }
    }  

    useEffect(() => {
        setIsDeleted(false)
        setIsLoading(true)
        getCommentsByArticleId(article_id)
        .then((commentsList) => {
            setCommentsList(commentsList)
            setIsLoading(false)
        })
        .catch((err) => {
            setError(true)
            setErrorMsg("There was an error")
        })
    },[isDeleted])


    if (isLoading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>{errorMsg}</p>
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
            <ul>
                {commentsList.map((comment) => {
                    return (
                        <div key={comment.comment_id}>
                            <CommentsCard comment={comment}/>
                            <div id="delete-button">
                                {comment.author === user && <button value={comment.comment_id} disabled= {isDeleting ? true : false} onClick= {handleDelete}>Delete Comment</button>}
                                {isDeleting && <p>Comment deleted</p>}
                            </div>
                        </div>
                        )
                    })
                }
            </ul>
        </section>
        </>
    )
}

export default CommentsList

