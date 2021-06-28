import { 
    ADD_CATEGORY,
    FETCH_CATEGORY_LIST_START,
    FETCH_CATEGORY_LIST_FAIL,
    FETCH_CATEGORY_LIST_SUCCESS
 } from '../actions/categoryActions'

const initialState = {
    category: [],
    error: '',
    isFetching: false
}

const reducer = (state=initialState, action ) => {
    switch(action.type) {
        case ADD_CATEGORY:
            return {
                ...state,
                category: [...state.category, action.payload]
            }
        case FETCH_CATEGORY_LIST_START:
            return {
                ...state,
                isFetching: true,
                 error: ''
            }
        case FETCH_CATEGORY_LIST_SUCCESS:
            return {
                ...state,
                category: action.payload,
                isFetching: false,
                error: ''
            }
        case FETCH_CATEGORY_LIST_FAIL:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

export default reducer;