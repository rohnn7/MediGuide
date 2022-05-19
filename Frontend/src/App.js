import logo from './logo.svg';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import React, { Component } from 'react';
import Sign from './Container/Sign/Sign';
import Result from './Container/Result/Result';
import Hospital from './Container/Hospitals/Hospital';
import Detail from './Container/Detail/Detail';
import Blog from './Container/Blogs/Blog';


class App extends Component{
 

  render(){
    return(
      <div>
        <Switch>
            <Route path="/" exact component={Sign} />
            <Route path="/choose" exact component={Hospital} />
            <Route path="/result" exact component={Result} />
            <Route path="/solution/:id" exact component={Detail} />
            <Route path="/blogs" exact component={Blog} />
        </Switch>        
      </div>
    )
  }
}

export default App;
