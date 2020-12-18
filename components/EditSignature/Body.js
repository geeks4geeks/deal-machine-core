import React, { Component } from 'react';
import { Wrapper, Form, Card, Input } from 'app/NativeComponents/common';

import OnboardingCopy from './OnboardingCopy';

import Inputs from './Inputs';
import Buttons from './Buttons';

class Body extends Component{


  render(){
    if(this.props.editSignature){
      return(
        <Form onSubmit={()=>this.props.saveSignature()}>
          <OnboardingCopy {...this.props} />
          <Inputs {...this.props} />
          <Buttons {...this.props}/>
        </Form>
      );
    }

    return <Wrapper />
  }
}

export default Body;
