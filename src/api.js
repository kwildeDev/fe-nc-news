import axios from "axios";

const api = axios.create({
    baseURL: 'https://nc-news-m199.onrender.com/api'
})

// Articles

const getArticles = () => {
    return api.get('/articles').then(({ data }) => {
        return data.articles
    })
}

const getArticleById = (article_id) => {
    return api.get(`/articles/${article_id}`).then(({ data }) => {
        return data.article
    })
}

const getArticleVotesCount = (article_id) => {
    return api.get(`/articles/${article_id}`).then(({ data }) => {
        return data.article.votes
    })
}

const updateArticleVotes = (article_id, inc_votes) => {
    return api.patch(`/articles/${article_id}`,inc_votes).then(({ data }) => {
        return data.article
    })
}

// Comments

const getCommentsByArticleId = (article_id) => {
    return api.get(`/articles/${article_id}/comments`).then(({ data }) => {
        return data.comments
    })
}

export { getArticles, getArticleById, getArticleVotesCount, updateArticleVotes, getCommentsByArticleId }