import React, { Component } from 'react';
import { Wrapper, Card, PrimaryButton } from 'app/NativeComponents/common';
import { TextButton } from 'app/NativeComponents/snippets';

class Buttons extends Component{

  render(){

    return (
      <Wrapper>
        <Card>
          <PrimaryButton
            onPress={()=>this.props.refreshApp()}
          >
            Refresh The App
          </PrimaryButton>
        </Card>
        <TextButton
          onPress={()=>this.props.toggleActionSheet("requested_team_more_options")}
          text="More Options"
        />
      </Wrapper>
    );

  }

}

export default Buttons;
