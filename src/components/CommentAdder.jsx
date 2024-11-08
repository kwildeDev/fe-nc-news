import { useState, useContext } from 'react'
import UserContext from '../contexts/userContext'


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
        <form onSubmit={handleSubmit} id="comment-adder" className="comment-form">
            <label htmlFor="commentInput">Have your say...</label>
            <textarea
                id="commentInput"
                value={inputValue}
                onChange={handleUserComment}
                required
            />
            <button type="submit">Post Comment</button>
        </form>
    )
}
            