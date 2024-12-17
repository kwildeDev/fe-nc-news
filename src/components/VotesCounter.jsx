import { useState, useEffect } from 'react';
import { getArticleVotesCount, updateArticleVotes } from '../api';
import { Box, Button, Chip, IconButton, Stack, Typography } from '@mui/material';
import { ThumbDown, ThumbUp } from '@mui/icons-material';

const VotesCounter = ({article_id, votes}) => {
  const [votesCount, setVotesCount] = useState(0)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    setVotesCount(votes)
    getArticleVotesCount(article_id)
    .then((votesCount) => {
      setVotesCount(votesCount)
    })
    .catch((err) => {
      setError("There was an error")
    })
  },[])

  const handleVoteUp = () => {
    setVotesCount((currentVotesCount) => currentVotesCount + 1)
    setError(null)
    updateArticleVotes(article_id,{"inc_votes": 1}).catch((err) => {
      setVotesCount((currentVotesCount) => currentVotesCount -1)
      setError("Your vote was not successful. Please try again!")
    })
  }

  const handleVoteDown = () => {
    setVotesCount((currentVotesCount) => currentVotesCount - 1)
    setError(null)
    updateArticleVotes(article_id,{"inc_votes": -1}).catch((err) => {
      setVotesCount((currentVotesCount) => currentVotesCount +1)
      setError("Your vote was not successful. Please try again!")
    })
  }

  return (
    <Chip
      label={
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton onClick={handleVoteUp}><ThumbUp/></IconButton>
          <Typography variant="chip">{votesCount}</Typography>
          <IconButton onClick={handleVoteDown}><ThumbDown/></IconButton>
        </Box>
      }
      variant="filled"
    />
  )
}

export default VotesCounter
