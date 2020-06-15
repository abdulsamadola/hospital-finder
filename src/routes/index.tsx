import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import Home from "../components/Home/Home";
import SignIn from "../components/SignIn/SignIn";
import SignUp from "../components/SignUp/SignUp";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});
const Routes = (): JSX.Element => (
  <ApolloProvider client={client}>
    <AuthProvider>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route path="/SignUp" exact component={SignUp} />
          <Route path="/SignIn" exact component={SignIn} />
        </Switch>
      </Router>
    </AuthProvider>
  </ApolloProvider>
);

export default Routes;
