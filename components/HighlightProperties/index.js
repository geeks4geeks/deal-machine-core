import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ModalContainer, RightPanelContainer, KeyboardView, Row, Wrapper, Copy, Button, Bold, Card } from 'app/NativeComponents/common';
import { Header, PillButton } from 'app/NativeComponents/snippets';

import {
  appRedirect,
  hidePropertyList,
  getTeamFilters,
  applyHighlights,
  setPresetModal,
  setFilters,

  checkIfUserHasModule,
  checkIfFilterChanged,

  getCustomFilterText
} from 'app/NativeActions';


import Presets from './Presets';
import OnboardingContainer from 'app/DealMachineCore/snippets/OnboardingContainer';

import Filters from 'app/DealMachineCore/snippets/Filters';

class HighlightProperties extends Component {

  constructor(props){
    super(props);

    const plan_module_info = checkIfUserHasModule({plan_modules: props.plan_modules, user: props.user, slug: "driving"})

    this.state = {
      plan_module_info: plan_module_info,
      preset: this.props.applied_highlights_preset,
      preset_object: this.props.applied_highlights_preset_object
    }

    this.updatePreset = this.updatePreset.bind(this)
    this.handleBack = this.handleBack.bind(this);
  }

  updatePreset({preset, preset_object}){
    this.setState({
      preset,
      preset_object
    })
  }

  componentDidMount() {
    this.props.hidePropertyList(true);
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.preset_object !== this.state.preset_object && this.state.preset_object !== null){
      this.props.setFilters(this.state.preset_object.filter_json)
    }
  }

  checkIfNeedsToApplyFilter(){
    if(this.props.applied_highlights_preset !== this.state.preset){
      return true;
    }

    if(checkIfFilterChanged(this.props.applied_highlights, this.props.filters)){
      return true;
    }

    return false;
  }




  handleBack(){
    this.props.hidePropertyList(false)
    this.props.appRedirect({redirect: "goBack", payload:{remove: "highlight-properties"}});
  }

  renderFilters(){
    if(this.state.preset == null){
      return(
        <Filters
          title={"Select Custom Filters:"}
          set_filters={this.props.applied_highlights}
          include_property_fitlers={true}
          include_deal_fitlers={false}
          include_property_input_filters={false}
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
            <Copy>{getCustomFilterText(this.props.filters, true) === "" ? "Clear all highlights" : getCustomFilterText(this.props.filters, true)}</Copy>
          </Wrapper>
          <Row style={{justifyContent: "flex-start"}}>

            <PillButton primary={true} style={{marginLeft: 0}} onPress={()=>{
              this.props.applyHighlights({
                filters: this.props.filters,
                preset: this.state.preset,
                preset_object: this.state.preset_object})
              if(this.props.isMobile){
                this.props.appRedirect({redirect: "goBack"})
              }
            }}>
              {this.state.preset != null ? "Apply Preset" : "Apply Highlights"}
            </PillButton>

            <Button style={{marginLeft: 5, alignItems: "center", justifyContent: "center"}} onPress={()=>{
              this.props.setFilters(this.props.applied_highlights);
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

      if((!this.state.plan_module_info.has_module || this.props.card_info.bad_card == 1)){
        return <OnboardingContainer
                  slug="driving"
                  contentful_slug="drivingHighlights"
                  title={"Filters"}
                  plan_module_info={this.state.plan_module_info}

                  noContainer
                  leftButtonIcon={this.props.device == "desktop" ? "close" : "arrow-back"}
                  leftButtonAction={this.handleBack}
                />
      }



      return(
        <Wrapper style={{height: "100%", position: "relative"}}>
          <Header
            title={"Highlight Properties"}
            leftButtonIcon={this.props.isMobile ? "arrow-back" : "close"}
            leftButtonAction={this.handleBack}
            rightButtonTitle={this.checkIfNeedsToApplyFilter() ? this.state.preset != null ? "Apply Preset" : "Apply Highlights" : ""}
            rightButtonAction={this.checkIfNeedsToApplyFilter() ? ()=>{
              this.props.applyHighlights({
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
    applied_highlights,
    applied_highlights_preset,
    applied_highlights_preset_object
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
    applied_highlights, applied_highlights_preset, applied_highlights_preset_object
  };
}


export default connect(mapStateToProps, {
  appRedirect,
  hidePropertyList,
  getTeamFilters,
  applyHighlights,
  setPresetModal,
  setFilters
})(HighlightProperties);
