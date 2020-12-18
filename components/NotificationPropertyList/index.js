import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, RightPanelContainer, Wrapper, Title, Copy, Row, Scroll, KeyboardView, Button, Icon} from 'app/NativeComponents/common';
import { List } from 'app/NativeComponents/snippets';
import PropertyItem from 'app/DealMachineCore/snippets/PropertyItem';

import {
  addDeal,
  setStatusModal,
  appRedirect,
  updateLead,
  selectActiveProperty,
  getActivityProperties,
  getMailers
} from 'app/NativeActions';

import PropertyList from './PropertyList';
import MailerList from './MailerList';

class NotificationPropertyList extends Component {

  constructor(props){
    super(props);

  }

  componentDidUpdate(prevProps, prevState){
  }

  componentDidMount(){

    if(this.props.activity_properties_type != null){
      if(this.props.activity_properties.length === 0){
        this.getProperties({load_type: "load"})
      }
    }else{
      this.handleBack()
    }
  }

  handleBack(){
    this.props.appRedirect({redirect: "goBack", payload:{type: "dashboard"}});
  }

  getProperties({load_type = "load", begin = 0}){
    if(!this.props.activity_properties_loading && !this.props.activity_properties_refreshing){

      let filters = {}
      let route_id = null
      if(this.props.activity_properties_type.slug !== "mailers_sent"){

        switch(this.props.activity_properties_type.slug){
          case "leads_added":
            filters = {
              added_by_ids: this.props.activity_properties_type.team_member_id,
              min_date_added: this.props.activity_properties_type.date,
              max_date_added: this.props.activity_properties_type.date,
              added_type: "normal_add"
            }
          break;

          case "build_list":
            filters = {
              list_ids: this.props.activity_properties.activity_number_2
            }
          break;

          case "skip_trace":
            filters = {
              skip_traced_by: this.props.activity_properties_type.team_member_id,
              min_date_skip_traced: this.props.activity_properties_type.date,
              max_date_skip_traced: this.props.activity_properties_type.date
            }
          break;

          case "routes":
            filters = {
              added_by_ids: this.props.activity_properties_type.team_member_id
            }
            route_id = this.props.activity_properties_type.route_id
          break;
        }

        this.props.getActivityProperties({
          token: this.props.token,
          route_id,
          filters,
          begin,
          load_type
        });
      }else{
        this.props.getMailers({
          token: this.props.token,
          min_date_mailed: this.props.activity_properties_type.date,
          max_date_mailed: this.props.activity_properties_type.date,
          begin,
          load_type
        });
      }
    }
  }


  renderHeader(){
    return(
      <Row style={{
        marginTop: this.props.isIphoneX ? 42 : this.props.platform == "ios" ? 25 : 12,
        borderBottomWidth: 1, borderBottomColor: this.props.colors.border_color, borderBottomStyle: "solid"}}>
        <Button
          onPress={()=>this.handleBack()} style={{width: 50, alignItems: "center", justifyContent: "center"}}>
          <Icon
            icon={"arrow-back"}
            size={26}
          />
        </Button>
        <Wrapper style={{padding: 10, paddingLeft: 0, flex: 1}}>
          <Title>{this.props.activity_properties_type.title}</Title>
        </Wrapper>
      </Row>
    )
  }

  render(){

    if(this.props.activity_properties_type != null && (this.props.active_property == null || this.props.isMobile)){
      if(this.props.isMobile){
        return(
          <Container>
            <KeyboardView style={{height: "100%"}}>

              {this.renderHeader()}
              <PropertyList {...this.props} getProperties={this.getProperties.bind(this)}/>
              <MailerList {...this.props} getProperties={this.getProperties.bind(this)}/>
            </KeyboardView>
          </Container>
        )
      }

      return(
        <RightPanelContainer>
          <Scroll style={{height: "100%"}}>
            {this.renderHeader()}
            <PropertyList {...this.props} getProperties={this.getProperties.bind(this)}/>
            <MailerList {...this.props} getProperties={this.getProperties.bind(this)}/>
          </Scroll>
        </RightPanelContainer>
      )
    }



    return <Wrapper />;
  }
}

const mapStateToProps = ({ auth, settings, property_map, lead, native, activity }) => {
  const { token, user } = auth;
  const { colors } = settings;
  const { device, isMobile, isIphoneX, platform } = native;
  const {
    active_property,
    add_deal_loading
  } = property_map;

  const {
    activity_properties,
    activity_properties_loading,
    activity_properties_refreshing,
    activity_properties_loaded_all,
    activity_properties_begin,
    activity_properties_limit,
    activity_properties_type,

    mailers,
    mailers_loading,
    mailers_refreshing,
    mailers_loaded_all,
    mailers_begin,
    mailers_limit
  } = activity;

  return {
    token,
    user,
    colors,
    device,
    isMobile,
    isIphoneX,
    platform,

    active_property,
    add_deal_loading,

    activity_properties,
    activity_properties_loading,
    activity_properties_refreshing,
    activity_properties_loaded_all,
    activity_properties_begin,
    activity_properties_limit,
    activity_properties_type,

    mailers,
    mailers_loading,
    mailers_refreshing,
    mailers_loaded_all,
    mailers_begin,
    mailers_limit,
  }
}


export default connect(mapStateToProps, {
  addDeal,
  setStatusModal,
  appRedirect,
  updateLead,
  selectActiveProperty,
  getActivityProperties,
  getMailers
})(NotificationPropertyList);
