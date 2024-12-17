import { useState, useEffect, useContext } from "react";
import { getCommentsByArticleId, postComment } from "../api";
import CommentsCard from "./CommentsCard"
import CommentAdder from "./CommentAdder";
import { useParams } from "react-router";
import { deleteComment } from "../api";
import UserContext from "../contexts/userContext";
import { Alert, Button, CircularProgress, Snackbar } from "@mui/material";

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
    const [deletingCommentId, setDeletingCommentId] = useState(null)
    const [errorMsg, setErrorMsg] = useState("")
    const [alert, setAlert] = useState({ open: false, message: ""})

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

    function handleDelete(commentId) {
        const confirmDelete = window.confirm("Are you sure you want to delete this comment?")
        if (confirmDelete) {
            setDeletingCommentId(commentId)
            deleteComment(commentId)
            .then(() => {
                setIsDeleted(true)
                updateCommentCount(-1)
                setDeletingCommentId(null)        
                setAlert({ open: true, message: 'Comment deleted successfully'})
            })
            .catch((err) => {
                setDeletingCommentId(null)
                setError(true)
                setErrorMsg('Comment could not be deleted')
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

    const handleCloseAlert = () => {
        setAlert({ open: false, message: " "})
    }

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
        <section id='comments-list' className="comments-list">
            <Button variant="contained" onClick={() => setIsFormDisplayed(!isFormDisplayed)}>
                {isFormDisplayed ? "Cancel" : "Add a comment"}
            </Button>
            {isFormDisplayed && <CommentAdder addNewComment={addNewComment}/>}
            <ul>
                {commentsList.map((comment) => {
                    return (
                        <div key={comment.comment_id}>
                            <CommentsCard comment={comment} user={user} handleDelete={handleDelete} isDeleting={deletingCommentId === comment.comment_id}/>
                        </div>
                        )
                    })
                }
            </ul>
        </section>
        
        <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
            <Alert severity="success" onClose={handleCloseAlert}>
                {alert.message}
            </Alert>
        </Snackbar>
        </>
    )
}

export default CommentsList

