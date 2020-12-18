import React, { Component } from 'react';
import {
  Wrapper,
  Card
} from 'app/NativeComponents/common';

import { LineGraph, LineGraphStats } from 'app/NativeComponents/snippets';

class MailSentGraph extends Component{

  render(){
    if(this.props.analytics_dates){
      if(this.props.analytics_dates.length > 0){

        return (
          <Wrapper style={{paddingRight: this.props.isMobile ? 40 : 0}}>

            <LineGraphStats
              title="Mailers Sent"
              new_value={this.props.getTotalValue("total_mailers_sent")}
              old_value={this.props.getTotalValue("prev_total_mailers_sent")}
              new_label={this.props.renderDateLabels("date")}
              old_label={this.props.renderDateLabels("prev_date")}

            />

            <LineGraph
              title="Mailers Sent"
              data1={this.props.analytics_dates}
              x_title={"Date"}
              y_title={"Mailers Sent"}

              x_key1={"date"}
              y_key1={"total_mailers_sent"}
              x_key2={"prev_date"}
              y_key2={"prev_total_mailers_sent"}
            />
          </Wrapper>
        );
      }
    }

    //render a placeholder card eventually
    return <Wrapper />;

  }

}

export default MailSentGraph;
