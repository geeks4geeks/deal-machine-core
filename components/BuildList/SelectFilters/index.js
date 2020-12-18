import React, { Component } from "react";

import { Wrapper, Row, Title, Copy, Bold, Card, Icon, Button } from "app/NativeComponents/common";
import { PillButton, CardLabel } from "app/NativeComponents/snippets";


import {
  dismissMobileKeyboard,
  renderDate,
  getCustomFilterText
} from "app/NativeActions";

import NumberCheck from '../NumberCheck'
import SystemPresets from 'app/DealMachineCore/snippets/Presets/SystemPresets';
import CustomPresets from 'app/DealMachineCore/snippets/Presets/CustomPresets';
import CustomFilters from './CustomFilters';
import Filters from 'app/DealMachineCore/snippets/Filters';

import OnboardingText from "app/DealMachineCore/snippets/OnboardingText";

class SelectLocationType extends Component {

  constructor(props){
    super(props);

    this.state = {
      show_more_filters: false,
      show_more_info: false
    }

    this.toggleMoreFilters = this.toggleMoreFilters.bind(this)
  }

  toggleMoreFilters(toggle){
    this.setState({
      show_more_filters: toggle
    });
    
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.preset != prevProps.preset){
      this.props.editListBuilderField({prop: "preset_success", value: this.checkSuccess()})
    }


