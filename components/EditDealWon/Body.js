import React, { Component } from 'react';

import {
  Wrapper,
  CardBody,
  Copy,
  Bold,
  ExternalLink
} from 'app/NativeComponents/common';

import Inputs from './Inputs';
import DealWonCopy from './DealWonCopy';

class Body extends Component{

  render(){
    return (
      <Wrapper>
        <Wrapper>
          <DealWonCopy {...this.props}/>
          <Inputs {...this.props}/>
        </Wrapper>

        <CardBody>
          <Copy style={{
            textAlign: "center"
          }}>
            <ExternalLink to={"https://dealmachine.com/privacy-policy"} target="_blank">Privacy Policy</ExternalLink>
          </Copy>
        </CardBody>
      </Wrapper>
    );
  }
}

export default Body;
