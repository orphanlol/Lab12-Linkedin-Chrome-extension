import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { render } from 'react-dom';
import { Store } from 'webext-redux';
import { Provider } from 'react-redux';
import { connect } from 'react-redux'

const store = new Store({
    portName: 'COUNTING'
})


class ConnectedInjectApp extends Component {
    constructor(props) {
        super(props)
    }

    sendBackend = () => {
        const firstName = localStorage.getItem("first_name")
        const lastName = localStorage.getItem('last_name')
        const userId = localStorage.getItem('user_id')
        store.dispatch({type: "GET_LOGIN_INFO", firstname: firstName, lastname: lastName, userid: userId})
    }

    
    render() {

        return (
            
            <div>
                {this.sendBackend()}
            </div>
        ) 
    }
}

const mapStateToProps = state => {
    return {

    }
}

export default connect(mapStateToProps)(ConnectedInjectApp)

window.addEventListener('load', () => {

    const injectDOM = document.createElement('div');
    injectDOM.className = 'inject-react';
    injectDOM.style.textAlign = 'center';
    document.body.appendChild(injectDOM);
    render(
    <Provider store={store}>
        <ConnectedInjectApp />
    </Provider>
    , injectDOM);
});
