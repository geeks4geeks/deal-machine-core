import React, { Component } from "react";

import { Wrapper, Row, Title, Copy, Card, Input } from "app/NativeComponents/common";


import {
  toTitleCase
} from "app/NativeActions";

import NumberCheck from '../NumberCheck'

import moment from 'moment'
class NameList extends Component {

  componentDidUpdate(prevProps, prevState){
    if(this.props.list_name !== prevProps.list_name){
      this.props.editListBuilderField({
        prop: "name_success",
        value: this.checkSuccess()
      })
    }

    if(this.props.preset !== prevProps.preset ||
      this.props.preset_object !== prevProps.preset_object ||
      this.props.location_type !== prevProps.location_type ||
      this.props.zip !== prevProps.zip ||
      this.props.city !== prevProps.city||
      this.props.state !== prevProps.state
    ){

      let list_name = "Leads filtered by \"";

      if(this.props.preset_object != null){

        list_name += toTitleCase(this.props.preset_object.title);

      }else{
        list_name += "Custom Filters";
      }
      list_name += "\"";

      switch(this.props.location_type){
        case "zip":
          list_name += " in "+this.props.zip;
        break;

        case "city":
          if(this.props.state.length > 0){
            list_name += " in "+this.props.city+", "+this.props.state;
          }else{
            list_name += " in "+this.props.city;
          }
        break;

        case "draw":
          list_name += " in custom area";
        break;
      }

      list_name += " ("+moment().format("MMM Do, YYYY")+")";

      this.props.editListBuilderField({prop: "list_name", value: list_name})
    }
  }

  checkSuccess(){
    return !!this.props.list_name
  }

  render() {
    if(this.props.location_success && this.props.preset_success){
      return (
        <Row style={{alignItems: "flex-start", marginTop: 20}}>

          <NumberCheck
            number={3}
            colors={this.props.colors}
            is_successful={this.checkSuccess()}
            isMobile={this.props.isMobile}

          />

          <Wrapper style={{flex: 1}}>
            <Wrapper style={{padding: this.props.isMobile ? 20 : 0, paddingLeft: this.props.isMobile ? 10 : 0, paddingRight: this.props.isMobile ? 10 : 0}}>

              <Title>{this.props.isMobile ? "3.) Name Your List:" : "Name Your List:"}</Title>
              <Copy>Stay organized with your leads in DealMachine CRM by giving this list a descriptive name.</Copy>
            </Wrapper>
            <Card>
              <Input
                ref="name"
                name="name"
                blurOnSubmit={true}
                autoCapitalize="words"
                returnKeyType={"done"}
                placeholder="Enter a name for your list"
                maxLength={5}
                onChange={value => this.props.editListBuilderField({ prop: "list_name", value: value })}
                onSubmitEditing={()=>{}}
                value={this.props.list_name}
                type="text"
              />
            </Card>

          </Wrapper>
        </Row>
      )
    }

    return <Wrapper />

  }
}


export default NameList;
