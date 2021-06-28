import { combineReducers } from 'redux'

import articleReducer from './articleReducer'
import categoriesReducer from './categoryReducer'

export default combineReducers({articles: articleReducer, categories: categoriesReducer})