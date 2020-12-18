import React, { Component } from 'react';
import { Scroll, Card, DeleteButton } from 'app/NativeComponents/common';
import { MenuItem, MenuButton } from 'app/NativeComponents/snippets';

import OnboardingText from './OnboardingText';

import DefaultSendingMode from './DefaultSendingMode';
import MailOptions from './MailOptions';
import Buttons from './Buttons';

class Body extends Component{


  render(){
    return (
      <Scroll>
        <OnboardingText {...this.props}/>
        <MailOptions {...this.props}/>
        <Buttons {...this.props}/>
      </Scroll>
    );
  }

}

export default Body;
