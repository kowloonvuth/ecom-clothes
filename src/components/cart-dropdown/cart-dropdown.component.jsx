import React from 'react';
import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';

import { selectCartItems } from '../../redux/cart/cart.selectors';

import CartItem from '../cart-item/cart-item.component';

import './cart-dropdown.style.scss';

import { createStructuredSelector } from 'reselect';

import { useNavigate } from 'react-router-dom';

import { toggleCartHidden } from '../../redux/cart/cart.actions'

const CartDropdown = ({ cartItems, dispatch, ...otherProps }) => {
    
    const navigate = useNavigate();

    const HandleCheckoutClick = () => {
        dispatch(toggleCartHidden());
        navigate('/checkout');
    };

    return (
        <div className='cart-dropdown'>
            <div className='cart-items'>
                {cartItems.length ? (
                    cartItems.map((cartItem) => <CartItem key={cartItem.id} item={cartItem} />)
                ) : (
                    <span className='empty-message'> Your cart is empty </span>
                )}
            </div>
            <CustomButton onClick={HandleCheckoutClick}> Go to CHECKOUT</CustomButton>
        </div>
    );
};

const mapStateToProps = createStructuredSelector ({
    cartItems: selectCartItems
});

const mapDispatchToProps = (dispatch) => ({
    dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(CartDropdown);
