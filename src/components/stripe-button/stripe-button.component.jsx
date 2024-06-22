import React from 'react';

import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51PUNfQ2Mjv8qSBsAXgxcXjelo0rEg0n6EFDdpNIFR2QxlQZm5IYAxibfFIPlHL2jZPut39AH7GG1L6KCRn2uuWO900ZtZ1CG0y'

    const onToken = token => {
        console.log(token);
        alert('Payment Succesful');
    }

    return(
        <StripeCheckout
            label='Pay Now'
            name = 'Ecom Clothes Ltd.'
            billingAddress
            shippingAddress
            image='https://sendeyo.com/up/d/f3eb2117da'
            description= {`Your total is ${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};


export default StripeCheckoutButton;