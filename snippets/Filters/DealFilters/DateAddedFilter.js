import React, { Component } from 'react';

import {
  Title, Copy, Button, Wrapper
} from 'app/NativeComponents/common';

import {
  DateRangePicker
} from 'app/NativeComponents/snippets';

import SelectFilter from '../SelectFilter'
import moment from 'moment';

class DateAddedFilter extends Component {

  constructor(props){

    super(props);

    this.state = {
      isCalendarOpen: false,
      options: [{
        value: -1,
        label: "Any"
      },
      {
        value: "last_24_hours",
        label: "Added within the last 24 hours"
      },
      {
        value: "last_48_hours",
        label: "Added within the last 48 hours"
      },
      {
        value: "last_7_days",
        label: "Added within the last 7 days"
      },
      {
        value: "last_30_days",
        label: "Added within the last 30 days"
      },
      {
        value: "last_1_year",
        label: "Added within the last year"
      },
      {
        value: "custom",
        label: "Select custom dates"
      }]
    }
  }

  toggleCalendar(toggle){
    this.setState({isCalendarOpen: toggle});
  }

  componentDidUpdate(prevProps){
    if(this.props.filters.date_added_dropdown !== prevProps.filters.date_added_dropdown && this.props.date_added_dropdown !== "custom"){
      this.props.editDateAddedFilter({
        start_date: null,
        end_date: null
      });
    }
  }

  renderDatePicker(){
    if(this.props.filters.date_added_dropdown === "custom"){

      let date_copy = "Showing leads added during any date";
      if(this.props.filters.min_date_added && this.props.filters.max_date_added){
        date_copy = "Showing leads added from "+moment(this.props.filters.min_date_added).format("MMM Do")+" to "+moment(this.props.filters.max_date_added).format("MMM Do")
      }
      return(
        <Button
        onPress={()=>{
          this.toggleCalendar(true)
        }}
        style={{
          backgroundColor: this.props.colors.background_color,
          borderTopWidth: 1,
          borderTopColor: this.props.colors.border_color,
          borderTopStyle: "solid",
          padding: 20
        }}>
          <Title>Select dates</Title>
          <Copy>{date_copy}</Copy>
        </Button>
      )
    }
  }

  render(){

    return (
          <Wrapper>
            <SelectFilter
              filter_title="Date Added"
              filter_options={this.state.options}
              filter_value={this.props.filters.date_added_dropdown}
              filter_prop={"date_added_dropdown"}
              filter_search={this.props.filter_search}
              editLeadFilter={this.props.editLeadFilter}
            />
            {this.renderDatePicker()}

            <DateRangePicker
              {...this.props}
              start_date={this.props.filters.min_date_added}
              end_date={this.props.filters.max_date_added}

              isCalendarOpen={this.state.isCalendarOpen}
              toggleCalendar={this.toggleCalendar.bind(this)}
              selectDates={({start_date, end_date})=>{

                this.props.editDateAddedFilter({
                  start_date: start_date ? moment(start_date).format("YYYY-MM-DD") : null,
                  end_date: end_date ? moment(end_date).format("YYYY-MM-DD") : null
                });

                this.toggleCalendar(false)

              }}
            />
          </Wrapper>
        )
  }

}


export default DateAddedFilter;
