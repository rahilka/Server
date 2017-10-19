import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';

class Payments extends Component {
	render() {
		debugger;

		return (
			<StripeCheckout
				amount={500} //5$ in us currency = 500 cents
				token={token => console.log(token)}
				stripeKey={process.env.REACT_APP_STRIPE_KEY}
			/>
		);
	}
}

export default Payments;