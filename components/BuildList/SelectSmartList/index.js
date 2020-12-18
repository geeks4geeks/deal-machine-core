import React, { Component } from "react";

import { Wrapper, Row, Title, Copy, Card, Input } from "app/NativeComponents/common";
import { ToggleSwitch } from "app/NativeComponents/snippets";

import NumberCheck from '../NumberCheck'

class SelectSmartList extends Component {


  componentDidMount(){

  }

  componentDidUpdate(prevProps, prevState){
    if(false){
      this.props.editListBuilderField({prop: "smart_success", value: this.checkSuccess()})
    }


  }

  checkSuccess(){
    return true;
  }

  render() {
    if(this.props.location_success && this.props.preset_success && this.props.name_success){

      return (
        <Row style={{alignItems: "flex-start", marginTop: 20}}>

          <NumberCheck
            number={4}
            colors={this.props.colors}
            is_successful={this.checkSuccess()}
            isMobile={this.props.isMobile}
          />
          <Wrapper style={{flex: 1}}>

            <Card>
              <ToggleSwitch
                value={this.props.smart_list == 1 ? true : false}
                onChange={value => {
                  //change approveDeals
                  this.props.editListBuilderField({ prop: "smart_list", value: value == true ? 1 : 0 })
                }}
                title={"Smart List"}
                text={"Regular lists become outdated the moment you pull them.. Smart lists stay in sync with sellers’ situations on a weekly basis. If a home no longer fits your list criteria, we automatically remove the lead from your list and your CRM so you stay focused on the leads that matter most."}
              />
            </Card>

          </Wrapper>
        </Row>
      )
    }

    return <Wrapper />

  }
}


export default SelectSmartList;
