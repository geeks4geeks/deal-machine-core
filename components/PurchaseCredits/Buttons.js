import React, { Component } from 'react';
import { Wrapper, Card } from 'app/NativeComponents/common';
import { PillButton } from 'app/NativeComponents/snippets';

class Buttons extends Component{


  render(){
    if(this.props.checkIfNeedsToSave()){
      return (
        <Wrapper style={{alignItems: "flex-end", justifyContent: "center"}}>
          <PillButton
            formButton
            primary={true}
            onPress={()=>this.props.purchaseCredits()}
          >
            {"Complete Purchase"}
          </PillButton>
        </Wrapper>
      );
    }


    return <Wrapper />
  }


}

export default Buttons;
