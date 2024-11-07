import { useState, useEffect } from 'react';
import { getArticleVotesCount, updateArticleVotes } from '../api';

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
    <>
      <button onClick={handleVoteUp}>Up</button>
      <h4 className='votes'>Votes: </h4><p><span className='lighter'>{votesCount}</span></p>
      <button onClick={handleVoteDown}>Down</button>
    </>
  )
}

export default VotesCounter
