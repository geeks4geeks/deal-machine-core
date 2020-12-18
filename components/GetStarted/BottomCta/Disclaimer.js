import React, { Component } from 'react';
import {
  CardBody,
  Copy,
  Bold,
  ExternalLink
} from 'app/NativeComponents/common';

class Disclaimer extends Component{


  render(){

    return (
      <CardBody>
        <Copy style={{
          textAlign: "center"
        }}>
          <ExternalLink to={"https://dealmachine.com/terms-of-service"} target="_blank">Terms of Service:</ExternalLink> Pay $0.00 today, then after 14 days plans start as low as $49 per month plus mail and skip trace fees (based on how much you use). There are no contracts, you can cancel any time!
        </Copy>
      </CardBody>
    );
  }

}

export default Disclaimer;
