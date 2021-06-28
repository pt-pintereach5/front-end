import { axiosWithAuth } from '../utils/axiosWithAuth'

export const ADD_CATEGORY = 'ADD_CATEGORY'
export const FETCH_CATEGORY_LIST_START = 'FETCH_CATEGORY_LIST_START'
export const FETCH_CATEGORY_LIST_SUCCESS= 'FETCH_CATEGORY_LIST_SUCCESS'
export const FETCH_CATEGORY_LIST_FAIL = 'FETCH_CATEGORY_LIST_FAIL'


export const addCategory = (category) => {
    return({type:ADD_CATEGORY, payload:category})
}

export const getCategoryList = () => dispatch => {
    dispatch({type:FETCH_CATEGORY_LIST_START});
    axiosWithAuth().get(`api/categories`)
    .then(res => {
        dispatch({type:FETCH_CATEGORY_LIST_SUCCESS, payload: res.data})
    })
    .catch(err => {
        dispatch({type: FETCH_CATEGORY_LIST_FAIL, payload: err})
    })
}
