import React, { Component } from 'react';
import {
  Wrapper
} from 'app/NativeComponents/common';

import { LineGraph, LineGraphStats } from 'app/NativeComponents/snippets';

class PropertiesAddedGraph extends Component{

  render(){
    if(this.props.analytics_dates){
      if(this.props.analytics_dates.length > 0){
        return (
          <Wrapper style={{paddingRight: this.props.isMobile ? 40 : 0}}>
            <LineGraphStats
              title="Leads Added"
              new_value={this.props.getTotalValue("total_houses_added")}
              old_value={this.props.getTotalValue("prev_total_houses_added")}
              new_label={this.props.renderDateLabels("date")}
              old_label={this.props.renderDateLabels("prev_date")}

            />

            <LineGraph
              title="Leads Added"
              data1={this.props.analytics_dates}
              x_title={"Date"}
              y_title={"Leads Added"}

              x_key1={"date"}
              y_key1={"total_houses_added"}
              x_key2={"prev_date"}
              y_key2={"prev_total_houses_added"}
            />
          </Wrapper>
        );
      }
    }

    //render a placeholder card eventually
    return <Wrapper />;

  }

}

export default PropertiesAddedGraph;
