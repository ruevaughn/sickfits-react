import React from "react";
import { Query } from "react-apollo";
import Head from "next/head";
import Link from "next/link";
import PaginationStyles from "./styles/PaginationStyles";
import { ITEM_COUNT_QUERY } from "../src/graphql/queries";
import { perPage } from "../config";

const Pagination = props => (
  <Query query={ITEM_COUNT_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <p>Loading...</p>;
      const count = data.itemsConnection.aggregate.count;
      const page = props.page;
      const pages = Math.ceil(count / perPage);
      return (
        <PaginationStyles>
          <Head>
            <title>
              Sick Fits - Page {page} of {pages}
            </title>
          </Head>
          <Link
            prefetch
            href={{
              pathName: "items",
              query: { page: page - 1 }
            }}
          >
            <a className="prev" aria-disabled={page <= 1}>
              Prev
            </a>
          </Link>
          <p>
            {page} of {pages}
          </p>
          <p>{count} Items Total</p>
          <Link
            prefetch
            href={{
              pathName: "items",
              query: { page: page + 1 }
            }}
          >
            <a className="prev" aria-disabled={page >= pages}>
              Next
            </a>
          </Link>
        </PaginationStyles>
      );
    }}
  </Query>
);

export default Pagination;
