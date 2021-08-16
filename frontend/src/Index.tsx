import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'
import {
    ApolloClient,
    InMemoryCache,
    HttpLink,
    ApolloProvider
  } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";


import { Router } from "./router/Router";
import { AuthRouter } from "./router/AuthRouter";
import firebase from 'firebase';

const httpLink = new HttpLink({ uri: 'http://localhost:3000/graphql' });

const authLink = setContext((_, { headers }) => {
    return firebase.auth().currentUser?.getIdToken().then((token) => {
        return {
            headers: {
                ...headers,
                Authorization: token ? `Bearer ${token}` : "",
            }
        }
    })
});

const client =  new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });


export default function App() {
    return(
        <ApolloProvider client={client}>
            <BrowserRouter>
                <Router></Router>
                <AuthRouter></AuthRouter>
            </BrowserRouter>
        </ApolloProvider>
    )
}

ReactDom.render(<App />, document.getElementById("app"));
