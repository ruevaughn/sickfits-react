import React from "react";
import { Query } from "react-apollo";
import PaginationStyles from "./styles/PaginationStyles";
import { ITEM_COUNT_QUERY } from "../src/graphql/queries";

const Pagination = props => (
  <PaginationStyles>
    <Query query={ITEM_COUNT_QUERY}>
      {({ data, loading, error }) => {
        <p>Hi, I am the pagination!</p>;
      }}
    </Query>
  </PaginationStyles>
);

export default Pagination;
