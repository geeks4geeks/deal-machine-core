import React, { Component } from "react";
import { Wrapper, Row, Copy, Icon, Button } from "app/NativeComponents/common";

import PresetItem from 'app/DealMachineCore/snippets/Presets/PresetItem';
import {
  dismissMobileKeyboard
} from "app/NativeActions";

class CustomFilters extends Component {


  renderShowMoreButton(){
    if(this.props.lists_limits.limit == -1 || this.props.lists_limits.limit > this.props.lists_limits.used_filters.length){
      if(this.props.preset !== null){
        return(
          <Button
          style={{marginLeft: 10, marginBottom:5, alignItems: "center", justifyContent: "center"}}
          onPress={()=>{
            this.props.toggleMoreFilters(!this.props.show_more_filters);
          }}>
            <Row>
              <Copy>
                {this.props.show_more_filters ? "Hide Filters" : "Show All Filters"}
              </Copy>
              <Icon
                icon={this.props.show_more_filters ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                size={18}
                style={{marginLeft: 5}}
              />
            </Row>
          </Button>
        )
      }
    }
  }

  render() {
    return (
      <Wrapper style={{padding: 20, paddingLeft: 10, paddingRight: 10}}>
        <Copy style={{marginBottom: 10}}>Or use custom filters:</Copy>
        <Row style={{flexWrap: "wrap", overflow: "visible"}}>
          <PresetItem
            onPress={({preset_id, preset_object})=>{
              if(this.props.lists_limits.limit == -1 || this.props.lists_limits.limit > this.props.lists_limits.used_filters.length){
                dismissMobileKeyboard();
                this.props.toggleMoreFilters(true);
                this.props.switchPreset({preset: null, preset_object: null})
              }else{
                this.props.setFeatureModal({
                  slug: "lists",
                  require_tier: parseInt(this.props.plan_module_info.tier)+1
                })
                this.props.appRedirect({redirect: "goForward", payload:{add: "get-feature"}})
              }

            }}
            is_active={this.props.preset == null ? true : false}
            title={"Custom List"}
            preset={null}

          />
          {this.renderShowMoreButton()}
        </Row>
      </Wrapper>
    )
  }
}


export default CustomFilters;
