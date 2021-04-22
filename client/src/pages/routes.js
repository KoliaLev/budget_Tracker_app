import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { CreatePage } from "./../pages/CreatePage";
import { AuthPage } from "./AuthPage";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/create">
          <CreatePage />
        </Route>
        <Redirect to="/create" />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/auth">
        <AuthPage />
      </Route>
      <Redirect to="/auth" />
    </Switch>
  );
};
