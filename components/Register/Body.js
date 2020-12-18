import React, { Component } from 'react';
import { Wrapper, Form } from 'app/NativeComponents/common';

import Inputs from './Inputs';
import Buttons from './Buttons';

class Body extends Component{



  render(){
    return (
      <Wrapper>
        <Form onSubmit={()=>this.props.register()}>
          <Inputs
            {...this.props}
            />
          <Buttons
            {...this.props}
          />
        </Form>
      </Wrapper>
    );
  }

}

export default Body;
