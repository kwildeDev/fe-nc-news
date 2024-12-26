import { useState, useEffect } from 'react'
import { getArticleById } from '../api'
import { useParams } from 'react-router'
import CommentsList from './CommentsList'
import { formatDate } from '../utils'
import VotesCounter from './VotesCounter'
import { Typography, Box, useTheme, Link, Stack, Chip } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { Comment, CalendarToday } from '@mui/icons-material'

const SingleArticle = (props) => {

    const theme = useTheme();

    const { article_id } = useParams()
    const [singleArticle, setSingleArticle] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [showComments, setShowComments] = useState(false)
    const [commentCount, setCommentCount] = useState(0)

    useEffect(() => {
        setIsLoading(true)
        getArticleById(article_id)
        .then((singleArticle) => {
            setSingleArticle(singleArticle)
            setIsLoading(false)
        })
        .catch((err) => {
            setIsError(true)
        })
    },[])

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (isError) {
        return <p>Sorry, there was an error</p>
    }

    function handleCommentsClick(event) {
        setShowComments(!showComments)
    }

    const articleDate = formatDate(singleArticle.created_at)
    
    const updateCommentCount = (num) => {
        setCommentCount(commentCount + num)
    }

    return (
        <>
        <Box component="article" sx={{ maxWidth: 800, mb: 1}}>
            <Box sx={{ mt: 1, mb: 1 }}>
                <Link href={`/topics/${singleArticle.topic}`} color="secondary" variant="body1" sx={{ fontSize: "larger", textTransform: "capitalize"}}>{singleArticle.topic}</Link>
            </Box>
            <Typography gutterBottom={true} variant="h4" component="h2">{singleArticle.title}</Typography>
            <Typography gutterBottom={true} variant="body1">By {singleArticle.author}</Typography>
            <Typography gutterBottom={true} variant="body1">{articleDate}</Typography>
            <Box
            sx={{
                width: '100%',
                maxWidth: '800px',
                overflow: 'hidden',
              }}
            >
                <img
                    src={singleArticle.article_img_url}
                    style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                    }}
                />
            </Box>
            <Box sx={{ mt: 4, mb: 4, maxWidth: 600}}>
                <Typography gutterBottom={true} >{singleArticle.body}</Typography>
            </Box>
            <Stack direction="row" alignItems="center" spacing={2}>
                <VotesCounter article_id={article_id} votes={singleArticle.votes}/>
                <Chip icon={<Comment />} label={singleArticle.comment_count + commentCount}/>
            </Stack>
        </Box>
        <CommentsList updateCommentCount={updateCommentCount} showComments={showComments} article_id={singleArticle.article_id}/>
        </>
        )
    }

export default SingleArticle