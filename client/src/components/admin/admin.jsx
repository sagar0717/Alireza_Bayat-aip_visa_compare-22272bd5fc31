import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Applications from "./../visaApplications/applications";
import VisaTypes from "../visaType/visaTypes";
import VisaType from "../visaType/visaType";
import Countries from "../country/countries";
import Country from "../country/country";
import SideBar from "./sidebar";

class Admin extends Component {
  render() {
    return (
      <div>
        <SideBar className="active" />
        <Switch>
          <Route path="/admin/applications" component={Applications} />
          <Route path="/admin/visaTypes" component={VisaTypes} />
          <Route path="/admin/visatype" component={VisaType} />
          <Route path="/admin/countries" component={Countries} />
          <Route path="/admin/country" component={Country} />
        </Switch>
      </div>
    );
  }
}

export default Admin;
