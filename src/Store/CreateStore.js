import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createReducer from './CreateReducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createHashHistory as createHistory } from 'history'
import { routerMiddleware } from 'react-router-redux'
import {ljQueryWatchMiddleWare,mainQueryLoop,mainQueryFilter} from 'ljbase'

const STORE_KEY = '__store_classshow'

export default function configureStore(initialState = {}) {
    function handleChange () {
        window.sessionStorage.setItem(STORE_KEY, JSON.stringify(store.getState()))
    }

    const sagaMiddleware = createSagaMiddleware();
    const history = createHistory();
    const routemiddleware = routerMiddleware(history)
    const middlewares = [
      sagaMiddleware,
      routemiddleware,
      ljQueryWatchMiddleWare
    ];

    let defaultState = initialState
    if (process.env.NODE_ENV === 'development') {
        let __store = window.sessionStorage.getItem(STORE_KEY)
        if (__store) {
            defaultState = JSON.parse(__store)
        }
    }

    const store = createStore(
      createReducer(),
      defaultState,
      composeWithDevTools(applyMiddleware(...middlewares))
    );

    store.dispatch = mainQueryFilter(store.dispatch);
    //composeWithDevTools(applyMiddleware(...middlewares))

    // Extensions
    //store.runSaga = sagaMiddleware.run;
    store.asyncReducers = {}; // Async reducer registry
    sagaMiddleware.run(mainQueryLoop);
    if (process.env.NODE_ENV === 'development') {
        store.subscribe(handleChange)
    }
    return store;
}
