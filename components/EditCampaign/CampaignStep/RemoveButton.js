import React, { Component } from 'react';
import { Wrapper } from 'app/NativeComponents/common';
import { RemoveTextButton } from 'app/NativeComponents/snippets';

class RemoveButton extends Component{


  render(){
    if(this.props.editCampaign.current_step == this.props.step.index && this.props.step.index != 1){
      return (
        <Wrapper>
          <RemoveTextButton
            text="Delete Step"
            onPress={()=>{
              this.props.removeCampaignStep({step: this.props.step});
            }}
          />
        </Wrapper>
      )
    }

    return <Wrapper />
  }
}

export default RemoveButton;
