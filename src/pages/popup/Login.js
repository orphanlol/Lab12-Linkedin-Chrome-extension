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

        localStorage.setItem('firstName', this.props.firstName)
        localStorage.setItem('lastName', this.props.lastName)
        localStorage.setItem('userId', this.props.userid)


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
        login: state.login.isLogin,
        firstName: state.login.firstName,
        lastName: state.login.lastName,
        userid: state.login.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)