import gql from "graphql-tag";
import { perPage } from "../config";

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage})  {
    items(first: $first, skip: $skip, orderBy: createdAt_DESC ) {
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

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      name
      email
      permissions
    }
  }
`;

const ALL_USERS_QUERY = gql`
  query users {
    users {
      id
      email
      name
      permissions
    }
  }
`;

export { ALL_ITEMS_QUERY, ITEM_COUNT_QUERY, CURRENT_USER_QUERY, ALL_USERS_QUERY };
