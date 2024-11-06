import { useState, useEffect } from "react"
import { formatDate } from "../utils"

const CommentsCard = (props) => {
    const { comment } = props
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    
    const commentDate = formatDate(comment.created_at)


    return (
        <section id="comment-card">
            <p>By <span className="bold">{comment.author}</span> on {commentDate}</p>
            <div className="comments-body">
                <p>{comment.body}</p>
                <div className="display-votes-comments">
                    <h4 className="votes">Votes: </h4><p><span className="lighter">{comment.votes}</span></p>
                </div>
            </div>                      
        </section>
    )
}

export default CommentsCard
