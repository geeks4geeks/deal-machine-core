import React, { Component } from 'react';
import {
  Wrapper,
  Copy,
  Bold,
  CenterCenter
} from 'app/NativeComponents/common';

import Owner from './Owner';

class CtaText extends Component{



  render(){



    if(this.props.owner.owner_name && this.props.owner.owner_name !== "" && this.props.user.team_clearance_level > 0){
      return (
        <CenterCenter>
          <Wrapper style={{marginTop: 10, marginBottom: 0}}>
            <Copy>{this.props.owner.owner_status_info.text}</Copy>
          </Wrapper>
          <Wrapper style={{marginTop: 5, marginBottom: 5}}>
            <Owner {...this.props} />
          </Wrapper>
          <Wrapper>
            <Copy style={{textAlign: "center"}}>
              <Bold>What's next?</Bold> Press <Bold>Start Mailers</Bold> to reach the propery owner. You can also try <Bold>Skip Tracing</Bold> to get more information about the property owner including: <Bold>phone numbers, emails, and additional addresses.</Bold>
            </Copy>
          </Wrapper>
        </CenterCenter>
      )
    }
  }
}

export default CtaText;
