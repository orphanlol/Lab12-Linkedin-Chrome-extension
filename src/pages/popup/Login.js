import React, {Component} from 'react';
import { connect } from 'react-redux';
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
                <a href='https://linkedinextension.netlify.com/api/auth/login' target='_blank'>Login In</a>
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
        Login: () => dispatch(login())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)