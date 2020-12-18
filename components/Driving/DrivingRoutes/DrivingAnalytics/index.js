import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Spin, Card, CardBody, Row, Copy, Wrapper, Button, Icon } from 'app/NativeComponents/common';
import { Carousel, DateRangePicker } from 'app/NativeComponents/snippets';

import {
  getAnalytics,
  appRedirect,
  changeAnalyticsDateOption,
  updateSingleAnlyticsFilters,
  setAnalyticsType
} from 'app/NativeActions';

import MilesDriven from './MilesDriven';
import TimeDriven from './TimeDriven';
import DateFilters from './DateFilters';
import FilterTags from './FilterTags';

import moment from 'moment';

class DrivingAnalytics extends Component{

  constructor(props){
    super(props);
    this.state={isCalendarOpen: false};
  }

  toggleCalendar(){
    this.setState((prevState) => {
      return {isCalendarOpen: !prevState.isCalendarOpen};
    });
  };

  getTotalValue(key){
    if(this.props.analytics_dates){
      if(this.props.analytics_dates.length > 0){
        if(this.props.analytics_dates[this.props.analytics_dates.length-1][key]){
          return this.props.analytics_dates[this.props.analytics_dates.length-1][key];
        }
      }
    }

    return "--";
  }

  renderDateLabels(date_key = "date"){
    let first_date = this.props.analytics_dates[0][date_key];
    let last_date = this.props.analytics_dates[this.props.analytics_dates.length-1][date_key];

    if(moment(last_date).format("YYYY") != moment().format("YYYY") || moment(first_date).format("YYYY") != moment().format("YYYY")){
      first_date = moment(first_date).format("M/D/YY")
    }else{
      first_date = moment(first_date).format("MMM Do")
    }

    if(moment(last_date).format("YYYY-MM-DD") == moment().format("YYYY-MM-DD")){
      last_date = "Today";
    }else{

      if(moment(last_date).format("YYYY") != moment().format("YYYY") || moment(first_date).format("YYYY") != moment().format("YYYY")){
        last_date = moment(last_date).format("M/D/YY")
      }else{
        last_date = moment(last_date).format("MMM Do")
      }

    }

    if(first_date == "Invalid date" || last_date == "Invalid date"){
      return "";
    }else{
      return first_date+" → "+last_date;

    }

  }

  componentDidMount(){

    this.props.getAnalytics({
      token: this.props.token,
      start_date: this.props.start_date,
      end_date: this.props.end_date,
      date_option: this.props.date_option,
      filters: this.props.analytics_filters
    });
  }

  componentDidUpdate(prevProps){
    if((prevProps.date_option != this.props.date_option ||
      prevProps.start_date != this.props.start_date ||
      prevProps.end_date != this.props.end_date ||
      prevProps.analytics_filters != this.props.analytics_filters)
      && this.props.date_option && this.props.start_date && this.props.end_date && this.props.analytics_filters
    ){
      this.props.getAnalytics({
        token: this.props.token,
        start_date: this.props.start_date,
        end_date: this.props.end_date,
        date_option: this.props.date_option,
        filters: this.props.analytics_filters
      });
    }
  }

  renderFilters(){
    return(
      <Wrapper>
        <Row style={{justifyContent: "flex-end"}}>
          <Button onPress={()=>{
            this.props.setAnalyticsType("driving")
            this.props.appRedirect({
              redirect: "driving_analytics_filters"
            })
          }} style={{
            width: 50,
            height: 50,
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Icon
              size={26}
              icon="filter-list"
            />
          </Button>
        </Row>
        <DateRangePicker
          {...this.props}
          isCalendarOpen={this.state.isCalendarOpen}
          toggleCalendar={this.toggleCalendar.bind(this)}
          selectDates={({start_date, end_date})=>{
            if(start_date != null && end_date != null){
              this.props.changeAnalyticsDateOption({
                date_option: "custom",
                user: this.props.user,
                start_date: start_date,
                end_date: end_date
              });
            }
          }}
        />
        <DateFilters
          {...this.props}
          toggleCalendar={this.toggleCalendar.bind(this)}
        />
      </Wrapper>
    )
  }

  render(){
    if(this.props.analytics_loading){
      return (
        <Card>
          {this.renderFilters()}
          <FilterTags {...this.props}/>

          <CardBody>

            <Row style={{alignItems: "center", justifyContent: "center"}}>
              <Spin size="small"/>
              <Copy style={{marginLeft: 10}}>Loading Analytics...</Copy>
            </Row>
          </CardBody>
        </Card>
      );
    }

    return(
      <Card style={{paddingBottom: this.props.isMobile ? 0 : 30}}>
        {this.renderFilters()}
        <FilterTags {...this.props}/>

        <Carousel
          items={[{
            slug:"miles_driven"
          }, {
            slug:"time_driven"
          }]}
          renderItem={({item})=>{
            switch(item.slug){
              case "miles_driven":
                return <MilesDriven

                          getTotalValue={this.getTotalValue.bind(this)}
                          renderDateLabels={this.renderDateLabels.bind(this)}
                          {...this.props}
                        />
              break;

              case "time_driven":
                return <TimeDriven
                          getTotalValue={this.getTotalValue.bind(this)}
                          renderDateLabels={this.renderDateLabels.bind(this)}
                          {...this.props}
                        />
              break;
            }

            return <Wrapper />
          }}
          include_pagination={true}
          dotColor={this.props.colors.text_color}
        />
      </Card>
    );

  }
}

const mapStateToProps = ({ auth, native, analytics, settings }) => {
  const { token, user } = auth;
  const { device, isMobile } = native;
  const { colors } = settings;

  const {
    analytics_dates,
    active_deals,
    analytics_loading,
    analytics_refreshing,
    date_option,
    start_date,
    end_date,
    analytics_filters
  } = analytics;

  return {
    token,
    user,
    device,
    isMobile,
    colors,

    analytics_dates,
    active_deals,
    analytics_loading,
    analytics_refreshing,

    date_option,
    start_date,
    end_date,

    analytics_filters
  }
}



export default connect(mapStateToProps, {
  getAnalytics,
  appRedirect,
  changeAnalyticsDateOption,
  updateSingleAnlyticsFilters,
  setAnalyticsType
})(DrivingAnalytics);
