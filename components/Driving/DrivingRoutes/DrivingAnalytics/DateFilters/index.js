import React, { Component } from 'react';
import { Row } from 'app/NativeComponents/common';

import DateOption from './DateOption';

class DateFilters extends Component{


  render(){


    return (
      <Row style={{
        alignSelf: "stretch",
        marginTop:15,
        marginBottom:10,
        alignItems: "center",
        justifyContent: "center"
      }}>

        <DateOption
          title="4wk"
          date_type={"4wk"}
          {...this.props}
        />
        <DateOption
          title="Mtd"
          date_type={"mtd"}
          {...this.props}
        />
        <DateOption
          title="Ytd"
          date_type={"ytd"}
          {...this.props}
        />
        <DateOption
          title="Custom"
          date_type={"custom"}
          onPress={()=>{
            this.props.toggleCalendar();
          }}
          {...this.props}
        />


      </Row>
    );
  }

}

export default DateFilters;
