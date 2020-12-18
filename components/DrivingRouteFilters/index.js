import React, { Component } from "react";
import { connect } from "react-redux";

import { ModalContainer, WebContainer } from "app/NativeComponents/common";
import { Header } from "app/NativeComponents/snippets";

import Filters from './Filters'

import {
  saveRouteFilters,
  updateRouteFilter,
  updateSingleRouteFilter,
  initEditFilters,
  initEditRouteFilters,
  appRedirect,
  getTeam

} from "app/NativeActions";

class DrivingRouteFilters extends Component {

  checkIfNeedsToSave() {
    if (this.props.route_filters && this.props.editRouteFilters) {
      if (
        this.props.editRouteFilters.route_team_member !==
          this.props.route_filters.route_team_member ||
        this.props.editRouteFilters.start_date !==
          this.props.route_filters.start_date ||
        this.props.editRouteFilters.end_date !==
          this.props.route_filters.end_date
      ) {
        return true;
      }
    }

    return false;
  }

  exportRoutesString() {
    const {
      route_team_member,
      start_date,
      end_date
    } = this.props.route_filters;

    var export_string = "";

    if (start_date == null && end_date == null) {
      export_string =
        "v2/" +
        "routes/?token=" +
        this.props.token +
        "&type=export&limit=500&filter_team_member=" +
        route_team_member;
    } else {
      export_string =
        "v2/" +
        "routes/?token=" +
        this.props.token +
        "&type=export&limit=500&filter_team_member=" +
        route_team_member +
        "&filter_start_date=" +
        start_date +
        "&filter_end_date=" +
        end_date;
    }
    return export_string;
  }

  handleBack(){
    this.props.appRedirect({redirect: "goBack", payload:{remove: "route-filters"}})
  }

  render() {

    return (
      <ModalContainer>
        <Header
          title="Filter Driving Routes"
          leftButtonIcon={"arrow-back"}
          leftButtonAction={()=>this.handleBack()}
        />
        <WebContainer>
          <Filters {...this.props} handleBack={this.handleBack.bind(this)} checkIfNeedsToSave={this.checkIfNeedsToSave.bind(this)}/>
        </WebContainer>
      </ModalContainer>
    );



  }
}

const mapStateToProps = ({ auth, native, route, team }) => {
  const { token, user } = auth;
  const { device, platform } = native;

  const {
    route_filters,
    originalRouteFilters,
    editRouteFilters
  } = route;

  const {
    my_team,
    team_loading
  } = team;

  return {
    token,
    user,
    device,
    platform,

    my_team,
    team_loading,

    route_filters,
    originalRouteFilters,
    editRouteFilters

  };
};

export default connect(
  mapStateToProps,
  {
    saveRouteFilters,
    updateRouteFilter,
    updateSingleRouteFilter,
    initEditFilters,
    initEditRouteFilters,
    appRedirect,
    getTeam
  }
)(DrivingRouteFilters);
