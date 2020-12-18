import React, { Component } from 'react';
import { connect } from 'react-redux';

import { RightPanelContainer, ModalContainer, Scroll } from 'app/NativeComponents/common';
import { Header } from 'app/NativeComponents/snippets';

import Body from './Body';

import {
  appRedirect,
  toggleShowRoutes,
  editPropertyMapOptions,
  toggleMapType,
  hidePropertyList,

  checkIfUserHasModule
} from 'app/NativeActions';

class PropertyMapOptions extends Component{


  constructor(props){
    super(props);

    const plan_module_info = checkIfUserHasModule({plan_modules: props.plan_modules, user: props.user, slug: "driving"})
    this.state = {
      plan_module_info: plan_module_info
    }
  }

  componentDidMount(){
    this.props.hidePropertyList(true)
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.user && prevProps.plan_modules){
      if(this.props.plan_modules !== prevProps.plan_modules || this.props.user.plan_modules !== prevProps.user.plan_modules){
        const plan_module_info = checkIfUserHasModule({plan_modules: this.props.plan_modules, user: this.props.user, slug: "driving"});
        this.setState({plan_module_info: plan_module_info})
      }
    }
  }

  handleBack(){
    /*mobile*/
    this.props.hidePropertyList(false)
    this.props.appRedirect({redirect: "goBack", payload:{remove: "map-options"}})
  }



  render(){
    if(this.props.isMobile){
      return(
        <ModalContainer>
          <Header
            title="Map Options"
            leftButtonIcon={"close"}
            leftButtonAction={this.handleBack.bind(this)}
          />
          <Scroll>
            <Body {...this.props} plan_module_info={this.state.plan_module_info}/>

          </Scroll>
        </ModalContainer>
      );
    }

    return(
      <RightPanelContainer>
        <Header
          title="Map Options"
          leftButtonIcon={"close"}
          leftButtonAction={this.handleBack.bind(this)}
        />
        <Scroll style={{height: "100%"}}>
          <Body {...this.props} plan_module_info={this.state.plan_module_info}/>

        </Scroll>
      </RightPanelContainer>
    )
  }
}

const mapStateToProps = ({ auth, settings, native, route, property, map, billing }) => {
  const { token, user } = auth;
  const { colors } = settings;
  const { device, isMobile } = native;
  const { show_routes } = route;
  const {
    property_map_options
  } = property;
  const { map_type } = map;
  const { plan_modules, card_info, billing_addons } = billing;

  return {
    token,
    user,
    colors,
    device,
    isMobile,
    show_routes,
    property_map_options,
    map_type,
    billing_addons,

    plan_modules,
    card_info
  }
}



export default connect(mapStateToProps, {
  appRedirect,
  toggleShowRoutes,
  editPropertyMapOptions,
  toggleMapType,
  hidePropertyList
})(PropertyMapOptions);
