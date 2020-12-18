import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ModalContainer, RightPanelContainer, KeyboardView, Row, Wrapper, Copy, Card, Button, Bold } from 'app/NativeComponents/common';
import { Header, PillButton } from 'app/NativeComponents/snippets';

import {
  appRedirect,
  hidePropertyList,
  getTeamFilters,
  applyFilters,
  setPresetModal,
  setFilters,

  checkIfUserHasModule,
  checkIfFilterChanged,
  getCustomFilterText
} from 'app/NativeActions';


import Presets from './Presets';
import Filters from 'app/DealMachineCore/snippets/Filters';

class LeadFilters extends Component {

  constructor(props){
    super(props);


    this.state = {
      preset: this.props.applied_filters_preset ? this.props.applied_filters_preset : null,
      preset_object: this.props.applied_filters_preset_object ? this.props.applied_filters_preset_object : null
    }

    this.updatePreset = this.updatePreset.bind(this)
  }

  updatePreset({preset, preset_object}){
    this.setState({
      preset,
      preset_object
    });
  }
  componentDidUpdate(prevProps, prevState){
    if(prevState.preset_object !== this.state.preset_object && this.state.preset_object !== null){
      this.props.setFilters(this.state.preset_object.filter_json)
    }
  }

  componentDidMount() {
    this.props.hidePropertyList(true);
  }

  checkIfNeedsToApplyFilter(){
    if(this.props.applied_filters_preset !== this.state.preset){
      return true;
    }

    if(checkIfFilterChanged(this.props.applied_filters, this.props.filters)){
      return true;
    }

    return false;
  }




  handleBack(){
    this.props.hidePropertyList(false)
    this.props.appRedirect({redirect: "goBack", payload:{remove: "lead-filters"}});
  }

  renderFilters(){
    if(this.state.preset == null){
      return(
        <Filters
          title={"Select Custom Filters:"}
          set_filters={this.props.applied_filters}
          include_property_fitlers={true}
          include_deal_fitlers={true}
          include_property_input_filters={true}
        />
      )
    }
  }

  renderApplyButton(){
    if(this.checkIfNeedsToApplyFilter()){
      return(
        <Card style={{position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: 20,
          margin: 0,
          backgroundColor: this.props.colors.card_color,
          borderRadius: 0,
          borderTopWidth: 1,
          borderTopColor: this.props.colors.border_color,
          borderTopStyle: "solid"
        }}>
          <Wrapper>
            <Copy>{getCustomFilterText(this.props.filters) === "" ? "Clear all filters" : getCustomFilterText(this.props.filters)}</Copy>
          </Wrapper>
          <Row style={{justifyContent: "flex-start"}}>

            <PillButton primary={true} style={{marginLeft: 0}} onPress={()=>{
              this.props.applyFilters({
                filters: this.props.filters,
                preset: this.state.preset,
                preset_object: this.state.preset_object})
              if(this.props.isMobile){
                this.props.appRedirect({redirect: "goBack"})
              }
            }}>
              {this.state.preset != null ? "Apply Preset" : "Apply Filters"}
            </PillButton>

            <Button style={{marginLeft: 5, alignItems:"center", justifyContent: "center"}} onPress={()=>{
              this.props.setFilters(this.props.applied_filters);
              if(this.props.isMobile){
                this.props.appRedirect({redirect: "goBack"})
              }
            }}>
              <Copy><Bold>Cancel Changes</Bold></Copy>
            </Button>
          </Row>
        </Card>
      )
    }
  }


  renderBody(){



      return(
        <Wrapper style={{height: "100%", position: "relative"}}>
          <Header
            title={"Filter Leads"}
            leftButtonIcon={this.props.isMobile ? "arrow-back" : "close"}
            leftButtonAction={()=>{
              this.handleBack()
            }}
            rightButtonTitle={this.checkIfNeedsToApplyFilter() ? this.state.preset != null ? "Apply Preset" : "Apply Filters" : ""}
            rightButtonAction={this.checkIfNeedsToApplyFilter() ? ()=>{
              this.props.applyFilters({
                filters: this.props.filters,
                preset: this.state.preset,
                preset_object: this.state.preset_object})
              if(this.props.isMobile){
                this.props.appRedirect({redirect: "goBack"})
              }
            } : ()=>{
            }}


          />
          <KeyboardView style={{
            height: "100%"
          }}>

            <Presets
              updatePreset={this.updatePreset}
              preset={this.state.preset}
              preset_object={this.state.preset_object}
              {...this.props}
            />

            {this.renderFilters()}
            <Wrapper style={{marginBottom: this.props.isMobile ? 100 : 0}}/>
          </KeyboardView>
          {this.renderApplyButton()}
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

const mapStateToProps = ({ auth, native, settings, filter, billing }) => {
  const { token, user } = auth;
  const { platform, device, isMobile } = native;

  const { plan_modules, card_info } = billing;
  const { colors } = settings;
  const {
    original_filters,
    filters,
    team_filters,
    applied_filters, applied_filters_preset, applied_filters_preset_object
  } = filter;

  return {
    token,
    user,
    platform,
    device,
    colors,
    isMobile,
    plan_modules, card_info,
    original_filters,
    team_filters,
    filters,
    applied_filters, applied_filters_preset, applied_filters_preset_object
  };
}


export default connect(mapStateToProps, {
  appRedirect,
  hidePropertyList,
  getTeamFilters,
  applyFilters,
  setPresetModal,
  setFilters
})(LeadFilters);
