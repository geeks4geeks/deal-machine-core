import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Scroll
} from "app/NativeComponents/common";

import {
  appRedirect,
  switchNotifcationPanelTab
} from 'app/NativeActions';

import NotificationPanelTabs from './NotificationPanelTabs';
import TasksTab from './TasksTab';
import ActivityTab from './ActivityTab';

class NotificationPanel extends Component {

  componentDidMount(){

  }


  render() {

    return(
      <Scroll style={{height: "100%"}}>
        <NotificationPanelTabs {...this.props}/>
        <TasksTab notification_panel_tab={this.props.notification_panel_tab}/>
        <ActivityTab notification_panel_tab={this.props.notification_panel_tab}/>
      </Scroll>
    )

  }
}

const mapStateToProps = ({ auth, settings, native, activity }) => {
  const { token, user } = auth;
  const { colors } = settings;
  const { isMobile, device } = native;
  const { notification_panel_tab } = activity;

  return {
    token,
    user,
    isMobile,
    colors,
    device,
    notification_panel_tab
  };
};

export default connect(
  mapStateToProps,
  {
    appRedirect,
    switchNotifcationPanelTab
  }
)(NotificationPanel);
