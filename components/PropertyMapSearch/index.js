import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Wrapper, StatusBarStyle, Container } from 'app/NativeComponents/common';

import {
  mobileToggleDrawer,
  toggleDrawer,
  toggleActionSheet,
  stopTrackedRoute,

  lockLocationTracking,
  updateMapLocation,
  selectActiveProperty,
  getAutocomplete,
  clearAutocomplete,
  focusSearchBar,
  toggleHighlightFilters,
  resetEditedFilters,
  selectTeamFilter,

  appRedirect
} from 'app/NativeActions'

import Search from './Search';

class PropertyMapSearch extends PureComponent {


  render() {
    return (
      <Container fill>
        <StatusBarStyle style="dark-content"/>
        <Search
          {...this.props}
        />
      </Container>
    );
  }
}

const mapStateToProps = ({ auth, settings, property_map, map, route, native, filter, billing }) => {

  const { token, user } = auth;
  const { dark_mode, colors } = settings;
  const { window_width, window_height, isIphoneX, platform, device, mobile_toggle_drawer, isMobile } = native;

  const { track_route, total_miles, total_time, total_deals_added, current_route, current_route_id, current_route_section } = route;
  const {
    autocomplete_loading, autocomplete_items, autocomplete_error, tap_to_add, map_mode
  } = property_map;
  const { lock_location_tracking } = map;
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
    autocomplete_loading,
    autocomplete_items,
    autocomplete_error,
    lock_location_tracking,
    tap_to_add,

    track_route,
    total_miles,
    total_time,
    total_deals_added,
    current_route,
    current_route_id,
    current_route_section,
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

  lockLocationTracking,
  updateMapLocation,
  selectActiveProperty,
  getAutocomplete,
  clearAutocomplete,
  focusSearchBar,
  toggleHighlightFilters,
  resetEditedFilters,
  selectTeamFilter,

  appRedirect
})(PropertyMapSearch);
