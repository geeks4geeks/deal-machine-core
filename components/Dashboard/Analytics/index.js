import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, KeyboardView, Wrapper } from 'app/NativeComponents/common';
import { Header } from 'app/NativeComponents/snippets';

import Body from './Body';

import {
  toggleCanPop,
  toggleDrawer,
  lockDrawer,
  appRedirect,
  changeTab,

  getAnalytics,
  clearAllLeadFilters,
  applyFilters,
  changeAnalyticsDateOption,
  updateSingleAnlyticsFilters,
  setAnalyticsType
} from 'app/NativeActions';

class Analytics extends Component{

  componentDidMount(){
    /*mobile*/
    if(this.props.device == "mobile"){
      this.props.toggleCanPop("");
      this.props.lockDrawer(false)
    }

    this.props.getAnalytics({
      token: this.props.token,
      start_date: this.props.start_date,
      end_date: this.props.end_date,
      date_option: this.props.date_option,
      filters: this.props.analytics_filters
    });

    this.props.changeTab("analytics");

  }

  componentDidUpdate(prevProps){
    if((prevProps.date_option != this.props.date_option ||
      prevProps.start_date != this.props.start_date ||
      prevProps.end_date != this.props.end_date ||
      prevProps.analytics_filters != this.props.analytics_filters)
      && this.props.date_option && this.props.start_date && this.props.end_date && this.props.analytics_filters
    ){
      this.props.getAnalytics({
        token: this.props.token,
        start_date: this.props.start_date,
        end_date: this.props.end_date,
        date_option: this.props.date_option,
        filters: this.props.analytics_filters
      });
    }
  }


  render(){


    if(this.props.user.team_has_added_leads == 0){
      return <Wrapper />
    }

    return(
      <Body
        {...this.props}
      />
    );

  }
}

const mapStateToProps = ({ auth, native, drawer, analytics, settings }) => {
  const { token, user } = auth;
  const { device, isMobile } = native;
  const { stats, open } = drawer;
  const { colors } = settings;

  const {
    analytics_dates,
    active_deals,
    analytics_loading,
    analytics_refreshing,
    date_option,
    start_date,
    end_date,
    analytics_filters
  } = analytics;

  return {
    token,
    user,
    device,
    isMobile,
    stats,
    open,
    colors,

    analytics_dates,
    active_deals,
    analytics_loading,
    analytics_refreshing,

    date_option,
    start_date,
    end_date,

    analytics_filters
  }
}



export default connect(mapStateToProps, {
  toggleCanPop,
  toggleDrawer,
  lockDrawer,
  appRedirect,
  changeTab,
  getAnalytics,
  clearAllLeadFilters,
  applyFilters,
  changeAnalyticsDateOption,
  updateSingleAnlyticsFilters,
  setAnalyticsType
})(Analytics);
