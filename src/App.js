import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import {Switch,Route} from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';

import {auth,createUserProfileDocument} from './firebase/firebase.util';

import {setCurrentUser} from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';

import './App.css';



class App extends React.Component {

  unSubscribeFromAuth = null;

  componentDidMount(){
    //open subscription
    const {setCurrentUser} = this.props;

    this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth=>{
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot=>{
          setCurrentUser({
               id:snapShot.id,
              ...snapShot.data(),        
        });
      });
    }
        setCurrentUser(userAuth);
    });
  }

  componentWillUnmount(){
    this.unSubscribeFromAuth();
  }

  render(){
    return (
      <div>
      <Header />
      <Switch>
      <Route exact path='/' component={HomePage} />
      <Route path='/shop' component={ShopPage} />
      <Route path='/checkout' component={CheckoutPage} />

      <Route 
        exact
        path='/signin'
        render={()=>
          this.props.currentUser ? (
            <Redirect to='/'/>
          ):(
            <SignInAndSignUpPage />
          )
        } />
      </Switch>     
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = (dispatch)=>({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
