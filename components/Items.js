import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import styled from "styled-components";

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;

const ItemsList = styled.div`
  display: "grid";
`;

class Items extends Component {
  render() {
    return (
      <Center>
        <p>Items </p>
        <Query query={ALL_ITEMS_QUERY}>
          {({ data, error, loading }) => {
            console.log(data);
            if (loading) {
              return <p> Loading...</p>;
            }
            if (error) {
              return <p> Error: {error.message}</p>;
            }
            {
              return data.items.map(item => {
                return <h1>{item.title}</h1>;
              });
            }
          }}
        </Query>
      </Center>
    );
  }
}

export default Items;
