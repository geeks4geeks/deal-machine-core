import React, { Component } from 'react';

import {
  Wrapper,
  Card,
  Row,
  Copy,
  Bold,
  Button,
  Icon
 } from 'app/NativeComponents/common';

 import TeamMemberFilterTag from './TeamMemberFilterTag';
 import DatesFilterTag from './DatesFilterTag';


class FilterTags extends Component{



  render(){
    if(this.props.route_filters){
      return (
        <Wrapper>
          <Row style={{
            flexWrap: "wrap",
            justifyContent: "flex-end"
          }}>

            <TeamMemberFilterTag {...this.props} />
            <DatesFilterTag {...this.props} />

          </Row>
        </Wrapper>
      );
    }

    return <Wrapper />

  }

}

export default FilterTags;
