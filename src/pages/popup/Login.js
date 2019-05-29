import React, { Component } from "react";
import { connect } from "react-redux";
import "./popup.css";

class Login extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    localStorage.setItem("firstName", this.props.firstName);
    localStorage.setItem("lastName", this.props.lastName);
    localStorage.setItem("id", this.props.id);
  }

  logout = () => {
    localStorage.clear();
  };

  render() {
    console.log(this.props);
    let isLogin = null;

    if (this.props.id === null) {
      isLogin = (
        <div className="popupBoxLogin">
          <a
            className="popupA"
            href="https://linkedinextension.netlify.com"
            target="_blank"
          >
            Login
          </a>
        </div>
      );
    } else {
      isLogin = (
        <div className="popupBoxLoggedIn">
          <div>Welcome Back, {this.props.firstName}</div>
          <div>
            <a
              className="popupA"
              href="https://linkedinextension.netlify.com"
              target="_blank"
            >
              Logout
            </a>
          </div>
        </div>
      );
    }

    return <div>{isLogin}</div>;
  }
}

const mapStateToProps = state => {
  return {
    firstName: state.login.firstName,
    lastName: state.login.lastName,
    id: state.login.id
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
