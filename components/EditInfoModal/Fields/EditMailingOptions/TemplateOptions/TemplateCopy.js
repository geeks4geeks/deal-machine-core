import React, { Component } from 'react';
import { Wrapper, CardBody, Copy } from 'app/NativeComponents/common';

class TemplateCopy extends Component{

  render(){

    if(this.props.campaigns.length > 0){

      return (
        <CardBody>
          <Copy>
            If you don't select a campaign for your deal, you need to select the mail template and repeat mail settings to be used.
          </Copy>
        </CardBody>
      );
    }

    return <Wrapper />
  }

}

export default TemplateCopy;
