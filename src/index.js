import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { Spinner } from './Spinner'
// import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import firebase from './firebase';

import { createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension'

import { rootReducer } from './reducers'
import { setUser, setLoading } from './actions'

const store = createStore(rootReducer, composeWithDevTools())

const Root = ({ history }) => {
    const { loading } = useSelector(state => ({
        ...state.loadingReducer
    }))
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setLoading(true))
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                dispatch(setUser(user))
                history.push('/')
                dispatch(setLoading(false))
            } else {
                history.push('/login')
                dispatch(setLoading(false))
            }
        })
    }, [])
    return ( loading ? <Spinner /> : (
            <Switch>
            <Route exact path="/" component={App} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            </Switch>
        )
    )
}

const RootWithAuth = withRouter(Root)

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <RootWithAuth />
        </Router>
    </Provider>
, document.getElementById('root'));