import React, { Component } from "react";
import { Mutation } from "react-apollo";
import PropTypes from "prop-types";
import { RESET_PASSWORD_MUTATION } from "../src/graphql/mutations";
import { CURRENT_USER_QUERY } from "../src/graphql/queries";
import Form from "./styles/Form";
import Error from "./ErrorMessage";

class Reset extends Component {
  static propTypes = {
    resetToken: PropTypes.string.isRequired
  };
  state = {
    password: "",
    confirmPassword: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <Mutation
        mutation={RESET_PASSWORD_MUTATION}
        variables={{
          resetToken: this.props.resetToken,
          ...this.state
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(resetRequest, { loading, error, called }) => {
          return (
            <Form
              onSubmit={async e => {
                e.preventDefault();
                await resetRequest();
                this.setState({ password: "", confirmPassword: "" });
              }}
            >
              <Error error={error} />
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Reset your Password</h2>
                {!error && !loading && called && <p>Your Password has been changed!</p>}
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
                <label htmlFor="confirmPassword">
                  Confirm Your Password
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    required
                    onChange={this.handleChange}
                    value={this.state.confirmPassword}
                  />
                </label>
                <button type="submit">Reset your Password</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default Reset;
