import React, { Component } from 'react';
import {
  Wrapper,
  Card,
  Row,
  PrimaryButton,
  DeleteButton
} from 'app/NativeComponents/common';

import {
  PillButton
} from 'app/NativeComponents/snippets';

class SubmitButton extends Component {

  handleSubmit(){
    this.props.toggleModal({show: false, type: null});
    this.props.onPress();
  }

  render() {
    if(this.props.submit && this.props.submit != ""){
      switch(this.props.buttonType){
        case "primary":
        default:
          return(
            <Row style={{alignItems: "center", justifyContent: "center"}}>
              <PillButton
                primary={true}
                onPress={()=>this.handleSubmit()}
                formButton>
                  {this.props.submit}
              </PillButton>
            </Row>
          )
        break;

        case "destroy":
          return(
            <Card>
              <DeleteButton
                onPress={()=>this.handleSubmit()}
                formButton>
                  {this.props.submit}
              </DeleteButton>
            </Card>
          )
        break;

      }
    }

    return <Wrapper />
  }
}


export default SubmitButton;
