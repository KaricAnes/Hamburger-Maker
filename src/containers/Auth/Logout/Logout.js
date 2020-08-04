import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions/index";
import { Redirect } from "react-router-dom";

class Logout extends Component {
  //Ako user klikne na LogOut button u NAvigationITems, bit cemo baceni na ovu komponenetu koja ce nas odlogovati i vratiti na pocetnu
  componentDidMount() {
    debugger;
    this.props.onLogout(); //mogao sam ovdje poslati (this.props.history) i imao ih push opciju
    debugger;
  }

  render() {
    debugger;
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = (dispatch) => {
  //debugger;
  return {
    onLogout: () => dispatch(actionCreators.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
