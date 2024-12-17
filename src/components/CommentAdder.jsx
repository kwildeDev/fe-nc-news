import { useState, useContext } from 'react'
import UserContext from '../contexts/userContext'
import { Button, FormControl, TextField } from '@mui/material'


export default function CommentAdder({addNewComment}) {
    const user = useContext(UserContext)

    const [inputValue, setInputValue] = useState("")

    const handleUserComment = (event) => {
        setInputValue(current => event.target.value)
    }
    
    const handleSubmit = (event) => {
        event.preventDefault()
        const dateNow = new Date()
        const timeStamp = dateNow.toISOString()
        const userComment = {
            "votes" : 0,
            "created_at": timeStamp,
            "author": user,
            "body": inputValue,
            }
        addNewComment(userComment)
        setInputValue("")
    }

    return (
        <form onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ m: 1}}>
                <TextField
                    id="comment-input"
                    multiline
                    placeholder='Have your say...'
                    rows={4}
                    value={inputValue}
                    onChange={handleUserComment}
                    required
                />
            </FormControl>
            <Button
                variant="contained"
                type="submit"
                disabled={inputValue.trim() === ''}
            >
                Post Comment
            </Button>
        </form>
    )
}
            