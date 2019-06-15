import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { SIGN_UP_MUTATION } from "../src/graphql/mutations";
import Form from "./styles/Form";
import Error from "./ErrorMessage";

class Signup extends Component {
  state = {
    name: "",
    email: "",
    password: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    // Render a Form
    // Form needs to hit Mutation
    // User needs to be logged in via JWT and Cookie
    return (
      <Mutation mutation={SIGN_UP_MUTATION} variables={{ ...this.state }}>
        {(signUp, { loading, error }) => {
          if (loading) return <p>Loading...</p>;
          return (
            <Form
              onSubmit={async e => {
                e.preventDefault();
                const res = await signUp();
                this.setState = {
                  name: "",
                  email: "",
                  password: ""
                };
              }}
            >
              <Error error={error} />
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Sign up for an Account</h2>
                <label htmlFor="name">
                  Name
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    required
                    onChange={this.handleChange}
                    value={this.state.name}
                  />
                </label>
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
                <button type="submit">Sign Up</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default Signup;
