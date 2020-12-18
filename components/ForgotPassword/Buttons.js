import React, { Component } from 'react';
import { Wrapper, Card, PrimaryButton } from 'app/NativeComponents/common';
import { TextButton } from 'app/NativeComponents/snippets';

class Buttons extends Component{

  render(){
    return (
      <Wrapper>
        <Card>
          <PrimaryButton
            formButton
            onPress={()=>this.props.forgot()}
          >
            Reset Password
          </PrimaryButton>
        </Card>

      </Wrapper>
    );

  }

}

export default Buttons;
