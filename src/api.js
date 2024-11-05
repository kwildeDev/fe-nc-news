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
const getUsers = () => {
    return api.get('/users').then(({ data }) => {
        return data.user
    })
}
export { getArticles, getUsers, getArticleById }