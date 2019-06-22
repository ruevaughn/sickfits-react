import React from "react";
import { Mutation } from "react-apollo";
import { ADD_TO_CART } from "../graphql/mutations";

class AddToCart extends React.Component {
  render() {
    const { id } = this.props;
    return (
      <Mutation mutation={ADD_TO_CART} variables={{ id }}>
        {addToCart => <button onClick={addToCart}>Add To Cart</button>}
      </Mutation>
    );
  }
}

export default AddToCart;