    if(this.props.preset !== prevProps.preset && this.props.preset !== null && this.state.show_more_filters == true){
      this.toggleMoreFilters(false)
    }else if(this.props.preset === null && this.state.show_more_filters == false){
      this.toggleMoreFilters(true)
    }
  }

  checkSuccess() {
    const { preset } = this.props;
    return preset !== -1
  }

  renderFilters(){
    if(this.props.lists_limits.limit == -1 || this.props.lists_limits.limit > this.props.lists_limits.used_filters.length){
      if(!this.state.show_more_filters) return null;
      return(
        <Filters
          title={"Select Custom Filters:"}
          set_filters={
            this.props.preset !== null && this.props.preset_object !== null ?
            this.props.preset_object.filter_json :
            this.props.original_filters
          }
          include_property_fitlers={true}
          include_deal_fitlers={false}
          include_property_input_filters={false}
        />
      )
    }
  }

  renderLimitInfo(){

    if(this.props.lists_limits.limit == -1){
      return(
        <Wrapper>
          <Row>
            <Wrapper style={{flex: 1}}>
              <Copy>
              Find homeowners who want to sell at a discounted price. You have unlimited list types allowed per month.
              </Copy>
            </Wrapper>
          </Row>
        </Wrapper>
      )
    }else{
      return(
        <Wrapper>
          <Row>
            <Wrapper style={{flex: 1, paddingRight: 20}}>
              <Copy>
                Find homeowners who want to sell at a discounted price. You have built {this.props.lists_limits.used_filters.length} of your {this.props.lists_limits.limit == -1 ? "unlimited list types" : this.props.lists_limits.limit == 1 ? "1 list type" : this.props.lists_limits.limit+" list types"} allowed this month.
                Your account will reset on {renderDate(this.props.lists_limits.reset_day)}.
              </Copy>
            </Wrapper>
            <PillButton innerStyle={{padding: 5, paddingLeft: 15, paddingright: 15}} onPress={()=>{
              this.setState({
                show_more_info: !this.state.show_more_info
              })
            }}>
              {this.state.show_more_info ? "Hide Info" : "Show More Info"}
            </PillButton>
          </Row>
          {this.renderMoreInfo()}
        </Wrapper>
      )
    }
  }

  renderMoreInfo(){
    if(this.state.show_more_info){
      return(
        <Wrapper style={{paddingTop: 20}}>
          <OnboardingText
            slug="listsMoreFitlers"
            style={{
              padding: 0
            }}
            innerStyle={{
              paddingTop: 20
            }}
          />
          <PillButton
            primary={true}
            style={{
              marginLeft: 0
            }}
            onPress={()=>{
              this.props.setFeatureModal({
                slug: "lists",
                require_tier: 2
              })
              this.props.appRedirect({redirect: "goForward", payload:{add: "get-feature"}})
            }}
          >
            View Pricing
          </PillButton>
        </Wrapper>
      )
    }
  }

  renderUsedFitlers(){
    if(this.props.lists_limits.limit != -1 && this.props.lists_limits.used_filters.length > 0){
      return(
        <Wrapper style={{padding: 10, paddingBottom: 0}}>
          <Copy style={{marginBottom: 10}}>Recent list types built:</Copy>
          <Row style={{flexWrap: "nowrap"}}>

              {
                this.props.lists_limits.used_filters.map((filter, i)=>{
                  const temp_preset_id = ((i+2)*-1);
                  return(
                    <Button key={i} onPress={()=>{
                      dismissMobileKeyboard();
                      this.props.switchPreset({preset: filter.preset_id && filter.preset_id != "" ? filter.preset_id : temp_preset_id, preset_object: filter})
                    }}>
                      <Card style={{margin: 0, marginBottom: 5, marginRight: 5, padding: 25, paddingLeft: 15, paddingTop: 5, paddingBottom: 5, borderRadius: 30}}>
                        <Row>
                          <Icon
                            icon={filter.preset_id && filter.preset_id != "" ?
                              this.props.preset == filter.preset_id ? "radio-button-checked" : "radio-button-unchecked" :
                            this.props.preset == temp_preset_id ? "radio-button-checked" : "radio-button-unchecked"}
                            size={18}
                            style={{marginRight: 10}}
                          />
                          <Wrapper style={{maxWidth: 150}}>
                            <Copy><Bold>{filter.preset_title}</Bold></Copy>
                            <Copy style={{fontSize: 12}}>{getCustomFilterText(filter.filters)+" Created "+renderDate(filter.date_created, true)+"."}</Copy>
                          </Wrapper>
                        </Row>
                      </Card>
                    </Button>

                  )
                })
              }
          </Row>
        </Wrapper>
      )
    }
  }

  renderNewFilters(){
    //if(this.props.lists_limits.limit == -1 || this.props.lists_limits.limit > this.props.lists_limits.used_filters.length){

      return(
        <Wrapper>
          <SystemPresets
            title="Use a Quick List:"
            onPress={({preset_id, preset_object})=>{
              if(this.props.lists_limits.limit == -1 || this.props.lists_limits.limit > this.props.lists_limits.used_filters.length){
                dismissMobileKeyboard();
                this.props.switchPreset({preset: preset_id, preset_object: preset_object})
              }else{
                this.props.setFeatureModal({
                  slug: "lists",
                  require_tier: parseInt(this.props.plan_module_info.tier)+1
                })
                this.props.appRedirect({redirect: "goForward", payload:{add: "get-feature"}})
              }
            }}
            active_preset={this.props.preset}
          />
          <CustomPresets
            {...this.props}
            title="Or one of your presets:"
            onPress={({preset_id, preset_object})=>{
              if(this.props.lists_limits.limit == -1 || this.props.lists_limits.limit > this.props.lists_limits.used_filters.length){
                dismissMobileKeyboard();
                this.props.switchPreset({preset: preset_id, preset_object: preset_object})
              }else{
                this.props.setFeatureModal({
                  slug: "lists",
                  require_tier: parseInt(this.props.plan_module_info.tier)+1
                })
                this.props.appRedirect({redirect: "goForward", payload:{add: "get-feature"}})
              }

            }}
            active_preset={this.props.preset}
          />
          <CustomFilters
            {...this.props}
            show_more_filters={this.state.show_more_filters}
            toggleMoreFilters={this.toggleMoreFilters}
          />
          {this.renderFilters()}

        </Wrapper>
      )
    //}
  }

  render() {
    if(this.props.location_success && this.props.lists_limits && !this.props.lists_refreshing){
      return (
        <Row style={{alignItems: "flex-start", marginTop: 20}}>

          <NumberCheck
            number={2}
            colors={this.props.colors}
            is_successful={this.checkSuccess()}
            isMobile={this.props.isMobile}

          />

          <Wrapper style={{flex: 1}}>
            <Wrapper style={{padding: this.props.isMobile ? 20 : 0, paddingLeft: this.props.isMobile ? 10 : 0, paddingRight: this.props.isMobile ? 10 : 0}}>
              <Title>{this.props.isMobile ? "2.) Select Motivations:" : "Select Motivations:"}</Title>
              {this.renderLimitInfo()}
            </Wrapper>
            {this.renderUsedFitlers()}
            {this.renderNewFilters()}




          </Wrapper>
        </Row>
      )
    }

    return <Wrapper />

  }
}


export default SelectLocationType;
