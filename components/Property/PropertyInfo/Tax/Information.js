import React, { Component } from 'react';
import {
  Wrapper,
  CardBody,
  Split,
  Stretch
} from 'app/NativeComponents/common';
import {
  InformationItem
} from 'app/NativeComponents/snippets';

class Information extends Component{

  render(){
    //if(this.props.tab === "tax"){
      return (
        <Wrapper>
          <InformationItem
          style={{marginBottom: 15}}
          size="medium"
            item={this.props.active_property.calculated_improvement_value}
            label={"Improvement Value:"}
            format={"money"}
          />
          <InformationItem
          style={{marginBottom: 15}}
          size="medium"
            item={this.props.active_property.calculated_land_value}
            label={"Land Value:"}
            format={"money"}
          />
          {/*
          <InformationItem
            style={{marginBottom: 10}}
            item={this.props.active_property.calculated_total_value}
            label={"Assessed Value:"}
            format={"money"}
          />*/}
        </Wrapper>
      );
    //}

    //return <Wrapper />
  }
}

export default Information;
