import React, { Component } from 'react';
import {
  Wrapper
} from 'app/NativeComponents/common';
import {
  TextButton
} from 'app/NativeComponents/snippets';

class CancelButton extends Component {

  handleCancel(){
    this.props.toggleModal({show: false, type: null});
    this.props.onCancel();
  }

  render() {

    if(this.props.cancel && this.props.cancel != ""){
      return (
        <TextButton
          style={{padding: 10}}
          onPress={()=>this.handleCancel()}
          text={this.props.cancel}
        />
      );
    }
    return <Wrapper />
  }
}


export default CancelButton;
