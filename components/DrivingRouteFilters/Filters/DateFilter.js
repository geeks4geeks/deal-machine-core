import React, { Component } from 'react';

import { Wrapper } from 'app/NativeComponents/common';
import { DateRangePicker } from 'app/NativeComponents/snippets';

class DateFilter extends Component{


  render(){
    return (
      <Wrapper>
        <DateRangePicker
          isCalendarOpen={this.props.isCalendarOpen}
          toggleCalendar={this.props.toggleCalendar}
          selectDates={({start_date, end_date})=>{
            if(start_date != null && end_date != null){
              this.props.updateRouteFilter({prop: "start_date", value: start_date})
              this.props.updateRouteFilter({prop: "end_date", value: end_date})
            }else{
              this.props.updateRouteFilter({prop: "start_date", value: null})
              this.props.updateRouteFilter({prop: "end_date", value: null})
            }
          }}
        />
      </Wrapper>
    );
  }
}

export default DateFilter;
