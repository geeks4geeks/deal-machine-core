import React, { Component } from 'react';
import {
  Wrapper,
  Card,
  PrimaryButton,
  DeleteButton
} from 'app/NativeComponents/common';

class SubmitButton extends Component {

  handleSubmit(){
    this.props.onPress();
    this.props.toggleModal({show: false, type: null});
  }

  handleCancel(){
    this.props.onCancel();
    this.props.toggleModal({show: false, type: null});
  }

  render() {
    if(this.props.uploaded){
      return(
        <Card>
          <PrimaryButton
            onPress={()=>this.handleSubmit()}
            formButton>
              Continue
          </PrimaryButton>
        </Card>
      )
    }
    return(
      <Card>
        <PrimaryButton
          onPress={()=>this.handleCancel()}
          formButton>
            Dismiss
        </PrimaryButton>
      </Card>
    )
  }
}


export default SubmitButton;
