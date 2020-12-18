import React, { Component } from 'react';
import {
  Wrapper,
  Card,
  CardBody,
  Row,
  Spin,
  Copy,
  Button,
  Icon
} from 'app/NativeComponents/common';

import { Carousel, DateRangePicker } from 'app/NativeComponents/snippets';

import FilterTags from './FilterTags';
import DateFilters from './DateFilters';

import ActiveDeals from './ActiveDeals';

import PropertiesAddedGraph from './PropertiesAddedGraph';
import MailSentGraph from './MailSentGraph';
import MoneySpent from './MoneySpent';
import Profit from './Profit';
import MilesDriven from './MilesDriven';
import TimeDriven from './TimeDriven';

import AnalyticsError from './AnalyticsError';

import moment from 'moment';

class Body extends Component{

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

  renderGraphs(){
    if(this.props.analytics_loading){
      return (
        <CardBody>
          <Row style={{alignItems: "center", justifyContent: "center"}}>
            <Spin size="small"/>
            <Copy style={{marginLeft: 10}}>Loading Analytics...</Copy>
          </Row>
        </CardBody>
      );
    }

    return(
      <Wrapper>

        <Carousel
          items={[{
            slug:"properties_added"
          }, {
            slug:"mail_sent"
          }, {
            slug:"profit"
          }, {
            slug:"money_spent"
          }]}
          renderItem={({item})=>{
            switch(item.slug){
              case "properties_added":
                return <PropertiesAddedGraph
                          {...this.props}
                          getTotalValue={this.getTotalValue.bind(this)}
                          renderDateLabels={this.renderDateLabels.bind(this)}
                        />
              break;

              case "mail_sent":
                return <MailSentGraph
                          {...this.props}
                          getTotalValue={this.getTotalValue.bind(this)}
                          renderDateLabels={this.renderDateLabels.bind(this)}
                        />
              break;

              case "profit":
                return <Profit
                          {...this.props}
                          getTotalValue={this.getTotalValue.bind(this)}
                          renderDateLabels={this.renderDateLabels.bind(this)}
                        />
              break;

              case "money_spent":
                return <MoneySpent
                          {...this.props}
                          getTotalValue={this.getTotalValue.bind(this)}
                          renderDateLabels={this.renderDateLabels.bind(this)}
                        />
              break;
            }

            return <Wrapper />
          }}
          include_pagination={true}
          dotColor={this.props.colors.text_color}
        />
        <AnalyticsError {...this.props} />
      </Wrapper>
    )
  }

  renderActiveDeals(){
    //if(!this.props.analytics_loading){
      return(
        <ActiveDeals {...this.props} />
      )
    //}
  }

  render(){

    return (
      <Wrapper>
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
        {this.renderActiveDeals()}

        <Card style={{paddingBottom: this.props.isMobile ? 0 : 30, marginBottom:50}}>
          <Row style={{justifyContent: "flex-end"}}>
            <Button onPress={()=>{
              this.props.setAnalyticsType("all")
              this.props.appRedirect({
                redirect: "analytics_filters"
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
          <DateFilters
            {...this.props}
            toggleCalendar={this.toggleCalendar.bind(this)}
          />
          <FilterTags {...this.props}/>
          {this.renderGraphs()}
        </Card>
      </Wrapper>
    );
  }

}

export default Body;
