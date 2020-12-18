import React, { Component } from 'react';
import { Wrapper, Card, MultiLineInput } from 'app/NativeComponents/common';

import Buttons from './Buttons';

class Body extends Component{


  render(){
    return (
      <Wrapper>
        <Card>
          <MultiLineInput
            ref="text"
            name="text"
            returnKeyType="default"
            autoCapitalize="sentences"
            blurOnSubmit={false}
            keyboardType="default"
            placeholder="Enter your note here."
            label="Note"
            onChange={value => this.props.editNoteFieldChanged({ prop: "text", value })}
            value={this.props.editNote.text}
          />
        </Card>
        <Buttons {...this.props}/>
      </Wrapper>
    );


    return <Wrapper />
  }

}

export default Body;
