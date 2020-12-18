import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Wrapper,
  CardBody,
  Title,
  Copy,
  Row,
  Button,
  Icon,
  Bold
} from 'app/NativeComponents/common';
import { CloseButton } from 'app/NativeComponents/snippets';

import PropertyItemImage from './PropertyItemImage';
import MobilePropertyImage from './MobilePropertyImage';
import PropertyStatusButton from './PropertyStatusButton';
import MoreInformation from './MoreInformation';

import NextAndPrevPropertyInRoute from './NextAndPrevPropertyInRoute';
import MoreInfoButton from './MoreInfoButton';

import CheckBox from './CheckBox';

/*
  Needs:
    -property
    -user
    -device
    -darkmode
    -selected_property_info
    -all_property_info_options
    -onPress
*/

import {
  addDeal,
  setStatusModal,
  appRedirect,
  updateLead,
  selectActiveProperty,
  updateMapLocation,
  toggleActionSheet,
  toggleOnboarding,
  setModal,
  toggleModal,
  getProperty,

  determineMainOwnerInfo,
  determineDisplayProperty
} from 'app/NativeActions';


class PropertyItem extends Component{

  constructor(props){
    super(props);

    this._property_status_button = props.device == "desktop" ? React.createRef() : null;
    this.state = {}
  }


  renderCheckBox(){

    if(this.props.selecting){
      return (
        <CheckBox
          property={this.props.property}
          selected_leads={this.props.selected_leads}
          selected_all={this.props.selected_all}
          checkLead={this.props.checkLead}
        />
      );
    }
    return (
      <PropertyItemImage
        colors={this.props.colors}
        active_property={this.props.active_property}
        user={this.props.user}
        isMobile={this.props.isMobile}
        toggleActionSheet={this.props.toggleActionSheet}
        property={this.props.property}
        darkMode={this.props.darkMode}
        device={this.props.device}
        bypass_start_mailers_button={this.props.bypass_start_mailers_button}
        toggle_lead_images={this.props.toggle_lead_images}

      />
    );

  }

  renderInfo(){

    const display_property = determineDisplayProperty(this.props.property);

    if(this.props.user.team_clearance_level > 0){
      return (
        <Wrapper style={{paddingRight: 20}}>
          <Copy><Bold>{determineMainOwnerInfo(this.props.property).owner_status_info.text}</Bold></Copy>
          <Title>{determineMainOwnerInfo(this.props.property).owner_name}</Title>
          <Copy>{display_property.property_address+" "+display_property.property_address2}</Copy>
          <Copy>{display_property.property_address_city+", "+display_property.property_address_state+" "+display_property.property_address_zip}</Copy>

        </Wrapper>
      );

    }else{
      if(this.props.property.deal){
        return (
          <Wrapper style={{paddingRight: 20}}>
            <Row>
              <Copy><Bold>Property Added</Bold></Copy>
              <Icon
                style={{
                  marginLeft: 5
                }}
                color={this.props.colors.success_color}
                icon="check-circle"
                size={18}
              />
            </Row>
            <Title>{display_property.property_address+" "+display_property.property_address2}</Title>
            <Copy>{display_property.property_address_city+", "+display_property.property_address_state+" "+display_property.property_address_zip}</Copy>

          </Wrapper>
        );
      }

      return (
        <Wrapper>
          <Copy><Bold>Property Not Added</Bold></Copy>
          <Title>{display_property.property_address+" "+display_property.property_address2}</Title>
          <Copy>{display_property.property_address_city+", "+display_property.property_address_state+" "+display_property.property_address_zip}</Copy>

        </Wrapper>
      );
    }

  }

  renderNextAndPrevPropertyInRoute(){
    if(this.props.withRoute){
      return(
        <NextAndPrevPropertyInRoute {...this.props}/>
      )
    }
  }

  renderCloseButton(){

    if(this.props.active_property && !this.props.bypass_start_mailers_button){
      if(this.props.isMobile && parseInt(this.props.active_property.property_id) === parseInt(this.props.property.property_id)){
        return(
          <CloseButton onPress={()=>{
            this.props.selectActiveProperty(null)
          }}/>
        )
      }
    }
  }


