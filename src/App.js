import './App.css';
import {Switch,Route} from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import {auth,createUserProfileDocument} from './firebase/firebase.util';
import React from 'react';



class App extends React.Component {
  constructor(){
    super();
    this.state = {
      currentUser:null
    }
  }

  unSubscribeFromAuth = null;

  componentDidMount(){
    //open subscription
    this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth=>{
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot=>{
          this.setState({
            currentUser:{
              id:snapshot.id,
              ...snapshot.data(),
          }});
          console.log(this.state);
        })
      }
      else{
        this.setState({currentUser:userAuth});
      }      
    });
  }

  componentWillUnmount(){
    this.unSubscribeFromAuth();
  }

  render(){
    return (
      <div>
      <Header currentUser={this.state.currentUser}/>
      <Switch>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/shop' component={ShopPage} />
      <Route exact path='/signin' component={SignInAndSignUpPage} />
      </Switch>     
      </div>
    )
  }
}

export default App;
