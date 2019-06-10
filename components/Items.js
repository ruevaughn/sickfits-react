// Libraries
import React, { Component } from "react";
import { Query } from "react-apollo";
import styled from "styled-components";

// Components
import Item from "./Item";
import Pagination from "./Pagination";

// Graphql Queries
import { ALL_ITEMS_QUERY } from "../src/graphql/queries";

const Center = styled.div`
  text-align: center;
`;

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

class Items extends Component {
  render() {
    return (
      <Center>
        <p>Items </p>
        <Pagination />
        <Query query={ALL_ITEMS_QUERY}>
          {({ data, error, loading }) => {
            if (loading) {
              return <p> Loading...</p>;
            }
            if (error) {
              return <p> Error: {error.message}</p>;
            }
            return (
              <ItemsList>
                {data.items.reverse().map(item => {
                  return <Item item={item} key={item.id} />;
                })}
              </ItemsList>
            );
          }}
        </Query>
        <Pagination />
      </Center>
    );
  }
}

export default Items;
export { ALL_ITEMS_QUERY };
