import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Wrapper } from 'app/NativeComponents/common';

import {
  mobileToggleDrawer,
  toggleDrawer,
  toggleActionSheet,
  stopTrackedRoute,

  toggleHighlightFilters,
  resetEditedFilters,
  selectTeamFilter,
  setModal,
  toggleModal,

  appRedirect
} from 'app/NativeActions'

import Search from './Search';
import Buttons from './Buttons';

class MapTop extends PureComponent {


  render() {
    return (
      <Wrapper
      style={{
        position:"absolute",
        top: 0,
        left: 0,
        right: 0
      }}>

        <Search
          {...this.props}
        />
        <Buttons
          user={this.props.user}
          plan_modules={this.props.plan_modules}
          map_mode={this.props.map_mode}
          toggleActionSheet={this.props.toggleActionSheet}
          appRedirect={this.props.appRedirect}
          toggleHighlightFilters={this.props.toggleHighlightFilters}
          resetEditedFilters={this.props.resetEditedFilters}
          applied_team_filter={this.props.applied_team_filter}
          selectTeamFilter={this.props.selectTeamFilter}

          handleZoomControl={this.props.handleZoomControl}
          isMobile={this.props.isMobile}
          device={this.props.device}
          colors={this.props.colors}
        />

      </Wrapper>
    );

    return <Wrapper />
  }
}

const mapStateToProps = ({ auth, settings, property_map, map, route, native, filter, billing }) => {

  const { token, user } = auth;
  const { dark_mode, colors } = settings;
  const { window_width, window_height, isIphoneX, platform, device, mobile_toggle_drawer, isMobile } = native;
  const {
    tap_to_add, map_mode
  } = property_map;
  const { applied_team_filter } = filter;
  const { plan_modules } = billing;
  return {
    token,
    user,
    dark_mode, colors,
    window_width,
    window_height,
    isIphoneX,
    platform,
    tap_to_add,
    map_mode,
    device,
    mobile_toggle_drawer,
    isMobile,
    applied_team_filter,
    plan_modules
  }
}


export default connect(mapStateToProps, {
  mobileToggleDrawer,
  toggleDrawer,
  toggleActionSheet,
  stopTrackedRoute,

  toggleHighlightFilters,
  resetEditedFilters,
  selectTeamFilter,
  setModal,
  toggleModal,

  appRedirect
})(MapTop);
