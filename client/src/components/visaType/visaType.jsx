import React, { Component } from "react";
import axios from "axios";
import Joi from "joi-browser";
import Form from "./../common/form";
import Button from "./commonformcomponents/Button";
import { Link } from "react-router-dom";
import { setVisaType, updateVisaType } from "../../services/visaTypeService";

class VisaType extends Form {
  state = {
    data: {
      visaGroup: this.props.location.visaGroup || "",
      visaSubClass: this.props.location.visaSubClass || "",
      description: this.props.location.description || ""
    },
    errors: {},
    errObj: {}
  };

  schema = {
    visaGroup: Joi.string().required(),
    visaSubClass: Joi.string()
      .min(3)
      .required(),
    description: Joi.string().required()
  };

  doSubmit = async () => {
    let userData = this.state.data;
    if (this.props.location.pathname.match("visatype/")) {
      try {
        await updateVisaType(userData, this.props.location.id);
      } catch (error) {
        if (error.response.status === 500) {
          console.log(error.response);
          alert("Visa Type Already Exist");
        }
      }
    } else {
      try {
        await setVisaType(userData);
      } catch (error) {
        if (error.response.status === 500) {
          console.log(error.response);
          alert("Visa Type Already Exist");
        }
      }
    }
  };

  handleClearForm = e => {
    console.log(this);
    e.preventDefault();
    this.setState({
      data: {
        visaGroup: "",
        visaSubClass: "",
        description: ""
      }
    });
  };

  render() {
    return (
      <div>
        <h1> Add New Visa Type</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput(
            "visaGroup",
            "Visa Group",
            "text",
            "form-control col-md-6",
            "Enter details for Visa Group"
          )}
          {this.renderInput(
            "visaSubClass",
            "Visa SubClass",
            "number",
            "form-control col-md-6",
            "Enter details for Visa Subclass(Only Number allowed)"
          )}
          {this.renderInput(
            "description",
            "Visa Description",
            "text",
            "form-control col-md-6",
            "Enter description for the visa type"
          )}
          {this.renderButton("Submit")}
          <Button
            action={this.handleClearForm}
            type="btn btn-outline-primary"
            title={"Clear"}
          />
          <Link to="/admin/visatypes">
            <button className="btn btn-outline-primary">Back</button>
          </Link>
        </form>
      </div>
    );
  }
}

const buttonStyle = {
  margin: "10px 10px 10px 10px"
};

export default VisaType;
