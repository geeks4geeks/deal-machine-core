import React, { Component } from 'react';
import { Wrapper, Card, Form } from 'app/NativeComponents/common';

import Inputs from './Inputs';
import Buttons from './Buttons';

class Body extends Component{


  render(){
    if(this.props.no_container){
      return (
        <Wrapper>
          <Form onSubmit={()=>this.props.login()}>
            <Inputs {...this.props} />
            <Buttons {...this.props}/>
          </Form>
        </Wrapper>
      );
    }

    return (
      <Wrapper>
        <Form onSubmit={()=>this.props.login()}>
          <Card>
            <Inputs {...this.props} />
          </Card>
          <Buttons {...this.props}/>
        </Form>
      </Wrapper>
    );
  }

}

export default Body;
