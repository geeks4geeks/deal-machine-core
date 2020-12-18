import React, { Component } from 'react';
import { Wrapper, Copy} from 'app/NativeComponents/common';
import { renderDate } from 'app/NativeActions';
import moment from 'moment';

class ActivityDateCreated extends Component{

  renderDate(date_created){

    if(date_created){

      var date = new Date();
      var offsetInHours = date.getTimezoneOffset() / 60;
      var day = date_created.slice(0, 10)
      var time = moment(date_created).subtract(offsetInHours, "hours").format("MMM Do h:mm a").substring(8);
      var new_day = moment(day).format("MMM Do") + " " + time

      return new_day;
    }else{
      return "";
    }
  }

  render(){

    if(this.props.date_created && this.props.date_created != "" && this.props.type != "mailed"){
      return (
        <Copy style={{
          color: this.props.colors.light_text_color
        }}>
          {this.renderDate(this.props.date_created)}
        </Copy>
      );
    }

    return <Wrapper />;
  }
}

export default ActivityDateCreated;
