import { formatDate } from "../utils"

const CommentsCard = (props) => {
    const { comment } = props

    const commentDate = formatDate(comment.created_at)           

    return (
        <li id="comment-card">
            <p>By <span className="bold">{comment.author}</span> on {commentDate}</p>
            <div className="comments-body">
                <p>{comment.body}</p>
                <div className="votes-comments-line">
                    <h4 className="votes">Votes: </h4><p><span className="lighter">{comment.votes}</span></p>
                </div>
            </div>
            
        </li>
    )
}

export default CommentsCard