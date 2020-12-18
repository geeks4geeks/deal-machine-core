import React, { PureComponent } from 'react';
import { Button, Wrapper, Icon, Copy } from 'app/NativeComponents/common';

class UndoButton extends PureComponent{

  undoAction(){

    this.props.toggleActionSheet("confirm_undo");
    this.props.handleReset();
  }

  render(){
    if(this.props.change_log){
      return(
        <Button style={{
          alignSelf: "stretch",
            width: 75,
            alignItems: "center",
            justifyContent: "center",
            borderLeftWidth: 1,
            borderLeftColor: this.props.colors.border_color,
            ...this.props.style
          }} onPress={this.undoAction.bind(this)}>
          <Icon icon={"undo"} size={26} />
          <Copy>Undo</Copy>
        </Button>
      )
    }

    return <Wrapper />
  }
}

export default UndoButton;
