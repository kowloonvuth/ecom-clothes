import React from 'react';
import { ReactComponent as Logo } from '../assets/crown.svg';
import { auth } from '.././firebase/firebase.utils';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { selectCartHidden } from '../redux/cart/cart.selectors';
import { selectCurrentUser } from '../redux/user/user.selector';

import CartIcon from '../components/cart-icon/cart-icon.component';
import CartDropdown from '../components/cart-dropdown/cart-dropdown.component';

import { HeaderContainer, LogoContianer, OptionsContainer, OptionDiv, OptionLink } from './header.styles';

const Header = ( { currentUser, hidden }) => (
    <HeaderContainer>
        <LogoContianer to="/">
            <Logo className='logo'/>
        </LogoContianer>
        <OptionsContainer>
            <OptionLink to='/shop'>
                SHOP
            </OptionLink>
            <OptionLink to='/shop'>
                CONTACT
            </OptionLink>
            {
                currentUser ?
                <OptionDiv onClick={() => auth.signOut()}>SIGN OUT</OptionDiv>
                :
                <OptionLink to='/signin'>SIGN IN</OptionLink>
            }
            <CartIcon />
        </OptionsContainer>
        {
        hidden ? null :
        <CartDropdown />
        }
    </HeaderContainer>
);

const mapStateToProps = createStructuredSelector ({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);