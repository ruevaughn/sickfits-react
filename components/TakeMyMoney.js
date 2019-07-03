import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { Mutation } from "react-apollo";
import Router from "next/router";
import NProgress from "nprogress";
import PropTypes from "prop-types";
import calcTotalPrice from "../lib/calcTotalPrice";
import Error from "./ErrorMessage";
import User from "./User";
import { CURRENT_USER_QUERY } from "../graphql/queries";
import totalItems from "../lib/cartUtils";

class TakeMyMoney extends React.Component {
  onToken = res => {
    console.log("On Token Return");
    console.log(res);
  };
  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <StripeCheckout
            amount={calcTotalPrice(me.cart)}
            name="Sick Fits"
            description={`Order Of ${totalItems(me.cart)} items`}
            image={me.cart[0].item && me.cart[0].item.image}
            stripeKey="pk_test_dkg9Gg7RRHJOYPxvEvaf1G8J"
            currency="USD"
            email={me.email}
            token={res => this.onToken(res)}
          >
            {/* <p>Checkout</p> */}
            {this.props.children}
          </StripeCheckout>
        )}
      </User>
    );
  }
}

export default TakeMyMoney;
