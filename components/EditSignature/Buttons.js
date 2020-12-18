import React, { Component } from 'react';
import { Wrapper, Card, PrimaryButton, SecondaryButton } from 'app/NativeComponents/common';
import { RemoveTextButton } from 'app/NativeComponents/snippets';

class Buttons extends Component{

  render(){

    if(this.props.checkIfNeedsToSave()){
      return(
        <Wrapper>
          <Card>
            <PrimaryButton
              onPress={()=>this.props.saveSignature()}
              formButton
            >
              {
                this.props.editSignature.id ?
                "Save Signature" :
                this.props.onboarding ?
                "Create Signature" :
                "Create New Signature"
              }
            </PrimaryButton>
          </Card>
        </Wrapper>
      );

    }else if(this.props.editSignature.id){


      return (
        <Wrapper>

          <RemoveTextButton
            text={"Delete Signature"}
            onPress={()=>this.props.toggleActionSheet("delete_signature")}
          />
        </Wrapper>
      )

    }

    return <Wrapper />
  }
}

export default Buttons;
