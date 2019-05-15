import React, { Component } from 'react'
import { render } from 'react-dom';
import { Store } from 'webext-redux';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import {Route, Redirect, BrowserRouter as Router} from 'react-router-dom'

const store = new Store({
    portName: 'COUNTING'
})


class App extends Component {
    constructor(props) {
        super(props)
    }

    componentDidUpdate() {
        
    }

    sendBackend = () => {
        const firstName = localStorage.getItem("firstName")
        const lastName = localStorage.getItem('lastName')
        const id = localStorage.getItem('id')
        store.dispatch({type: "GET_LOGIN_INFO", firstname: firstName, lastname: lastName, id: id})
        // return <Redirect to='/' />
    }

    injectIframe = () => {
        const inject = document.querySelector('body')
        const iframe = document.createElement('iframe');
        iframe.className = 'iframe'
        iframe.src = "chrome-extension://ahmiihehkjgljakabbilhepgnolajkkj/pages/iframe.html"
        iframe.width = '452px'
        iframe.style.zIndex = "2147483647";
        iframe.style.top = "0px"
        iframe.style.opacity = '1'
        iframe.style.position = 'fixed'
        iframe.style.height = '100%'
        iframe.style.display = 'block'
        iframe.style.right = '-4px'
        iframe.style.backgroundColor = 'white'
        inject.appendChild(iframe);
    }

    getLinkiedElemet = () => {
        const name = document.getElementsByClassName('pv-top-card-section__name')[0].innerText
        const jobTitle = document.getElementsByClassName('pv-top-card-section__headline')[0].innerText
        const location = document.getElementsByClassName('pv-top-card-section__location')[0].innerText
        
        store.dispatch({type: 'LINK_INFO', name: name, jobTitle: jobTitle, location: location})
    }

    
    render() {
        console.log(window.location.hostname)
        console.log(window.location.hostname === 'linkedinextension.netlify.com')

        let content = null;

        if (window.location.hostname === 'linkedinextension.netlify.com') {
            content = (
                <div>
                    {this.sendBackend()}
                </div>
            )
        }
        else if (window.location.hostname === 'www.linkedin.com') {
            content = (
                <div>
                    hello
                    {this.injectIframe()}
                    {this.getLinkiedElemet()}
                </div>
            )
        }
        

        return (
            <div>
                {content}
            </div>
        ) 
    }
}

const mapStateToProps = state => {
    return {

    }
}

export default connect(mapStateToProps)(App)

window.addEventListener('load', () => {

    const injectDOM = document.createElement('div');
    injectDOM.className = 'inject-react';
    injectDOM.style.textAlign = 'center';
    document.body.appendChild(injectDOM);
    render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
    , injectDOM);
});


