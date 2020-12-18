import React, { Component } from 'react';
import {
  Wrapper
} from 'app/NativeComponents/common';
import {
  TextButton
} from 'app/NativeComponents/snippets';

class CancelButton extends Component {

  handleCancel(){
    this.props.onCancel();
    this.props.toggleModal({show: false, type: null});
  }

  render() {

    if(!this.props.uploaded){
      return (
        <TextButton
          onPress={()=>this.handleCancel()}
          text={"Cancel"}
        />
      );
    }
    return <Wrapper />
  }
}


export default CancelButton;
