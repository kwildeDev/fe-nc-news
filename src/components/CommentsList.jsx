import { useState, useEffect, useContext, useRef } from "react";
import { getCommentsByArticleId, postComment } from "../api";
import CommentsCard from "./CommentsCard"
import CommentAdder from "./CommentAdder";
import { useParams } from "react-router";
import { deleteComment } from "../api";
import UserContext from "../contexts/userContext";
import { Box, Alert, Button, CircularProgress, List, Snackbar } from "@mui/material";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

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
    const [open, setOpen] = useState(false)
    const [selectedCommentId, setSelectedCommentId] = useState(null)
    const [previousScrollPosition, setPreviousScrollPosition] = useState(0); // Track scroll position
    
    const listRef = useRef(0);

    function captureScrollPosition() {
        setPreviousScrollPosition(window.scrollY);
    }

    function restoreScrollPosition() {
        window.scrollTo(0, previousScrollPosition);
    }

    function addNewComment(commentFormData) {
        captureScrollPosition()
        setIsPosting(true)
        return postComment(article_id, commentFormData)
        .then((newComment) => {
            setIsFormDisplayed(false)
            updateCommentCount(1)
            setCommentsList((currentComments) => {
                return [newComment, ...currentComments]
            })
            setIsPosting(false)
            restoreScrollPosition();
        })
        .catch((err) => {
            setError(true)
            setErrorMsg("Comment could not be posted. Please try again!")
            restoreScrollPosition();
        })
    }

    function handleDelete (commentId) {
        setSelectedCommentId(commentId)
        setOpen(true)
        captureScrollPosition();
    }

    function handleConfirmDelete() {
            setOpen(false)
            setDeletingCommentId(selectedCommentId)
            deleteComment(selectedCommentId)
            .then(() => {
                setIsDeleted(true)
                updateCommentCount(-1)
                setDeletingCommentId(null)        
                setAlert({ open: true, message: 'Comment deleted successfully'})
                restoreScrollPosition();
            })
            .catch((err) => {
                setDeletingCommentId(null)
                setError(true)
                setErrorMsg('Comment could not be deleted')
                restoreScrollPosition();
            })
        //}
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

    const handleCloseDialog = () => {
        setOpen(false);
    }

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
        <Box sx={{ maxWidth: 800 }}>
            <Button variant="contained" onClick={() => setIsFormDisplayed(!isFormDisplayed)}>
                {isFormDisplayed ? "Cancel" : "Add a comment"}
            </Button>
            {isFormDisplayed && <CommentAdder addNewComment={addNewComment}/>}
            <List ref={listRef}>
                {commentsList.map((comment) => {
                    return (
                        <CommentsCard key={comment.comment_id} comment={comment} user={user} handleDelete={handleDelete} isDeleting={deletingCommentId === comment.comment_id}/>
                        )
                    })
                }
            </List>
        </Box>
        
        <Dialog
            open={open}
            onClose={handleCloseDialog}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Are you sure you want to delete this comment?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                Deleting a comment is permanent and cannot be undone. Please confirm if you want to delete this comment.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button onClick={handleConfirmDelete} autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>


        <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
            <Alert severity="success" onClose={handleCloseAlert}>
                {alert.message}
            </Alert>
        </Snackbar>
        </>
    )
}

export default CommentsList

