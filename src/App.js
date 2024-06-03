import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShopPage from './components/shop/shop.component';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.action';

import './App.css';
import Header from './header/header.component';
import SignInAndSignUp from './pages/homepage/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import HomePage from './pages/homepage/homepage.components';

class App extends React.Component {
  unsubcribeFromAuth = null

  componentDidMount() {
    const { setCurrentUser } = this.props;


    this.unsubcribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
            setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
          });
        });
      }
      else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount(){
    this.unsubcribeFromAuth();
  }

  render() {
  return (
    <Router>
    <div>
    <Header />
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

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(App);