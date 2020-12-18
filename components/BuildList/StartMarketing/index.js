import React, { Component } from "react";

import { Wrapper, Row, Title, Copy, Card, Input } from "app/NativeComponents/common";
import { ToggleSwitch } from "app/NativeComponents/snippets";

import NumberCheck from '../NumberCheck'

class StartMarketing extends Component {

  checkSuccess(){
    return true;
  }

  render() {
    if(this.props.location_success && this.props.preset_success && this.props.name_success && this.props.smart_list == 1){

      return (
        <Row style={{alignItems: "flex-start", marginTop: 20}}>
          <NumberCheck
            number={5}
            colors={this.props.colors}
            is_successful={this.checkSuccess()}
            isMobile={this.props.isMobile}
          />
          <Wrapper style={{flex: 1}}>
            <Card>
              <ToggleSwitch
                value={this.props.start_marketing == 1 ? true : false}
                onChange={value => {
                  //change approveDeals
                  this.props.editListBuilderField({ prop: "start_marketing", value: value == true ? 1 : 0 })
                }}
                title={"Sync Marketing to Smart List"}
                text={"Automatically turn marketing on/off as properties enter/leave your smart list. Your default mail settings will be applied to new properties."}
              />
            </Card>
          </Wrapper>
        </Row>
      )
    }

    return <Wrapper />

  }
}


export default StartMarketing;
