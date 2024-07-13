import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ShopPage from './components/shop/shop.component';
import { connect } from 'react-redux';

import './App.css';
import Header from './header/header.component';
import SignInAndSignUp from './pages/homepage/sign-in-and-sign-up/sign-in-and-sign-up.component';

import { auth } from './firebase/firebase.utils';
import { selectCurrentUser } from './redux/user/user.selector';
import { checkUserSession } from './redux/user/user.action';
import { createStructuredSelector } from 'reselect';

import CheckoutPage from './pages/homepage/checkout/checkout.component';

import HomePage from './pages/homepage/homepage.components';


class App extends React.Component {
  unsubcribeFromAuth = null

  componentDidMount() {


     this.unsubcribeFromAuth = auth.onAuthStateChanged( async userAuth => {
        const { checkUserSession } = this.props;
        checkUserSession();
      });
  }

  componentWillUnmount(){
    this.unsubcribeFromAuth();
  }

  render() {
    const {match} = this.props;
  return (
    <Router>
    <div>
    <Header />
    <Routes>
      <Route exact path='/' element={<HomePage />}/>
      <Route path='/shop/*' element={<ShopPage match={match}/>}/>
      <Route exact path='/checkout' element={<CheckoutPage />} />
      <Route exact 
             path='/signin' 
             element={this.props.currentUser ? <Navigate to ='/'/> : <SignInAndSignUp />} />
    </Routes>
    </div>
    </Router>
  );
}
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})


export default connect(mapStateToProps, mapDispatchToProps)(App);