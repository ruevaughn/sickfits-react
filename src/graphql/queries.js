import gql from "graphql-tag";

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

const ITEM_COUNT_QUERY = gql`
  query ITEM_COUNT_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

export { ALL_ITEMS_QUERY, ITEM_COUNT_QUERY };
