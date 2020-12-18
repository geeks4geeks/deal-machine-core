import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  Wrapper,
  Card,
  Row,
  Form,
  Input,
  Title,
  Button
} from 'app/NativeComponents/common';

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

  appRedirect
} from 'app/NativeActions'

import MenuButton from './MenuButton';
import LocationButton from './LocationButton';
import ClearButton from './ClearButton';
import SearchItems from './SearchItems';
import TrackingBar from './TrackingBar';
import MoreButton from './MoreButton';

class Search extends PureComponent{

  constructor(props) {
    super(props);

    this.state = {
      focused: false,
      searchText: ""
    }
  }

  componentDidMount(){
    this.props.clearAutocomplete();
  }

  updateSearchBar({prop, value}){


    if(prop == "focused"){

      this.setState({
        focused: value,
        searchText: value == false ? "" : this.state.searchText
      });
      this.props.focusSearchBar(value);

    }else{
      this.setState({
        [prop]: value
      });
    }
  }

  componentWillUnmount(){
    clearInterval(this._search_interval);
    clearInterval(this._blur_interval);
  }

  triggerSearch(value){

    this.props.clearAutocomplete();
    if(value.length > 2){

       clearInterval(this._search_interval);
       this._search_interval = setTimeout(()=>{

         this.props.getAutocomplete({
          token: this.props.token,
          search: value
         });
       }, 250);
     }
  }

  renderButtons(){
    if(this.props.search_type !== "location_only"){
      return(
        <Row>
          <LocationButton
            lockLocationTracking={this.props.lockLocationTracking}
            selectActiveProperty={this.props.selectActiveProperty}
            updateMapLocation={this.props.updateMapLocation}
            lock_location_tracking={this.props.lock_location_tracking}
            colors={this.props.colors}
          />
          <MoreButton
            toggleActionSheet={this.props.toggleActionSheet}
          />
        </Row>
      )
    }
  }

  renderTrackingBar(){
    if(this.props.search_type !== "location_only"){
      return(
        <TrackingBar
          token={this.props.token}
          current_route={this.props.current_route}
          current_route_section={this.props.current_route_section}
          focused={this.state.focused}
          track_route={this.props.track_route}
          autocomplete_loading={this.props.autocomplete_loading}
          autocomplete_items={this.props.autocomplete_items}
          device={this.props.device}
          isMobile={this.props.isMobile}

          map_mode={this.props.map_mode}
          selectActiveProperty={this.props.selectActiveProperty}
          stopTrackedRoute={this.props.stopTrackedRoute}
          total_deals_added={this.props.total_deals_added}
          total_time={this.props.total_time}
          total_miles={this.props.total_miles}
          setModal={this.props.setModal}
          toggleModal={this.props.toggleModal}

          colors={this.props.colors}
        />
      )
    }
  }

  renderMenuButton(){
    if(this.props.search_type !== "location_only"){
      return(
        <MenuButton
          focused={this.state.focused}
          updateSearchBar={this.updateSearchBar.bind(this)}
          clearAutocomplete={this.props.clearAutocomplete}
          mobileToggleDrawer={this.props.mobileToggleDrawer}
          device={this.props.device}
          mobile_toggle_drawer={this.props.mobile_toggle_drawer}
          toggleIsPanDraging={this.props.toggleIsPanDraging}
          toggleDrawer={this.props.toggleDrawer}
          autocomplete_items={this.props.autocomplete_items}
        />
      )
    }
  }

  renderSearchItems(){
    //if(this.props.platform !== "android"){
      return(
        <SearchItems
          {...this.props}
          focused={this.state.focused}
          updateSearchBar={this.updateSearchBar.bind(this)}

        />
      )
    //}
  }

  render(){

    if(!this.props.tap_to_add){
      return (
          <Wrapper style={{
            width: "100%"
          }}>
            <Card style={{marginTop: this.props.search_type == "location_only" ? 0 : this.props.isIphoneX ? 42 : this.props.platform == "ios" ? 25 : 12}}>
              <Row>
                {this.renderMenuButton()}

                <Form onSubmit={()=>{
                  //this.triggerSearch(this.state.searchText);
                }} style={{
                  flex: 1
                }}>
                  <Input
                    style={{
                      borderBottomWidth: 0
                    }}
                    ref="search"
                    name="search"
                    returnKeyType={"search"}
                    blurOnSubmit={true}
                    autoCorrect={false}
                    autoFocus={false}
                    keyboardType="default"
                    placeholder={this.props.search_type === "location_only" ? "Search Locations" : this.props.user.team_clearance_level > 0 ? "Search Map" : "Search Map"}
                    onChange={value => {
                      //location search

                      this.triggerSearch(value);
                      this.updateSearchBar({prop: "searchText", value})
                    }}
                    onSubmitEditing={()=>{
                      this.props.clearAutocomplete();
                      this.triggerSearch(this.state.searchText);
                    }}

                    onFocus={()=>{
                      this.updateSearchBar({prop: "focused", value: true})
                    }}
                    onBlur={()=>{
                      clearInterval(this._blur_interval);
                      this._interval = setTimeout(()=>{
                        this.updateSearchBar({prop: "focused", value: false});
                      }, 100);
                    }}

                    value={this.state.searchText}
                    type="text"
                  />

                </Form>
                <ClearButton
                  {...this.props}
                  focused={this.state.focused}
                  searchText={this.state.searchText}
                  updateSearchBar={this.updateSearchBar.bind(this)}
                  colors={this.props.colors}
                />
                {this.renderButtons()}
              </Row>
              {this.renderSearchItems()}
              {this.renderTrackingBar()}

            </Card>
          </Wrapper>
      )
    }

    return <Wrapper />
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
    isMobile

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
  appRedirect
})(Search);
