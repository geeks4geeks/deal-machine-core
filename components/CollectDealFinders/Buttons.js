import React, { Component } from 'react';
import { Wrapper, Card, PrimaryButton } from 'app/NativeComponents/common';

class Buttons extends Component{

  render(){

    if(this.props.checkIfNeedsToSave()){

      return(
        <Card>
          <PrimaryButton onPress={()=>this.props.saveLink()}>
            Save Options
          </PrimaryButton>
        </Card>
      )

    }

    return <Wrapper />
  }
}

export default Buttons;