  renderPropertyItemBody(){
    return(
      <Wrapper style={{flex: 1}}>
        <MobilePropertyImage
          colors={this.props.colors}
          isMobile={this.props.isMobile}
          property={this.props.property}
          active_property={this.props.active_property}
          bypass_start_mailers_button={this.props.bypass_start_mailers_button}
          toggle_lead_images={this.props.toggle_lead_images}
        />
        <Row style={{alignItems: "flex-start"}}>
            {this.renderCheckBox()}
            <Row style={{flex: 1}}>

              <Wrapper style={{flex: 1}}>
                <CardBody style={{
                  padding: 10,
                  flex: 1
                }}>
                  <Wrapper style={{
                    alignSelf: "stretch"
                  }}>
                    {this.renderInfo()}

                    <MoreInformation
                      user={this.props.user}
                      property={this.props.property}
                      list_settings={this.props.list_settings}
                    />

                  </Wrapper>

                </CardBody>
                <Wrapper wrapper_ref={this._property_status_button}>
                  <Row>
                    <PropertyStatusButton
                      {...this.props}
                      _property_status_button={this._property_status_button}
                    />
                    <MoreInfoButton
                      {...this.props}
                      onPress={()=>this.props.onPress(this.props.property)}
                    />
                  </Row>


                </Wrapper>

              </Wrapper>
              {/*
              <Wrapper style={{
                alignItems: "center",
                justifyContent: "center",
                width: 40
              }}>
                <Icon
                  icon="keyboard-arrow-right"
                  size={18}
                  color={this.props.colors.light_text_color}
                />
              </Wrapper>
              */}
            </Row>
        </Row>
      </Wrapper>
    )
  }

  render(){

      if(this.props.property){
        {/*
        if((this.props.isMobile) &&
          (!this.props.active_property || this.props.bypass_start_mailers_button)){
            return(
              <Wrapper style={{
                borderBottomColor: this.props.colors.border_color,
                borderBottomWidth: 1,
                borderBottomStyle: "solid",
                position: "relative"
              }}>

                  {this.renderPropertyItemBody()}
                  {this.renderNextAndPrevPropertyInRoute()}


                  {this.renderCloseButton()}
              </Wrapper>
            )
        }
        */}


        return(
          <Wrapper style={{
            borderBottomColor: this.props.colors.border_color,
            borderBottomWidth: 1,
            borderBottomStyle: "solid",
            position: "relative"
          }}>
              {/*<Button onPress={()=>this.props.onPress(this.props.property)} style={{flex: 1}}>*/}

                {this.renderPropertyItemBody()}
              {/*</Button>*/}
              {this.renderNextAndPrevPropertyInRoute()}


              {this.renderCloseButton()}
          </Wrapper>
          )
      }

      return <Wrapper />;

    }

}

const mapStateToProps = ({ auth, settings, native, drawer, property_map, lead, filter, route, billing }) => {
  const { token, user } = auth;
  const { colors } = settings;

  const { device, isMobile } = native;
  const { stats } = drawer;
  const {
    add_deal_loading,
    active_property
  } = property_map;
  const {
    list_properties_page,
    toggle_lead_images
  } = lead;
  const {
    list_settings
  } = filter;
  const {
    current_route,
    prev_and_next_properties_loading,
    next_property_in_route,
    prev_property_in_route
  } = route;

  const{
    pricing,
    card_info,
    deal_credits
  } = billing

  return {
    token, user, colors,
    stats,
    device, isMobile,
    add_deal_loading, active_property,
    list_properties_page,
    toggle_lead_images,
    list_settings,
    current_route,
    pricing,
    card_info,
    deal_credits,

    prev_and_next_properties_loading,
    next_property_in_route,
    prev_property_in_route
  }
}


export default connect(mapStateToProps, {
  addDeal,
  setStatusModal,
  appRedirect,
  updateLead,
  toggleActionSheet,
  selectActiveProperty,
  updateMapLocation,
  toggleOnboarding,
  getProperty,

  setModal,
  toggleModal,
})(PropertyItem);
