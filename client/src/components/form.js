import React, { Component } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import 'materialize-css/dist/css/materialize.min.css';

import PropTypes from 'prop-types';
import { register } from "../actions/authAction";
import { login } from '../actions/authAction';
import { connect } from 'react-redux';

class Form extends Component {
    state = {
        showSignUp: false,
    };
    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;

        console.log(isAuthenticated)
        if (error !== prevProps.error) {
            // Check for register error
            if (error.id === 'REGISTER_FAIL') {
                M.toast({ html: error.msg.msg })
                console.log(error.msg.msg)
                console.log(this.state)
            } if (error.id === 'LOGIN_FAIL') {
                console.log(error.msg.msg)
                M.toast({ html: error.msg.msg })
                //this.setState({ msg: error.msg.msg });
            }
            else {
                console.log("Home page")
                //this.props.history.push("/home");
            }
        }

        if (isAuthenticated) {
            this.props.history.push('/home');
        }
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    register = () => {

        this.setState({
            showSignUp: true,
        })
        const userName = document.getElementById("userName").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const passlegth = password.length
        console.log(passlegth)

        let atpos = email.indexOf("@");
        let dotpos = email.lastIndexOf(".");

        if (userName == "" && email == "" && password == ""){
            M.toast({ html: "Please enter all details" })

        } else if (userName == ""){
            M.toast({ html: "Please enter user name" })
        } else if (email == ""){
            M.toast({ html: "Please enter email" })
        }else if(password == ""){
            M.toast({ html: "Please enter password" })
        }else if (atpos < 1 || (dotpos - atpos < 2)) {
            alert("Please enter correct email ID")
            
            return false;
        } else if (passlegth < 5) {
            alert("Please enter atleat 6 characters")

        } else {
            const user = {
                name: userName,
                email: email,
                password: password
            }

            this.props.register(user)
            this.props.history.push('/home');

        }


        console.log(this.state.showSignUp);


    }


    login = e => {
        e.preventDefault();
        const email = document.getElementById("loginemail").value;
        const password = document.getElementById("loginpassword").value;
        const login = {
            email: email,
            password: password
        }
        this.props.login(login)

        const { isAuthenticated, user } = this.props.auth;
        console.log(login)
        console.log(isAuthenticated)
    }


    switchContent = () => {
        this.setState({
            showSignUp: true,
        })


    }


    goBackToLogin = () => {
        this.setState({
            showSignUp: false,
        })
    }
    render() {
        const { isAuthenticated, user } = this.props.auth;
        console.log(user)
        console.log(isAuthenticated)
        return (
            <div>
                {this.state.showSignUp ? <div class="container" id="container">
                    <form action="#">
                        <h1>Create Account</h1>
                       
                        <input type="text" placeholder="Name" id="userName" />
                        <input type="email" placeholder="Email" id="email" />
                        <input type="password" placeholder="Password" id="password" />
                        <button onClick={this.register}>Sign Up</button>
                    </form>

                    <div className="loginBackBtn">

                        <a href="#" onClick={this.goBackToLogin}>You have account already</a>
                    </div>

                </div> :
                    <div class="container" id="container">
                        <div class="form-container sign-in-container">
                            <form action="#">
                                <h1>Sign in</h1>
                                <span>or use your account</span>
                                <input type="email" placeholder="Email" id="loginemail" />
                                <input type="password" placeholder="Password" id="loginpassword" />
                                <a href="#">Forgot your password?</a>
                                <button onClick={this.login}>Sign In</button>
                            </form>
                        </div>


                        <div class="overlay-container">
                            <div class="overlay">
                                <div class="overlay-panel overlay-left">
                                    <h1>Welcome Back!</h1>
                                    <p>To keep connected with us please login with your personal info</p>
                                    <button class="ghost" id="signIn">Sign In</button>
                                </div>
                                <div class="overlay-panel overlay-right">
                                   
                                    <p>Enter your personal details and start journey with us</p>
                                    <button onClick={this.switchContent} class="ghost" id="signUp">Sign Up</button>
                                </div>
                            </div>
                        </div>

                    </div>

                }




            </div>
        );
    }
}



const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    auth: state.auth
});

export default connect(mapStateToProps, { register, login })(Form);