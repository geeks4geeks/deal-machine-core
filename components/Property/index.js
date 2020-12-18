import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  LeftPanelContainer,
  RightPanelContainer,
  Container,
  Scroll,
  Wrapper,
  Spin,
  Row,
  Copy
} from 'app/NativeComponents/common';


import {
  getProperty,
  toggleActionSheet,
  appRedirect,
  setStatusModal,
  setTagModal,
  setListModal,
  updateLead,
  setModal,
  toggleModal,
  updateHouse,
  selectActiveProperty,
  addDeal,
  toggleOnboarding,
  hidePropertyList,

  checkForDealCredits,
  renderPrice
} from 'app/NativeActions';


import PropertyImage from './PropertyImage';

import Cta from './Cta';
import DealClosedInfo from './DealClosedInfo';
import OwnerInfo from './OwnerInfo';
import CampaignInfo from './CampaignInfo';
import PropertyInfo from './PropertyInfo';
import LocationMap from './LocationMap';

import ActivityArea from './ActivityArea';
import ListAndTags from './ListAndTags';
class Property extends Component {

  constructor(props){
    super(props);

    let is_expanded = false;
    if(props.device === "desktop"){
      if(window.location.href.indexOf("leads") === -1 &&
      window.location.href.indexOf("map") === -1 &&
      window.location.href.indexOf("dashboard") === -1){
        is_expanded = true;
      }
    }
    this.state = {
      is_expanded: is_expanded
    }
  }

  componentDidMount(){
    this.props.hidePropertyList(true)

    let loaded_data = false;
    if(!this.props.active_property){

      if(this.props.device === "desktop"){
        if(this.props.match.params.property_id){
          loaded_data = true;
          this.props.getProperty({
            token: this.props.token,
            property_id: this.props.match.params.property_id
          });
        }
      }else{
        //redirect out

        if(this.props.navigation && this.props.device == "mobile"){
          if(this.props.navigation.state){
            if(this.props.navigation.state.params){
              if(this.props.navigation.state.params.deal_id || this.props.navigation.state.params.property_id){

                this.props.getProperty({
                  token: this.props.token,
                  deal_id: this.props.navigation.state.params.deal_id ? this.props.navigation.state.params.deal_id : null,
                  property_id: this.props.navigation.state.params.property_id ? this.props.navigation.state.params.property_id : null
                });
              }
            }
          }
        }
      }


    }else{
      if(this.props.device === "desktop"){
        if(parseInt(this.props.active_property.property_id) !== parseInt(this.props.match.params.property_id)){
          //load new property from match params property_id
          loaded_data = true;
          this.props.getProperty({
            token: this.props.token,
            property_id: this.props.match.params.property_id
          });
        }
      }
    }

    if(!loaded_data && this.props.active_property){

      this.props.getProperty({
        token: this.props.token,
        type: "soft_refresh",
        property_id: this.props.active_property.property_id
      });
    }

  }

  componentDidUpdate(prevProps){
    if(this.props.device === "desktop" &&
      this.props.active_property &&
      this.props.isMobile !== prevProps.isMobile &
      this.props.isMobile === true
    ){
      this.props.appRedirect({redirect: "property", payload:{property_id: this.props.active_property.property_id}})
    }

    if(this.props.device === "desktop"){
      if(this.props.match.params.page_id !== prevProps.match.params.page_id){
        if(!this.props.match.params.page_id){
          this.setState({is_expanded: true})
        }else{
          this.setState({is_expanded: false})
        }
      }
    }

    if(!this.props.active_property && prevProps.active_property && !this.props.active_property_loading){
      this.props.appRedirect({redirect: "goBack", payload: {remove: "property", property_id: prevProps.active_property.property_id, page_id: this.props.list_properties_page}})
    }

    if(this.props.active_property && !this.props.active_property_loading){
      if(this.props.active_property.deal){
        if(parseInt(this.props.active_property.deal.loaded_more_deal_data) !== 1){
          this.props.selectActiveProperty(this.props.active_property);
          this.props.getProperty({
            token: this.props.token,
            type: "soft_refresh",
            property_id: this.props.active_property.property_id
          });
        }
      }
    }
  }

  componentWillUnmount(){
    this.props.hidePropertyList(false)

  }

  renderBody(){
    if(this.props.active_property_loading && !this.props.active_property){
      return (
          <Wrapper style={{
            alignItems: "center",
            justifyContent: 'center',
            width: "100%",
            height: "100%",
            flex: 1
          }}>
            <Row>
              <Spin size="small"/>
              <Copy style={{marginLeft: 10}}>Loading property...</Copy>
            </Row>
          </Wrapper>
      );
    }

    if(this.props.active_property){
      return (
        <Scroll style={{height: "100%"}}>
          <Wrapper style={{paddingBottom: this.props.isMobile || !this.state.is_expanded ? 85 : 0}}>
            <PropertyImage
              {...this.props}
              is_expanded={this.state.is_expanded}
            />
            <Cta {...this.props}/>
            <DealClosedInfo {...this.props}/>
            <OwnerInfo {...this.props} is_expanded={this.state.is_expanded}/>
            <CampaignInfo {...this.props} />
            <PropertyInfo {...this.props} />
            <ListAndTags {...this.props}/>
            <LocationMap {...this.props} />
          </Wrapper>

        </Scroll>
      );
    }

    return <Wrapper />
  }

  render() {

    if(this.state.is_expanded){
      if(this.props.isMobile){
        return (
          <LeftPanelContainer style={{position: "relative"}}>
            {this.renderBody()}
            <ActivityArea
              is_expanded={this.state.is_expanded}
              {...this.props}
            />
          </LeftPanelContainer>
        );
      }
      return (
        <Row style={{flex: 1}}>
          <LeftPanelContainer style={{position: "relative"}}>
            {this.renderBody()}

          </LeftPanelContainer>
          <Container>
            <ActivityArea
              is_expanded={this.state.is_expanded}
              {...this.props}
            />
          </Container>
        </Row>
      );
    }

    if(!this.state.is_expanded){
      return (
        <RightPanelContainer style={{position: "relative"}}>
          {this.renderBody()}
          <ActivityArea
            is_expanded={this.state.is_expanded}
            {...this.props}
          />
        </RightPanelContainer>
      );
    }

    return <Wrapper />;

  }
}

const mapStateToProps = ({ auth, settings, native, lead, property_map, drawer, billing, route, owner }) => {
  const { token, user } = auth;
  const { colors } = settings;
  const { device, platform, isMobile } = native;
  const { list_properties_page } = lead;
  const { main_owner_info } = owner;
  const { active_property, active_property_loading, add_deal_loading } = property_map;
  const { current_route } = route;
  const { stats } = drawer;
  const { deal_credits, pricing, card_info } = billing;
  return {
    token,
    user,
    colors,
    list_properties_page,
    main_owner_info,
    active_property,
    active_property_loading,
    add_deal_loading,
    device,
    platform,
    isMobile,
    stats,
    deal_credits,
    pricing,
    card_info,

    current_route
  }
}


export default connect(mapStateToProps, {
  getProperty,
  toggleActionSheet,
  appRedirect,
  setStatusModal,
  setTagModal,
  setListModal,
  updateLead,
  setModal,
  toggleModal,
  updateHouse,
  selectActiveProperty,
  addDeal,
  toggleOnboarding,
  hidePropertyList
})(Property);
