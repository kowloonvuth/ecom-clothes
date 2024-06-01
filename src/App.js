import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShopPage from './components/shop/shop.component';
import './App.css';
import Header from './header/header.component';
import SignInAndSignUp from './pages/homepage/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import HomePage from './pages/homepage/homepage.components';

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubcribeFromAuth = null

  componentDidMount() {
    this.unsubcribeFromAuth = auth.onAuthStateChanged( async user => {
      createUserProfileDocument(user);
    });
  }

  componentWillUnmount(){
    this.unsubcribeFromAuth();
  }

  render() {
  return (
    <Router>
    <div>
    <Header currentUser={this.state.currentUser}/>
    <Routes>
      <Route exact path='/' element={<HomePage />}/>
      <Route path='/shop' element={<ShopPage />}/>
      <Route path='/signin' element={<SignInAndSignUp />}/>
    </Routes>
    </div>
    </Router>
  );
}
}

export default App;