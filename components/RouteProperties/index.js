import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { Wrapper, Container, Title, Copy } from 'app/NativeComponents/common';
import { Header } from 'app/NativeComponents/snippets';

import {
  appRedirect,
  getRouteProperties,
  selectActiveRoute,
  selectActiveProperty,

  houseReset,
  resetActivity,
  toggleOnboarding,
  updateLead,
  setModal,
  toggleModal,
  getActivity,
  routePropertiesToggleTab,
  toggleActionSheet,

  checkIfUserHasModule
} from 'app/NativeActions';

import RouteHeader from './RouteHeader';
import ListView from './ListView';
import MapView from './MapView';

class RouteProperties extends PureComponent{

  constructor(props){
    super(props);

    const plan_module_info = checkIfUserHasModule({plan_modules: props.plan_modules, user: props.user, slug: "driving"})
    this.state = {
      plan_module_info: plan_module_info
    }
  }


  componentDidMount(){

    let loaded_data = false;
    //this.props.selectActiveProperty(null);

    if(!this.props.active_route){

      if(this.props.device === "desktop"){
        if(this.props.match.params.route_id){
          loaded_data = true;
          this.getProperties("refresh", this.props.match.params.id)
        }
      }else{
        //redirect out
        if(this.props.navigation && this.props.device == "mobile"){
          if(this.props.navigation.state){
            if(this.props.navigation.state.params){
              if(this.props.navigation.state.params.route_id){
                this.getProperties("refresh", this.props.navigation.state.params.id)
              }
            }
          }
        }
      }
    }else{
      if(this.props.device === "desktop"){
        if(this.props.match.params.route_id){
          loaded_data = true;
          this.getProperties("refresh", this.props.match.params.id)

        }
      }
    }

    if(!loaded_data && this.props.active_route){
      this.getProperties("refresh", this.props.active_route.route_id)
    }else{
      //this.handleBack();
    }
  }

  componentDidUpdate(prevProps){

    if(!this.props.active_route && prevProps.active_route){
      this.props.appRedirect({redirect: "goBack", payload: {remove: "route", route_id: prevProps.active_route.route_id}})
    }

    if(this.props.active_route && !prevProps.active_route){
      this.props.selectActiveRoute(this.props.active_route);
      this.getProperties("refresh", this.props.active_route.route_id)
    }

    if(this.props.active_route && prevProps.active_route){
      if(this.props.active_route.route_id !== prevProps.active_route.route_id){
        this.props.selectActiveRoute(this.props.active_route);
        this.getProperties("refresh", this.props.active_route.route_id)
      }
    }

    if(this.props.device === "desktop" && prevProps.active_route){
      if(this.props.match.params.id != prevProps.active_route.route_id){
        this.getProperties("refresh", this.props.match.params.id)
      }
    }
  }

  getProperties(type = "load", route_id){
    if(!this.props.route_properties_loading && !this.props.route_properties_refreshing && route_id){
      this.props.getRouteProperties({
        token: this.props.token,
        begin: type == "refresh" ? 0 : this.props.route_properties_begin,
        limit: this.props.route_properties_limit,
        type: type,
        route_id: route_id
      });
    }
  }


  handleBack(){
    if(this.props.active_route){
      this.props.appRedirect({redirect: "goBack", payload: {remove: "route", route_id: this.props.active_route.route_id}})
    }else{
      this.props.appRedirect({redirect: "goBack", payload: {remove: "route", route_id: this.props.match.params.id}})
    }
    this.props.selectActiveRoute(null);
    this.props.selectActiveProperty(null);

  }

  render(){
    if(this.props.active_route){

      if(this.props.route_properties_toggle_tab == "list"){

        return(
          <Container fill>

            <RouteHeader
              {...this.props}
              list_view={true}
              handleBack={this.handleBack.bind(this)}
            />
            <ListView
              {...this.props}
              getProperties={this.getProperties.bind(this)}
              plan_module_info={this.state.plan_module_info}
            />


          </Container>
        )
      }



      return(

        <Container fill>

          <MapView
            {...this.props}
            plan_module_info={this.state.plan_module_info}

            handleBack={this.handleBack.bind(this)}
          />

        </Container>
      );
    }
    if(this.state.plan_module_info.has_module && this.props.card_info.bad_card != 1
    ){

      //I want to put welcome content here maybe?
      /*
      if(!this.props.isMobile){
        return(
          <Container fill>
            <Wrapper style={{flex:1, alignItems: "center", justifyContent: "center"}}>
              <Title style={{textAlign: "center"}}>Select a route</Title>
              <Copy>Select a route on the left panel to display it here.</Copy>
            </Wrapper>
          </Container>
        )
      }
      */
    }

    return <Wrapper />
  }
}

const mapStateToProps = ({ auth, native, settings, filter, route, billing }) => {
  const { token, user } = auth;
  const { device, isMobile, platform, isIphoneX } = native;
  const { colors } = settings;

  const {
    active_route,
    route_properties_toggle_tab,
    routes,
    route_properties,
    route_properties_loading,
    route_properties_error,
    route_properties_begin,
    route_properties_refreshing,
    route_properties_loaded_all,
    route_properties_limit
  } = route;

  const {
    list_settings
  } = filter;

  const {
    pricing,
    deal_credits,
    card_info,
    billing_addons,
    plan_modules
  } = billing

  return {
    token,
    user,
    device,
    isMobile,
    platform, isIphoneX,

    colors,
    list_settings,
    active_route,
    route_properties_toggle_tab,
    routes,
    route_properties,
    route_properties_loading,
    route_properties_error,
    route_properties_begin,
    route_properties_refreshing,
    route_properties_loaded_all,
    route_properties_limit,

    pricing,
    deal_credits,
    card_info,
    billing_addons,
    plan_modules
  }
}



export default connect(mapStateToProps, {
  appRedirect,
  getRouteProperties,
  selectActiveRoute,
  selectActiveProperty,
  houseReset,
  resetActivity,
  toggleOnboarding,
  updateLead,
  setModal,
  toggleModal,
  getActivity,
  toggleActionSheet,
  routePropertiesToggleTab
})(RouteProperties);
