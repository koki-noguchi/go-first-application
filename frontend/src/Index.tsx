import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
  } from "@apollo/client";

import { Router } from "./router/Router";

const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    cache: new InMemoryCache()
  });

export default function App() {
    return(
        <ApolloProvider client={client}>
            <BrowserRouter>
                <Router></Router>
            </BrowserRouter>
        </ApolloProvider>
    )
}

ReactDom.render(<App />, document.getElementById("app"));
