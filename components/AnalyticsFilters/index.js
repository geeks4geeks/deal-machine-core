import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ModalContainer, KeyboardView, Wrapper } from 'app/NativeComponents/common';
import { Header } from 'app/NativeComponents/snippets';

import Body from './Body';

import {
  toggleCanPop,
  lockDrawer,
  toggleDrawer,
  toggleActionSheet,
  appRedirect,
  changeTab,

  updateAnlyticsFilters,
  getTags
} from 'app/NativeActions';

class AnalyticsFilters extends Component{


  constructor(props){
    super(props);

    this.state = {
      filters: {
        team_member: this.props.analytics_filters.team_member,
        team_member_title: this.props.analytics_filters.team_member_title,

        tag: this.props.analytics_filters.tag,
        tag_title: this.props.analytics_filters.tag_title,

        campaign: this.props.analytics_filters.campaign,
        campaign_title: this.props.analytics_filters.campaign_title,

        template: this.props.analytics_filters.template,
        template_title: this.props.analytics_filters.template_title,
      }
    }
  }

  updateFilter({value, prop}){

    let new_filters = this.state.filters;
    new_filters[prop] = value;
    this.setState({
      filters: new_filters
    });
  }

  saveFilters(){
    this.props.updateAnlyticsFilters(this.state.filters);
    this.handleBack();
  }

  componentDidMount(){
    /*mobile*/
    if(this.props.device == "mobile"){
      this.props.toggleCanPop("normal");
      this.props.toggleDrawer("close");
      this.props.lockDrawer(true);
    }

    this.props.changeTab("analytics");


    //get tags if there are none
    if(this.props.all_tags){
      if(this.props.all_tags.length == 0){
        this.props.getTags(this.props.token);
      }
    }else{
      this.props.getTags(this.props.token);
    }

    if(this.props.analytics_type == null){
      this.handleBack();
    }

  }

  handleBack(){
    this.props.appRedirect({redirect: "goBack", payload:{remove: "filter-analytics"}});
  }

  checkIfNeedsToSave(){

    if(this.state.filters.team_member != this.props.analytics_filters.team_member ||
    this.state.filters.tag != this.props.analytics_filters.tag ||
    this.state.filters.template != this.props.analytics_filters.template ||
    this.state.filters.campaign != this.props.analytics_filters.campaign){
      return true;
    }

    return false;
  }

  render(){
    if(this.props.analytics_type != null){
      return(
        <ModalContainer>
          <Header
            title="Filter Analytics"
            leftButtonIcon="arrow-back"
            leftButtonAction={this.handleBack.bind(this)}

            rightButtonIcon={this.checkIfNeedsToSave() ? "check" : ""}
            rightButtonAction={this.checkIfNeedsToSave() ? ()=>this.saveFilters() : ()=>{}}

          />
          <KeyboardView>
            <Body
              updateFilter={this.updateFilter.bind(this)}
              saveFilters={this.saveFilters.bind(this)}
              filters={this.state.filters}
              checkIfNeedsToSave={this.checkIfNeedsToSave.bind(this)}
              {...this.props}
            />
          </KeyboardView>
        </ModalContainer>
      );
    }

    return <Wrapper />
  }
}

const mapStateToProps = ({ auth, native, drawer, analytics, deal, template, campaign }) => {
  const { token, user } = auth;
  const { device } = native;
  const { stats } = drawer;

  const { analytics_filters, analytics_type } = analytics;
  const { all_tags } = deal;
  const { templates } = template;
  const { campaigns } = campaign;

  return {
    token,
    user,
    device,
    stats,

    all_tags,
    templates,
    campaigns,

    analytics_filters,
    analytics_type
  }
}



export default connect(mapStateToProps, {
  toggleCanPop,
  lockDrawer,
  toggleDrawer,
  toggleActionSheet,
  appRedirect,
  changeTab,

  updateAnlyticsFilters,
  getTags
})(AnalyticsFilters);
