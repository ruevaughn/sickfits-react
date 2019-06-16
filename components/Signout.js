import React, { Component } from "react";
import { SIGN_OUT_MUTATION } from "../src/graphql/mutations";
import { Mutation } from "react-apollo";
import { CURRENT_USER_QUERY } from "../src/graphql/queries";

const Signout = props => (
  <Mutation mutation={SIGN_OUT_MUTATION} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
    {(signOut, { data }) => {
      return <button onClick={signOut}>Sign Out</button>;
    }}
  </Mutation>
);

export default Signout;
