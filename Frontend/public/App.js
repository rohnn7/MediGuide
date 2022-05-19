import logo from './logo.svg';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import React, { Component } from 'react';
import Sign from './Container/Sign/Sign';
import Result from './Container/Result/Result';
import Hospital from './Container/Hospitals/Hospital';

class App extends Component{
 

  render(){
    return(
      <div>
        <Switch>
            <Route path="/" exact component={Sign} />
            <Route path="/choose" exact component={Hospital} />
            <Route path="/result" exact component={Result} />
        </Switch>        
      </div>
    )
  }
}

export default App;
