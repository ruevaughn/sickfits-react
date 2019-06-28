import React from "react";
import Downshift from "downshift";
import Router from "next/router";
import { ApolloConsumer } from "react-apollo";
import debounce from "lodash.debounce";
import { DropDown, DropDownItem, SearchStyles } from "./styles/DropDown";
import { SEARCH_ITEMS_QUERY } from "../graphql/queries";
// import { SEARCH_ITEMS_QUERY } from "../graphql/queries";

class AutoComplete extends React.Component {
  state = {
    items: [],
    loading: false
  };
  onChange = debounce(async (e, client) => {
    console.log("Searching...");
    this.setState({ loading: true });
    // Manually query apollo client
    const res = await client.query({
      query: SEARCH_ITEMS_QUERY,
      variables: { searchTerm: e.target.value }
    });

    this.setState({
      items: res.data.items,
      loading: false
    });
    // Update cache?
  }, 350);
  render() {
    return (
      <SearchStyles>
        <div>
          <ApolloConsumer>
            {client => (
              <input
                type="search"
                onChange={e => {
                  e.persist();
                  this.onChange(e, client);
                }}
              />
            )}
          </ApolloConsumer>
          <DropDown>
            {this.state.items.map(item => (
              <DropDownItem key={item.id}>
                <img width="50" src={item.image} alt={item.title} />
                {item.title}
              </DropDownItem>
            ))}
          </DropDown>
        </div>
      </SearchStyles>
    );
  }
}

export default AutoComplete;
