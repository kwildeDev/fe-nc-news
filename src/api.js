import axios from "axios";

const api = axios.create({
    baseURL: 'https://nc-news-m199.onrender.com/api'
})

// Articles

const getArticles = (topicSlug, sortBy, orderBy) => {
    return api.get('/articles', {
        params: {
            topic: topicSlug,
            sort_by: sortBy,
            order: orderBy,
        }
    }).then(({ data }) => {
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

// Topics

const getTopics = () => {
    return api.get('/topics').then(({ data }) => {
        return data.topics
    })
}

// Comments

const getCommentsByArticleId = (article_id) => {
    return api.get(`/articles/${article_id}/comments`).then(({ data }) => {
        return data.comments
    })
}

const postComment = (article_id, commentFormData) => {
    return api.post(`/articles/${article_id}/comments`,
        {
            article_id: article_id,
            author: commentFormData.author,
            body: commentFormData.body
        })
        .then(({ data }) => {
        return data.comment
    })
}

const deleteComment = (comment_id) => {
    return api.delete(`/comments/${comment_id}`)
}
export { getArticles, getArticleById, getArticleVotesCount, updateArticleVotes, getTopics, getCommentsByArticleId, postComment, deleteComment }