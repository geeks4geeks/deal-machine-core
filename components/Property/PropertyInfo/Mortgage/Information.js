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
    //if(this.props.tab === "mortgage"){
      return (
        <Wrapper>

          <InformationItem
            style={{marginBottom: 15}}
            size="medium"

            item={this.props.active_property.calculated_equity_percent}
            label={"Equity percent:"}
            format={"percent"}
          />
          <Split>
            <Stretch>
              <InformationItem
                style={{marginBottom: 15}}
                size="medium"

                item={this.props.active_property.mortgage_amount}
                label={"Mortgage amount:"}
                format={"money"}
              />
            </Stretch>
            <Stretch>
              <InformationItem
                style={{marginBottom: 15}}
                size="medium"

                item={this.props.active_property.mortgage_term}
                label={"Mortgage term:"}
                format={"term"}
              />
            </Stretch>

          </Split>
          <InformationItem
            style={{marginBottom: 15}}
            size="medium"

            item={this.props.active_property.lender_name}
            label={"Lender name:"}
            format={"company_name"}
          />
          <InformationItem
            style={{marginBottom: 15}}
            size="medium"

            item={this.props.active_property.second_mortgage_amount}
            label={"2nd mortgage amount:"}
            format={"money"}
          />
          <InformationItem
            style={{marginBottom: 15}}
            size="medium"

            item={this.props.active_property.calculated_total_value}
            label={"Assessed value:"}
            format={"money"}
          />
        </Wrapper>
      );
    //}

    //return <Wrapper />
  }
}

export default Information;
