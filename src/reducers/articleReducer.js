import { 
    ADD_ARTICLE, 
    DELETE_ARTICLE,
    FETCH_ARTICLE_LIST_FAIL,
    FETCH_ARTICLE_LIST_START,
    FETCH_ARTICLE_LIST_SUCCESS 
} from '../actions/articleActions';

const initialState = {
    articles: [],
    error: '',
    isFetching: false
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case FETCH_ARTICLE_LIST_START:
            return {
                ...state,
                isFetching: true,
                error: ''
            }
        case FETCH_ARTICLE_LIST_SUCCESS:
            return {
                ...state,
                articles: action.payload,
                isFetching: false,
                error: ''
            }
        case FETCH_ARTICLE_LIST_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case ADD_ARTICLE:
            return {
                ...state,
                articles: [...state.articles, action.payload]
            }
        case DELETE_ARTICLE:
            return {
                articles: state.articles.filter(article=> (action.payload !== article.article_id))
            }
        default:
            return state
    }
 }

export default reducer;