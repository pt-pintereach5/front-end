import { axiosWithAuth } from "../utils/axiosWithAuth"

export const ADD_ARTICLE = 'ADD_ARTICLE'
export const DELETE_ARTICLE = 'DELETE_ARTICLE'
export const FETCH_ARTICLE_LIST_START = 'FETCH_ARTICLE_LIST_START'
export const FETCH_ARTICLE_LIST_SUCCESS = 'FETCH_ARTICLE_LIST_SUCCESS'
export const FETCH_ARTICLE_LIST_FAIL = 'FETCH_ARTICLE_LIST_FAIL'

export const addArticle = (article) => {
    return({type:ADD_ARTICLE, payload:article})
}

export const deleteArticle = (id) => {
    return({type: DELETE_ARTICLE, payload:id})
}

export const getArticleList = () => dispatch => {
    dispatch({type:FETCH_ARTICLE_LIST_START});
    axiosWithAuth().get(`api/articles`)
    .then(res => {
        dispatch({type:FETCH_ARTICLE_LIST_SUCCESS, payload: res.data})
    })
    .catch(err => {
        dispatch({type: FETCH_ARTICLE_LIST_FAIL, payload: err})
    })
}