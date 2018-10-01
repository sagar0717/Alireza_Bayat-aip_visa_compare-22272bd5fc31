import React, { Component } from "react";
import axios from "axios";
import Button from "./commonformcomponents/Button";
import Form from "./../common/form";
import { Link, Switch, Route } from "react-router-dom";
import VisaType from "./visaType";
import {
  getVisaTypes,
  deleteVisaTypes
} from "./../../services/visaTypeService";
import "./visaType.css";

class VisaTypes extends Component {
  constructor() {
    super();
    this.state = {
      visatypes: [],
      isLoading: true,
      errors: null
    };
  }

  async componentDidMount() {
    const { originalstate } = this.state;
    try {
      const { data } = await getVisaTypes();
      this.setState({
        visatypes: data,
        isLoading: false
      });
    } catch (ex) {
      this.setState({ originalstate });
      return;
    }
  }

  handleDeleteVisaType = async visaTypeId => {
    const originalstate = this.state;
    const visatypes = this.state.visatypes.filter(c => c._id !== visaTypeId);
    this.setState({ visatypes });
    try {
      await deleteVisaTypes(visaTypeId);
    } catch (ex) {
      console.log(ex);
      this.setState({ originalstate });
    }
  };

  render() {
    const { isLoading, visatypes } = this.state;
    console.log(this.state.visatypes);
    return (
      <div>
        <br />
        <Link to="/admin/visatype">
          <button className="btn btn-outline-primary">Add New Visa Type</button>
        </Link>
        <br />
        <br />
        <h2>VISA LISTING</h2>
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th className="text-center">Visa Group</th>
              <th className="text-center">Visa SubClass</th>
              <th className="text-center">Description</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {!isLoading ? (
              this.state.visatypes.map(visatype => (
                <tr key={visatype._id}>
                  <td className="align-middle">{visatype.visaGroup}</td>
                  <td className="align-middle">{visatype.visaSubClass}</td>
                  <td className="align-middle">{visatype.description}</td>
                  <td>
                    <Link
                      to={{
                        pathname: `/admin/visatype/${visatype._id}`,
                        id: visatype._id,
                        visaGroup: visatype.visaGroup,
                        visaSubClass: visatype.visaSubClass,
                        description: visatype.description
                      }}
                    >
                      <button
                        className="btn btn-outline-secondary"
                        style={buttonStyle}
                      >
                        Edit
                      </button>
                    </Link>
                  </td>
                  <td>
                    <Button
                      action={() => this.handleDeleteVisaType(visatype._id)}
                      title={"Delete"}
                      style={buttonStyle}
                      type="btn btn-danger"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </tbody>
        </table>
        <br />
        <br />
        <br />
      </div>
    );
  }
}
const buttonStyle = {
  margin: "10px 10px 10px 10px"
};

export default VisaTypes;
