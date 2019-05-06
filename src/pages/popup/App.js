import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import Login from './Login'


class App extends Component {



    render() {
        return(
            <Router>
                <div>
                    <Switch>
                        <Route exact path='/login' component={Login} />
                        <Redirect to='/login' />
                    </Switch>
                </div>
            </Router>
        )
    }
}


export default App