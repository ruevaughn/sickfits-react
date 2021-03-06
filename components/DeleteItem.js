import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import { ALL_ITEMS_QUERY } from "./Items";

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

class DeleteItem extends Component {
  deleteItem = async deleteItemMutation => {
    if (confirm("Are you sure you want to delete this item?")) {
      const { id } = this.props;
      await deleteItemMutation().catch(err => {
        alert(err.message);
      });
    }
  };

  update = (cache, payload) => {
    // Read the Cache for the items we want
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
    // Filter the deleted item out
    data.items = data.items.filter(item => item.id !== payload.data.deleteItem.id);
    // Write the new data back to the cache
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
  };

  render() {
    const { id } = this.props;
    return (
      <Mutation mutation={DELETE_ITEM_MUTATION} variables={{ id }} update={this.update}>
        {(deleteItem, { error, loading }) => (
          <button onClick={() => this.deleteItem(deleteItem)}>
            {this.props.children}
          </button>
        )}
      </Mutation>
    );
  }
}

export default DeleteItem;
