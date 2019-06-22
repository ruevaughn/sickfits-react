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
  static PropTypes = {
    id: PropTypes.string.isRequired
  };
  render() {
    return (
      <Mutation mutation={REMOVE_FROM_CART_MUTATION} variables={{ id: this.props.id }}>
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
