import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ModalContainer, RightPanelContainer, KeyboardView, Row, Wrapper } from 'app/NativeComponents/common';
import { Header } from 'app/NativeComponents/snippets';

import {
  appRedirect,
  clearEditedFilters,
  getTeamFilters,
  createTeamFilter,
  toggleHighlightFilters,
  selectTeamFilter,
  hidePropertyList,
  removeTeamFilter,
  editFilterTitle
} from 'app/NativeActions';

import PresetList from './PresetList';

class SavedPresets extends Component {

  constructor(props){
    super(props);

  }


  componentDidMount() {

    if(this.props.team_filters.length === 0){
      this.getFilters();
    }

    if(this.props.device === "desktop"){
      if(this.props.match.path.indexOf("map") !== -1){
        this.props.toggleHighlightFilters(true)
      }
    }

    this.props.hidePropertyList(true);
  }

  getFilters(){
    if(!this.props.team_filters_loading){
      this.props.getTeamFilters({token: this.props.token})
    }
  }

  handleBack(){
    this.props.appRedirect({redirect: "goBack", payload:{remove: "saved-presets"}});
  }

  createPreset(){
    const new_preset_count = parseInt(this.props.team_filters.length)+1;
    this.props.createTeamFilter({
      token: this.props.token,
      title: "Preset #"+new_preset_count,
      description: "",
      use_for_dealfinders: 0,
      filters: this.props.original_filters,
      new_filter: true
    })
    this.props.editFilterTitle("Preset #"+new_preset_count)
  }

  renderBody(){

      return(
        <Wrapper style={{height: "100%"}}>
          <Header
            title={"Saved Presets"}
            leftButtonIcon={"arrow-back"}
            leftButtonAction={()=>{
              this.handleBack()
            }}

            rightButtonTitle={this.props.team_filters.length > 0 ? "New Preset" : ""}
            rightButtonAction={this.props.team_filters.length > 0 ? ()=>{
              this.createPreset()
            } : ()=>{}}


          />
          <KeyboardView style={{
            height: "100%"
          }}>

            <PresetList {...this.props}
            createPreset={this.createPreset.bind(this)}
            handleBack={this.handleBack.bind(this)}/>

          </KeyboardView>
        </Wrapper>
      )
  }

  render() {

    if(this.props.isMobile){
      return (
        <ModalContainer>
          {this.renderBody()}
        </ModalContainer>
      );
    }

    return (

      <RightPanelContainer>
        {this.renderBody()}
      </RightPanelContainer>
    );
  }

}


const mapStateToProps = ({ auth, filter }) => {
  const { token, user } = auth;
  const {
    team_filters,
    team_filters_loading,
    team_filters_begin,
    team_filters_loaded_all,
    team_filters_limit,
    selected_team_filter,
    original_filters,
    applied_team_filter,
    toggle_highlight_filters
  } = filter;

  return {
    token,
    user,

    team_filters,
    team_filters_loading,
    team_filters_begin,
    team_filters_loaded_all,
    team_filters_limit,

    selected_team_filter,
    original_filters,
    applied_team_filter,
    toggle_highlight_filters
  };
}


export default connect(mapStateToProps, {
  appRedirect,
  clearEditedFilters,
  getTeamFilters,
  createTeamFilter,
  toggleHighlightFilters,
  selectTeamFilter,
  hidePropertyList,
  removeTeamFilter,
  editFilterTitle
})(SavedPresets);
