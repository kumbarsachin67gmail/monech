import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import AskQuestion from './core/AskQuestion'


const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
       
        <Route path="/" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/askquestion" exact component={AskQuestion} />
     
      </Switch>
    </BrowserRouter>
  );
};
export default Routes;
