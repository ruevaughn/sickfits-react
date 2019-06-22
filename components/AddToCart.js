import React from "react";
import { Mutation } from "react-apollo";
import { ADD_TO_CART } from "../graphql/mutations";
import { CURRENT_USER_QUERY } from "../graphql/queries";
import Error from "./ErrorMessage";

class AddToCart extends React.Component {
  render() {
    const { id } = this.props;
    return (
      <Mutation
        mutation={ADD_TO_CART}
        variables={{ id }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(addToCart, { loading, error }) => {
          if (error) {
            alert(error.message);
          }
          return (
            <button onClick={addToCart} disabled={loading}>
              Add{loading && "ing"} To Cart
            </button>
          );
        }}
      </Mutation>
    );
  }
}

export default AddToCart;
