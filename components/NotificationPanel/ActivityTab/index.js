import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Wrapper
} from "app/NativeComponents/common";


import {
  appRedirect,
  setActivityPropertiesType,
  getTeamActivity
} from 'app/NativeActions';

import ActivityList from './ActivityList';

class ActivityTab extends Component {

  componentDidMount(){
    if(this.props.team_activity.length === 0){
      this.getActivity({load_type: "load"});
    }
  }

  getActivity({load_type = "load", search = "", begin = 0}){
    if(!this.props.team_activity_loading && !this.props.team_activity_refreshing){
      this.props.getTeamActivity({
        token: this.props.token,
        search: search,
        load_type: load_type,
        begin: begin
      });
    }
  }

  render() {
    if(this.props.notification_panel_tab == "activity"){
      return (
        <ActivityList
          {...this.props}
          getActivity={this.getActivity.bind(this)}
        />
      );
    }

    return <Wrapper />
  }
}

const mapStateToProps = ({ auth, settings, native, activity }) => {
  const { token, user } = auth;
  const { colors } = settings;
  const { isMobile, device } = native;

  const {
    team_activity,
    team_activity_loading,
    team_activity_refreshing,
    team_activity_loaded_all,
    team_activity_begin
  } = activity;

  return {
    token,
    user,
    isMobile,
    colors,
    device,

    team_activity,
    team_activity_loading,
    team_activity_refreshing,
    team_activity_loaded_all,
    team_activity_begin
  };
};

export default connect(
  mapStateToProps,
  {
    appRedirect,
    setActivityPropertiesType,
    getTeamActivity
  }
)(ActivityTab);
