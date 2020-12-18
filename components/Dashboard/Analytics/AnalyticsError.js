import React, { Component } from 'react';
import {
  Wrapper,
  Copy,
  Title,
  Bold,
  CardBody
} from 'app/NativeComponents/common';

class MilesDriven extends Component{


  render(){
    if(this.props.analytics_dates){
      if(this.props.analytics_dates.length > 0){
        return <Wrapper />;
      }

    }
    if(!this.props.analytics_loading){
      return (
        <Wrapper>
          <CardBody style={{marginTop: 20}}>
            <Title style={{textAlign: "center"}}>Your analytics will show here.</Title>
            <Copy style={{textAlign: "center"}}>There is nothing to display based on your filters. Try changing your filter options.</Copy>
          </CardBody>
        </Wrapper>
      );
    }

    return <Wrapper />;



  }

}

export default MilesDriven;
