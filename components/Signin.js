import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { SIGN_IN_MUTATION } from "../graphql/mutations";
import { CURRENT_USER_QUERY } from "../graphql/queries";
import Form from "./styles/Form";
import Error from "./ErrorMessage";

class Signin extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <Mutation
        mutation={SIGN_IN_MUTATION}
        variables={{ ...this.state }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signIn, { loading, error }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading...</p>;
          return (
            <Form
              onSubmit={async e => {
                e.preventDefault();
                this.setState({
                  email: "",
                  password: ""
                });
                const res = await signIn();
              }}
            >
              <Error error={error} />
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Sign In</h2>
                <label htmlFor="email">
                  Email
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                    onChange={this.handleChange}
                    value={this.state.email}
                  />
                </label>
                <label htmlFor="password">
                  Password
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    required
                    onChange={this.handleChange}
                    value={this.state.password}
                  />
                </label>
                <button type="submit">Sign In</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default Signin;
