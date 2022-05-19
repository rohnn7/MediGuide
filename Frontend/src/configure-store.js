import {applyMiddleware, compose, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import Main from './Store/Reducer/reducer'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  main:Main,

})

export default function configureStore(preloadedState = {}){
    return createStore(
        rootReducer,
        preloadedState,
        composeEnhancers(applyMiddleware(thunk))
    )
}