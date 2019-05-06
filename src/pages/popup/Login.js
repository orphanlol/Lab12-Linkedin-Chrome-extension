import React, {Component} from 'react';
import { connect} from 'react-redux';
import OAuth from 'oauthio-web'
import {
    login
} from '../background/actions'


class Login extends Component {
    constructor(props) {
        super(props);
    }

    
    

    render() {


        let isLogin = (
            <div>logout</div>
        )

        if (!this.props.login)
        {
            isLogin = (
                <button id='connect'>Connect</button>
            )
        }
            
        return (
            <div>
                {isLogin}
            </div>
        )
    }


}

const mapStateToProps = state => {
    return {
        login: state.login.isLogin
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)