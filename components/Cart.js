import { Query, Mutation } from "react-apollo";
import CartStyle from "./styles/CartStyles";
import Supreme from "./styles/Supreme";
import CloseButton from "./styles/CloseButton";
import SickButton from "./styles/SickButton";
import { LOCAL_STATE_QUERY } from "../graphql/queries";
import { TOGGLE_CART_MUTATION } from "../graphql/mutations";

const Cart = props => (
  <Mutation mutation={TOGGLE_CART_MUTATION}>
    {toggleCart => (
      <Query query={LOCAL_STATE_QUERY}>
        {({ data }) => (
          <CartStyle open={data.cartOpen}>
            <header>
              <CloseButton onClick={toggleCart} title="close">
                &times;
              </CloseButton>
              <Supreme>Your Cart</Supreme>
              <p>You have __ Items in your cart.</p>
            </header>

            <footer>
              <p>$10.10</p>
              <SickButton>Checkout</SickButton>
            </footer>
          </CartStyle>
        )}
      </Query>
    )}
  </Mutation>
);

export default Cart;
