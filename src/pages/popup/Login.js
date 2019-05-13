import React, {Component} from 'react';
import { connect } from 'react-redux';


class Login extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        localStorage.setItem('firstName', this.props.firstName)
        localStorage.setItem('lastName', this.props.lastName)
        localStorage.setItem('id', this.props.id)

    }

    logout = () => {
        
    }
    

    render() {



        let isLogin = null

        if (this.props.Id === null)
        {
            isLogin = (
                <a href='https://linkedinextension.netlify.com' target='_blank'>Login In</a>
            )
        } else {
            isLogin = (
                <div>
                    <div>
                        Welcome Back {this.props.firstName}
                    </div>
                    <div>
                        <a href='https://linkedinextension.netlify.com' target='_blank'>Logout</a>
                    </div>
                </div>
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
        firstName: state.login.firstName,
        lastName: state.login.lastName,
        id: state.login.id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)