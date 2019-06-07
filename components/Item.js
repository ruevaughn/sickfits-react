import React, { Component } from "react";
import PropTypes from "prop-types";

import Title from "./styles/Title";
import ItemStyles from "./styles/ItemStyles";
import PriceTag from "./styles/PriceTag";
import Link from "next/link";
import formatMoney from "../lib/formatMoney";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(where: { id: $id }) {
      id
    }
  }
`;

class Item extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired
  };

  deleteItem = async deleteItemMutation => {
    console.log(this.props.id);
    return deleteItemMutation({ variables: { id: this.props.id } });
  };

  render() {
    const { item } = this.props;
    return (
      <Mutation mutation={DELETE_ITEM_MUTATION} variables={this.props}>
        {(deleteItem, { error, loading }) => (
          <ItemStyles>
            {item.image && <img src={item.image} alt={item.title} />}
            <Link
              href={{
                pathname: "/item",
                query: { id: item.id }
              }}
            >
              <Title>
                <a>{item.title}</a>
              </Title>
            </Link>
            <PriceTag>{formatMoney(item.price)}</PriceTag>
            <p>{item.description}</p>
            <div className="buttonList">
              <Link
                href={{
                  pathname: "update",
                  query: { id: item.id }
                }}
              >
                <a>Edit ✏️</a>
              </Link>
              <button>Add To Cart</button>
              <button onClick={this.deleteItem(deleteItem())}>Delete</button>
            </div>
          </ItemStyles>
        )}
      </Mutation>
    );
  }
}

export default Item;
