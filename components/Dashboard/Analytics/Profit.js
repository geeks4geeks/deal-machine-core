import React, { Component } from 'react';
import {
  Wrapper,
  Card,
  CardBody,
  Copy,
  Bold
} from 'app/NativeComponents/common';

import { LineGraph, LineGraphStats } from 'app/NativeComponents/snippets';

import {
  numberWithCommas
} from 'app/NativeActions';

class Profit extends Component{

  renderCopy(){

    if(this.props.getTotalValue("total_profit") == "--" && this.props.getTotalValue("prev_total_profit") == "--"){
      return(
        <CardBody style={{
          justifyContent: "center",
          alignItems: "center"
        }}>
          <Copy style={{
            textAlign:"center"
          }}>Make sure to mark any closed deals as <Bold>"Won Deal"</Bold> to track your <Bold>ROI</Bold>.</Copy>
        </CardBody>
      )
    }

  }

  render(){
    if(this.props.analytics_dates){
      if(this.props.analytics_dates.length > 0){

        return (
          <Wrapper style={{paddingRight: this.props.isMobile ? 40 : 0}}>

            <LineGraphStats
              title="Profit"
              new_value={this.props.getTotalValue("total_profit")}
              old_value={this.props.getTotalValue("prev_total_profit")}
              new_label={this.props.renderDateLabels("date")}
              old_label={this.props.renderDateLabels("prev_date")}

              format={"profit"}

            />

            <LineGraph
              title="Profit"
              data1={this.props.analytics_dates}
              x_title={"Date"}
              y_title={"Mailers Sent"}

              x_key1={"date"}
              y_key1={"total_profit"}
              x_key2={"prev_date"}
              y_key2={"prev_total_profit"}

              format={"profit"}
            />

            {this.renderCopy()}
          </Wrapper>
        );
      }
    }

    //render a placeholder card eventually
    return <Wrapper />;

  }

}

export default Profit;
