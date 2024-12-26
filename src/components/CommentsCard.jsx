import { Avatar, Card, CardActions, CardContent, CardHeader, Chip, ListItem, Button, Typography, IconButton, Alert, Skeleton, CircularProgress } from "@mui/material"
import { formatDate } from "../utils"
import { Check, Delete, ThumbUp } from "@mui/icons-material"


const CommentsCard = (props) => {
    const { comment, user, handleDelete, isDeleting } = props

    const commentDate = formatDate(comment.created_at)      
    const authorInitial = comment.author && comment.author[0]?.toUpperCase() || '';     

    return (
        <ListItem disableGutters={true}>
            <Card sx={{ width: "100%" }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: 'secondary.main'}}>{authorInitial}</Avatar>
                        }
                    title={comment.author || 'Anonymous'}
                    subheader={commentDate}
                />
                <CardContent>
                    <Typography>{comment.body}</Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "space-between"}}>
                <Chip icon={<ThumbUp />} label={comment.votes}/>
                {comment.author === user && (
                        <div>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => handleDelete(comment.comment_id)}
                                disabled={isDeleting}
                                startIcon={<Delete />}
                            >
                                Delete
                            </Button>
                            {isDeleting && <CircularProgress size={24} />}
                        </div>
                    )}

                </CardActions>
            </Card>
        </ListItem>
    )
}

export default CommentsCard