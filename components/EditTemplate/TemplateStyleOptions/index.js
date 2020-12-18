import React, { Component } from 'react';
import { Wrapper, Card } from 'app/NativeComponents/common';

import SectionA from './SectionA';
import SectionB from './SectionB';
import SectionC from './SectionC';
import SectionD from './SectionD';

import PrimaryColor from './PrimaryColor';
import SecondaryColor from './SecondaryColor';

import SignatureSelect from './SignatureSelect';

import {
  dismissMobileKeyboard
} from 'app/NativeActions';

class TemplateStyleOptions extends Component{

  constructor(props){
    super(props);
    this.state={
      isWordTooLong: false
    };
  }

  triggerWordPopup(){

    dismissMobileKeyboard();


    this.props.setModal({
      title: "Text Overflow Warning",
      description: 'We recommend keeping words to 27 characters or less. Please preview before submitting',
      icon: "warning",
      submit: 'Got it!',
      onPress: ()=>{
      }
    });
    this.props.toggleModal({show: true, type: "normal"});
  }

  checkForLongWords(value, onChange){

    var checked_word = value.split(" ")

    if(this.state.isWordTooLong != true){
      for(var i = 0; i < checked_word.length; i++){
        // if url length exceeds 27 characters (includes hard return), trigger warning message
        if(checked_word[i].length >= 27 && this.state.isWordTooLong != true){
          this.setState({
            isWordTooLong: true
          })
          this.triggerWordPopup()
        }
      }


    }

    onChange(value);

  }

  render(){


    if(this.props.editTemplate.html_template != null){
      return (
        <Wrapper>
          <Card>
            <SectionA {...this.props} checkForLongWords={this.checkForLongWords.bind(this)}/>
          </Card>
          <Card>
            <SectionB {...this.props} checkForLongWords={this.checkForLongWords.bind(this)}/>
          </Card>
          <Card>
            <SectionC {...this.props} checkForLongWords={this.checkForLongWords.bind(this)}/>
          </Card>
          <Card>
            <SectionD {...this.props} checkForLongWords={this.checkForLongWords.bind(this)}/>
          </Card>
          <PrimaryColor {...this.props}/>
          <SecondaryColor {...this.props}/>

          <SignatureSelect {...this.props}/>
        </Wrapper>
      );
    }

    return <Wrapper />

  }
}

export default TemplateStyleOptions;
