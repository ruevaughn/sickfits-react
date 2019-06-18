import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { REQUEST_RESET_MUTATION } from "../graphql/mutations";
import Form from "./styles/Form";
import Error from "./ErrorMessage";

class RequestReset extends Component {
  state = {
    email: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <Mutation mutation={REQUEST_RESET_MUTATION} variables={{ ...this.state }}>
        {(resetRequest, { loading, error, called }) => {
          return (
            <Form
              onSubmit={async e => {
                e.preventDefault();
                const success = await resetRequest();
                this.setState({ email: "" });
              }}
            >
              <Error error={error} />
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Request a password reset</h2>
                {!error && !loading && called && (
                  <p>Success! Check your email for a password reset.</p>
                )}
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
                <button type="submit">Request Reset</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default RequestReset;
