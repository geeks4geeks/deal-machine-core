import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ModalContainer, RightPanelContainer, KeyboardView, Row, Wrapper, Copy, Card, Input } from 'app/NativeComponents/common';
import { Header, ToggleSwitch } from 'app/NativeComponents/snippets';

import {
  appRedirect,
  updateTeamFilter,
  createTeamFilter,

  checkIfUserHasModule,
  checkIfFilterChanged,

} from 'app/NativeActions';


import Filters from 'app/DealMachineCore/snippets/Filters';

class EditPreset extends Component {

  constructor(props){
    super(props);


    const plan_module_info = checkIfUserHasModule({plan_modules: props.plan_modules, user: props.user, slug: "driving"})

    this.state = {
      plan_module_info: plan_module_info,
      preset_title: props.preset_modal ? props.preset_modal.preset_title : "",
      use_for_dealfinders: props.preset_modal ? props.preset_modal.use_for_dealfinders : ""
    }

  }

  updatePresetTitle(preset_title){
    this.setState({preset_title})
  }

  componentDidMount() {
    if(!this.props.preset_modal){
      this.handleBack();
    }
  }

  checkIfNeedsToSavePreset(){
    if(this.props.preset_modal.type == "create"){
      return true;
    }else if(this.state.preset_title !== this.props.preset_modal.preset_title){
      return true;
    }else if(this.state.use_for_dealfinders !== this.props.preset_modal.use_for_dealfinders){
      return true;
    }else if(checkIfFilterChanged(this.props.preset_modal.filters, this.props.filters)){
      return true;
    }
    return false;
  }




  handleBack(){
    this.props.appRedirect({redirect: "goBack", payload:{remove: "preset"}});
  }

  saveFilter(){
    if(this.props.preset_modal.type == "edit" && this.props.preset_modal.preset_id){
      this.props.updateTeamFilter({
        token: this.props.token,
        title: this.state.preset_title,
        description: "",
        use_for_dealfinders: this.state.use_for_dealfinders,
        filters: this.props.filters,
        filter_id: this.props.preset_modal.preset_id
      })
    }else{
      this.props.createTeamFilter({
        token: this.props.token,
        title: this.state.preset_title,
        description: "",
        use_for_dealfinders: this.state.use_for_dealfinders,
        filters: this.props.filters
      })
    }


  }

  renderDealFinderToggle(){
    if((this.state.plan_module_info.has_module && this.props.card_info.bad_card != 1)){
      return(
        <Card>
          <ToggleSwitch
            value={this.state.use_for_dealfinders == 1 ? true : false}
            onChange={value => {
              //change approveDeals
              this.setState({ use_for_dealfinders: value == true ? 1 : 0 });
            }}
            title={"Use preset for DealFinders?"}
            text={"This preset will show highlights on the map for all of your DealFinders."}
          />
        </Card>
      )
    }
  }


  render() {
    if(this.props.preset_modal){
      return (
        <ModalContainer>
          <Wrapper style={{height: "100%"}}>
            <Header
              title={this.props.preset_modal.type == "create" ? "Create Preset" : "Edit Preset"}
              leftButtonIcon={this.props.isMobile ? "arrow-back" : "close"}
              leftButtonAction={()=>{
                this.handleBack()
              }}
              rightButtonTitle={this.checkIfNeedsToSavePreset() ? "Save Preset" : ""}
              rightButtonAction={this.checkIfNeedsToSavePreset() ? ()=>this.saveFilter() : ()=>{}}
            />
            <KeyboardView style={{
              height: "100%"
            }}>

              <Card>
                <Row>
                  <Input
                    style={{
                      borderBottomWidth: 0,
                      flex: 1
                    }}
                    ref="search"
                    name="search"
                    returnKeyType={"search"}
                    blurOnSubmit={true}
                    autoCorrect={false}
                    autoFocus={false}
                    keyboardType="default"
                    placeholder={"Preset Name"}
                    onChange={value => {
                      //location search
                     this.updatePresetTitle(value);

                    }}
                    onSubmitEditing={()=>{

                    }}

                    onFocus={()=>{
                    }}
                    onBlur={()=>{

                    }}

                    value={this.state.preset_title}
                    type="text"
                  />
                </Row>
              </Card>
              {this.renderDealFinderToggle()}
              <Filters
                title={"Edit filters for preset:"}
                set_filters={this.props.preset_modal.filters}
                include_property_fitlers={true}
                include_deal_fitlers={true}
                include_property_input_filters={true}
              />
              <Wrapper style={{marginBottom: this.props.isMobile ? 100 : 0}}/>
            </KeyboardView>
          </Wrapper>
        </ModalContainer>
      );
    }

    return <Wrapper />
  }

}

const mapStateToProps = ({ auth, native, settings, filter, billing }) => {
  const { token, user } = auth;
  const { platform, device, isMobile } = native;

  const { plan_modules, card_info } = billing;
  const { colors } = settings;
  const {
    preset_modal,
    filters
  } = filter;

  return {
    token,
    user,
    platform,
    device,
    isMobile,
    plan_modules, card_info,
    filters,
    preset_modal
  };
}


export default connect(mapStateToProps, {
  appRedirect,
  updateTeamFilter,
  createTeamFilter,
})(EditPreset);
