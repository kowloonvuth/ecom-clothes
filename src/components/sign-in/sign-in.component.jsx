import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';
import './sign-in.style.scss';

class SignIn extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    // checking the currentUser propeties when inspecting in console
    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
            console.log('[{currentUser}]:', user);
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { email, password } = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({ email: '', password: '' });
        } catch (error) {
            console.log(error);
        }
        console.log(this.handleSubmit);
    };

    handleChange = event => {
        const {value, name} = event.target;

        this.setState({ [name]: value })
    }

    render() {
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                           name='email' 
                           type="email" 
                           value={this.state.email} 
                           label= 'email'
                           handleChange = {this.handleChange}
                           required />
                    <FormInput 
                           name='password' 
                           type="password" 
                           label='password'
                           value={this.state.password}
                           handleChange = {this.handleChange}
                           required />
                    <div className='buttons'>
                        <CustomButton type='submit'>SIGN IN</CustomButton>
                        <CustomButton className='google-button' onClick={ signInWithGoogle } isGoogleSignIn>
                            {' '}
                            SIGN IN WITH GOOGLE
                            {' '}
                        </CustomButton>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignIn;