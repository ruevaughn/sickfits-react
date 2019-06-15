import gql from "graphql-tag";

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

const SIGN_UP_MUTATION = gql`
  mutation SIGN_UP_MUTATION($email: String!, $password: String!, $name: String!) {
    signUp(email: $email, password: $password, name: $name) {
      id
      email
      name
    }
  }
`;

export { CREATE_ITEM_MUTATION, SIGN_UP_MUTATION };
