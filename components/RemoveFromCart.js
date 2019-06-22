import React from "react";
import { Mutation } from "react-apollo";
import styled from "styled-components";
import PropTypes from "prop-types";
import { CURRENT_USER_QUERY } from "../graphql/queries";
import { REMOVE_FROM_CART_MUTATION } from "../graphql/mutations";

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover: {
    color ${props => props.theme.red};
    cursor: pointer;
  }
`;

class RemoveFromCart extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  };
  // This gets called as soon as we get a response
  // back from the server after a mutation has been performed
  update = (cache, payload) => {
    // first read the cache
    console.log("Running remove from cart update fn");
    const data = cache.readQuery({
      query: CURRENT_USER_QUERY
    });
    console.log(data);
    // remove that item from the cart
    const cartItemId = payload.data.removeFromCart.id;
    data.me.cart = data.me.cart.filter(cartItem => cartItem.id !== cartItemId);
    // write it back to the cache
    cache.writeQuery({ query: CURRENT_USER_QUERY, data });
  };
  render() {
    return (
      <Mutation
        mutation={REMOVE_FROM_CART_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
      >
        {(removeFromCart, { loading, error }) => (
          <BigButton
            onClick={() => {
              removeFromCart().catch(err => alert(err.message));
            }}
            disabled={loading}
            title="Delete Item"
          >
            &times;
          </BigButton>
        )}
      </Mutation>
    );
  }
}

export default RemoveFromCart;
