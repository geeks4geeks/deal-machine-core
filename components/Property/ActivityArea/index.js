import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Wrapper, Title, Copy } from 'app/NativeComponents/common';

import {
  triggerActivityUpdate,
  resetActivity,
  getActivity,

  renderActivityCopy
} from 'app/NativeActions';

import Activity from './Activity';
import SlideUpPanelWrapper from 'app/NativeComponents/components/SlideUpPanelWrapper';

class ActivityArea extends Component{


  getActivityTitle(){
    let activity_title = "";
    if(this.props.activity_items){
      for(let i = 0; i<this.props.activity_items.length; i++){
        if(this.props.detailed_options ||
          this.props.activity_items[i].activity_type !== "change_log" || (
            this.props.activity_items[i].activity_type === "change_log" && (
              this.props.activity_items[i].action_type === "approve" ||
              this.props.activity_items[i].action_type === "bulk_edit_start_mailers" ||
              this.props.activity_items[i].action_type === "pause" ||
              this.props.activity_items[i].action_type === "bulk_edit_pause_mailers" ||
              this.props.activity_items[i].action_type === "close" ||
              this.props.activity_items[i].action_type === "archive" ||
              this.props.activity_items[i].action_type === "unarchive"
            )
        )){
          activity_title = renderActivityCopy({activity_items: [this.props.activity_items[i]], user: this.props.user});
          break;
        }
      }
    }

    return activity_title;

  }

  componentDidUpdate(prevProps){
    if(prevProps.reload !== this.props.reload && this.props.reload === true){
      this.props.triggerActivityUpdate(false);
      this.props.resetActivity();
      this.props.getActivity({
        token: this.props.token,
        deal_id: this.props.active_property.deal.id,
        type: "reload"
      });
    }
  }

  render() {
    if(this.props.active_property){
      if(this.props.active_property.deal){
        if(this.props.isMobile || !this.props.is_expanded){
          return(
            <SlideUpPanelWrapper
              colors={this.props.colors}
              title={"Activity, Notes, Messages"}
              subtitle={this.getActivityTitle()}
              panelComponent={()=>{
                return <Activity {...this.props} is_expanded={this.props.is_expanded}/>
              }}
            />
          )
        }

        return(
          <Wrapper style={{
            height: "100%",
            backgroundColor: this.props.colors.card_color
          }}>

            <Activity {...this.props} is_expanded={this.props.is_expanded} include_title={true}/>
          </Wrapper>
        )
      }

      if(this.props.device === "desktop"){
        return(
          <Wrapper style={{
            height: "100%",
            alignItems: "center",
            justifyContent: "center",

          }}>
            <Wrapper style={{padding: 20}}>
              <Title style={{textAlign: "center"}}>There is nothing to display</Title>
              <Copy style={{textAlign: "center"}}>Add this property to start and view an activity feed.</Copy>
            </Wrapper>
          </Wrapper>
        )
      }
    }

    return <Wrapper />;
  }


}


const mapStateToProps = ({activity}) => {

  const {activity_items, reload} = activity;

  return {
    activity_items,
    reload
  }
}


export default connect(mapStateToProps, {
  triggerActivityUpdate,
  resetActivity,
  getActivity,
})(ActivityArea);
