import React from 'react';
import FormInput from '../form-input/form-input.component';
import './sign-in.styles.scss';
import CustomButton from '../custom-button/custom-button.component';

import {signInWithGoogle} from '../../firebase/firebase.util';

class SignIn extends React.Component{
    constructor(){
        super();
        this.state = {
            email:'',
            password:'',
        }
    }

    handlesubmit = event =>{
        event.preventDefault();
        this.setState({email:'',password:''});
    }

    handleChange = event =>{
        event.preventDefault();
        const {value,name} = event.target;
        this.setState({[name]:value});
    }

    render(){
        return(
            <div className='sign-in'>
                <h2>I already have account</h2>
                <span>Sign in with your email and password</span>
            <form onSubmit={this.handlesubmit}>
                <FormInput name='email' type='email' label='email' value={this.state.email} handleChange={this.onChange} required />
                <FormInput name='password' type='password' label='password' value={this.state.email} handleChange={this.onChange} required />
                <div className='buttons'>
                <CustomButton type='submit' value='Submit Form'>Sign In</CustomButton>
                <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign in with Google </CustomButton>
                </div>                
            </form>
            </div>
        )
    }
}
export default SignIn;
