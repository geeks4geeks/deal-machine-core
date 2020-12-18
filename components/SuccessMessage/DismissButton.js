import React, { PureComponent } from 'react';
import { Button, Wrapper, Icon, Copy } from 'app/NativeComponents/common';

class DismissButton extends PureComponent{

  undoAction(){

  }

  render(){
    return(
      <Button style={{
        alignSelf: "stretch",
          width: 75,
          alignItems: "center",
          justifyContent: "center",
          borderLeftWidth: 1,
          borderLeftColor: this.props.colors.border_color,

          ...this.props.style
        }}  onPress={()=>this.props.handleReset()}>
        <Icon icon={"close"} size={26} />
        <Copy>Dismiss</Copy>
      </Button>
    );
  }
}

export default DismissButton;
