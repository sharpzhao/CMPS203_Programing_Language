import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './AppContainers';
import Login from './LoginContainers';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory'
import { Route, Switch, Router } from 'react-router'
import { routerMiddleware } from 'react-router-redux'


const history = createHistory({ basename: '/' })

const middleware = routerMiddleware(history)

const store = createStore(
    rootReducer,
    applyMiddleware(thunk, middleware)
)

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/" component={App} />
            </Switch>
        </Router>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();