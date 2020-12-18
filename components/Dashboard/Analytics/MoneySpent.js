import React, { Component } from 'react';
import {
  Wrapper,
  Card
} from 'app/NativeComponents/common';

import { LineGraph, LineGraphStats } from 'app/NativeComponents/snippets';

import {
  numberWithCommas
} from 'app/NativeActions';


class MoneySpent extends Component{

  render(){
    if(this.props.analytics_dates){
      if(this.props.analytics_dates.length > 0){

        return (
          <Wrapper style={{paddingRight: this.props.isMobile ? 40 : 0}}>

            <LineGraphStats
              title="Total Investment"
              new_value={this.props.getTotalValue("total_money_spent")}
              old_value={this.props.getTotalValue("prev_total_money_spent")}
              new_label={this.props.renderDateLabels("date")}
              old_label={this.props.renderDateLabels("prev_date")}

              format={"spend"}

            />

            <LineGraph
              title="Total Investment"
              data1={this.props.analytics_dates}
              x_title={"Date"}
              y_title={"Mailers Sent"}

              x_key1={"date"}
              y_key1={"total_money_spent"}
              x_key2={"prev_date"}
              y_key2={"prev_total_money_spent"}

              format={"spend"}
            />
          </Wrapper>
        );
      }
    }

    //render a placeholder card eventually
    return <Wrapper />;

  }

}

export default MoneySpent;
