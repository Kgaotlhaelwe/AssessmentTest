import React , {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Form from "./components/form" ;
import Home from './components/Home' ;
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import M from 'materialize-css/dist/js/materialize.min.js';
import 'materialize-css/dist/css/materialize.min.css' ;
import {Provider} from "react-redux" ;
import store from "./store" ;

import { loadUser } from './actions/authAction';

class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());

    console.log(this.props.auth)
  }

 render(){
  return (


    <Provider store={store}>
      <Router> 
    <div className="App">

      <Switch>
      <Route exact path='/' component={Form} />
      <Route exact path='/home' component={Home} />
      </Switch>
    
    </div>
    </Router>
    </Provider>
    
  );
 }
  
}


export default App;
