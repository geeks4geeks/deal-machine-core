import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Wrapper, Card } from 'app/NativeComponents/common';
import PropertyItem from 'app/DealMachineCore/snippets/PropertyItem';

import BottomButtons from './BottomButtons';

import {
  appRedirect,
  selectActiveProperty,
  addDeal,
  toggleTapToAdd,

  stopTrackedRoute,
  startTrackedRoute,
  setModal,
  toggleModal,

  /* temp actions */
  houseReset,
  resetActivity,
  getActivity,
  updateHouse,
  toggleActionSheet,
  resetUploadProgress
} from 'app/NativeActions';

class MapBottom extends PureComponent {

  renderActiveProperty(){
    if(this.props.active_property){
      return(
        <Wrapper style={{maxWidth: 750, width: "100%", margin: this.props.device === "desktop" ? "0px auto" : 0}}>

          <Card style={{alignSelf: "stretch"}}>
            <PropertyItem
              property={this.props.active_property}
              user={this.props.user}
              onPress={(property)=>{
                if(property){
                  this.props.appRedirect({redirect: "property", payload: {property_id: property.property_id}})
                }
              }}
              withRoute={true}
            />
          </Card>
        </Wrapper>
      )
    }
  }

  render() {

    return (
      <Wrapper
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          marginBottom: 0,
          width: "100%",
          alignItems: "center",
          justifyContent: "center"
        }}>
        <Wrapper style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: this.props.iosBrowser ? 120 : 5
        }}>
          <BottomButtons
            {...this.props}
            token={this.props.token}
            user={this.props.user}
            dark_mode={this.props.dark_mode}
            active_property={this.props.active_property}
            routeZoomMax={this.props.routeZoomMax}
            showZoomMessage={this.props.showZoomMessage}
            reverse_geocode_loading={this.props.reverse_geocode_loading}
            lock_location_tracking={this.props.lock_location_tracking}
            map_properties_loading={this.props.map_properties_loading}
            number_of_properties={this.props.map_properties ? this.props.map_properties.length : 0}
            current_route_section={this.props.current_route_section}
            current_route={this.props.current_route}
            track_route={this.props.track_route}
            map_routes={this.props.map_routes}
            getProperties={this.props.getProperties}
            zoomToMin={this.props.zoomToMin}
            stopTrackedRoute={this.props.stopTrackedRoute}
            startTrackedRoute={this.props.startTrackedRoute}
            setModal={this.props.setModal}
            toggleModal={this.props.toggleModal}
            device={this.props.device}
            isMobile={this.props.isMobile}
            applied_filters={this.props.applied_filters}
            appRedirect={this.props.appRedirect}
            refreshMap={this.props.refreshMap}

          />
          {
            this.renderActiveProperty()
          }

        </Wrapper>

      </Wrapper>
    );
  }
}

const mapStateToProps = ({ auth, settings, drawer, property_map, map, route, native, filter }) => {

  const { token, user } = auth;
  const { dark_mode } = settings;
  const {
    track_route,
    map_routes,
    current_route_id,
    current_route,
    current_route_section
  } = route;
  const {stats} = drawer;
  const { lock_location_tracking } = map;
  const { window_width, window_height, isIphoneX, iosBrowser, device, isMobile } = native;
  const { list_settings, applied_filters } = filter;

  const {
    map_properties,
    map_properties_loading,
    property_count,
    active_property,
    active_address,
    reverse_geocode_loading,

    add_deal_loading,
    tap_to_add,
    map_mode
  } = property_map;
  return {
    token,
    user,
    window_width,
    window_height,
    isIphoneX,
    iosBrowser,
    device,
    isMobile,
    stats,
    map_properties,
    map_properties_loading,
    property_count,
    reverse_geocode_loading,
    active_property,
    active_address,
    list_settings,

    add_deal_loading,

    tap_to_add,
    map_mode,

    track_route,
    lock_location_tracking,
    map_routes,
    current_route_id,
    current_route,
    current_route_section,

    applied_filters,

    dark_mode
  }
}


export default connect(mapStateToProps, {
  appRedirect,
  selectActiveProperty,
  addDeal,
  toggleTapToAdd,

  stopTrackedRoute,
  startTrackedRoute,
  setModal,
  toggleModal,
  /* temp actions */
  houseReset,
  resetActivity,
  getActivity,
  updateHouse,
  toggleActionSheet,
  resetUploadProgress
})(MapBottom);
