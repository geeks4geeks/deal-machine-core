import React, { Component } from 'react';
import {
  Wrapper,
  Card
} from 'app/NativeComponents/common';

import { LineGraph, LineGraphStats } from 'app/NativeComponents/snippets';

class MilesDriven extends Component{


  render(){
    if(this.props.analytics_dates){
      if(this.props.analytics_dates.length > 0){

        return (
          <Wrapper style={{paddingRight: this.props.isMobile ? 40 : 0}}>
            <LineGraphStats
              title="Miles Driven"
              new_value={this.props.getTotalValue("total_miles_driven")}
              old_value={this.props.getTotalValue("prev_total_miles_driven")}
              new_label={this.props.renderDateLabels("date")}
              old_label={this.props.renderDateLabels("prev_date")}

              format={"miles"}
            />

            <LineGraph
              title="Miles Driven"
              data1={this.props.analytics_dates}
              x_title={"Date"}
              y_title={"Miles Driven"}

              x_key1={"date"}
              y_key1={"total_miles_driven"}
              x_key2={"prev_date"}
              y_key2={"prev_total_miles_driven"}

              format={"miles"}
            />
          </Wrapper>
        );
      }
    }

    //render a placeholder card eventually
    return <Wrapper />;

  }

}

export default MilesDriven;
