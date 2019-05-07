import React, { Component } from 'react'
import { render} from 'react-dom';
import { Store } from 'webext-redux';
import { Provider } from 'react-redux';
import { connect } from 'react-redux'
import {loginInfo} from '../background/actions'

const store = new Store({
    portName: 'COUNTING'
})

class Inject extends Component {
    constructor(props) {
        super(props)
    }

    sendBackend = () => {
        console.log('i hate u')
        const firstName = localStorage.getItem("first_name")
        const lastName = localStorage.getItem('last_name')
        const userId = localStorage.getItem('user_id')
        this.props.sendToBackground(firstName,lastName,userId)
    }

    
    render() {

        return (
            
            <div>
                {this.sendBackend()}
            </div>
        ) 
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = dispatch => {

    return {
        sendToBackground: (firstName, lastName, userId) => dispatch(loginInfo(firstName, lastName, userId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Inject)

if (window.location.hostname === 'linkedinextension.netlify.com') {

    window.addEventListener('load', () => {
        const injectDOM = document.createElement('iframe');
        injectDOM.className = 'inject-react';
        document.body.appendChild(injectDOM);
        render(
            <Provider store={store}>
                <Inject />
            </Provider>
            , injectDOM
        )
    })

} else if (window.location.hostname === 'www.linkedin.com') {
    console.log('i am here')
    window.addEventListener('load', () => {
        const injectDOM = document.createElement('iframe');
        injectDOM.className = 'inject-react';
        document.body.appendChild(injectDOM);
        render(
            <Provider store={store}>
                <Inject />
            </Provider>
            , injectDOM
        )
    })
}

