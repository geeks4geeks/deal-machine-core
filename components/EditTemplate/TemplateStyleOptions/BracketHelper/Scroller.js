import React, { Component } from 'react';
import {
  Wrapper,
  Scroll,
  Copy,
  Bold
} from 'app/NativeComponents/common';

import Brackets from './Brackets';

class Scroller extends Component{

  render(){

    if(this.props.focused){

      if(this.props.device == "desktop"){
        return (
          <Wrapper
            style={{
              backgroundColor: this.props.colors.background_color,
              borderBottomWidth: 1,
              borderBottomStyle: "solid",
              borderBottomColor: this.props.colors.border_color
            }}
          >
            <Copy style={{
              padding: 10,
              paddingBottom: 0
            }}><Bold>Press an option to insert it into the end of your text:</Bold></Copy>

            <Brackets {...this.props}/>

          </Wrapper>
        );
      }else{
        return (
          <Wrapper
            style={{
              backgroundColor: this.props.colors.background_color,
              borderBottomWidth: 1,
              borderBottomStyle: "solid",
              borderBottomColor: this.props.colors.border_color
            }}
            >
            <Copy style={{
              padding: 10,
              paddingBottom: 0
            }}><Bold>Press an option to insert it into the end of your text:</Bold></Copy>

            <Scroll
              horizontal={true}
              keyboardShouldPersistTaps={'always'}
            >
              <Brackets {...this.props}/>

            </Scroll>
          </Wrapper>
        );
      }

    }

    return(
      <Wrapper />
    )

  }
}

export default Scroller;
