import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import Forms from './components/views/Forms/Forms'
import NewForm from './components/views/Forms/NewForms'

class App extends Component {
    render() {
        return(
            <Router>
                <div>
                    <Switch>
                        <Route exact path='/' component={Forms} />
                        <Route path='/new-form' component={NewForm} />
                        <Redirect to='/' />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App