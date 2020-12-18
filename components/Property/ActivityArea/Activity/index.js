import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Wrapper, Title, Scroll } from 'app/NativeComponents/common';

import {
  resetActivity,
  getActivity,
  triggerActivityUpdate,

  setMessageHeight,
  messageFieldChange,
  changeActivityTab,
  updateNote,
  changeMention,

  getTeamMembers,

  updateDetailedOptions

} from 'app/NativeActions';

import ActivityItems from './ActivityItems';
import TextBox from './TextBox';

class Activity extends Component{

  componentDidMount(){
    if(this.props.active_property.deal){
      if(!this.props.loading){
        this.getActivity();
      }
    }
  }

  getActivity(type = "load"){
    this.props.triggerActivityUpdate(false);
    this.props.resetActivity();
    this.props.getActivity({
      token: this.props.token,
      deal_id: this.props.active_property.deal.id,
      type: type
    });
  }

  componentDidUpdate(prevProps){
    if(this.props.active_property.deal){
      if(prevProps.active_property){
        if(this.props.active_property.property_id !== prevProps.active_property.property_id){
          this.getActivity();
        }
      }else if(!prevProps.active_property){
        this.getActivity();
      }else if(this.props.reload === true && prevProps.reload !== true){
        this.getActivity("update");
      }
    }
  }

  renderTitle(){
    if(this.props.include_title){
        return(
          <Wrapper style={{padding: 20}}>
            <Title>Activity, Notes, Messages</Title>
          </Wrapper>
        )
    }
  }

  render(){
    if(this.props.active_property.deal){
      return(
        <Wrapper style={{
          height: "100%"
        }}>
          <Scroll style={{flex: 1,
            maxHeight:
              (!this.props.is_expanded || this.props.isMobile) && this.props.device !== "mobile" ?
                "55vh" : "100%"}}>
            {this.renderTitle()}
            <ActivityItems {...this.props}/>
          </Scroll>
          <Wrapper style={{height: 186}}>
            <TextBox {...this.props}/>
          </Wrapper>
        </Wrapper>
      );
    }
    return <Wrapper />
  }
}

const mapStateToProps = ({ auth, native, property_map, activity, drawer, deal, team }) => {
  const { token, user } = auth;
  const { device, platform, isIphoneX, window_height, isMobile } = native;
  const { stats } = drawer;
  const { active_property } = property_map;
  const { all_tags, all_statuses } = deal;

  const { team_members, team_members_loading } = team;

  const {
    drag_toggle,
    reload,
    dragged_value,
    activity_items,
    loading,
    message,
    mentions,
    message_height,

    detailed_options
  } = activity;
  return {
    token,
    user,
    device,
    platform,
    isIphoneX,
    isMobile,
    window_height,
    stats,
    active_property,
    drag_toggle,
    reload,
    dragged_value,
    activity_items,
    loading,
    message,
    mentions,
    message_height,
    all_tags,
    all_statuses,

    team_members,
    team_members_loading,

    detailed_options
  }
}


export default connect(mapStateToProps, {

  resetActivity,
  getActivity,
  triggerActivityUpdate,

  setMessageHeight,
  messageFieldChange,
  changeActivityTab,
  updateNote,
  changeMention,

  getTeamMembers,

  updateDetailedOptions

})(Activity);
