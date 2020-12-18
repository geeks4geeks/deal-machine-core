import React, { Component } from 'react';
import { Wrapper, Scroll, CardBody, Copy } from 'app/NativeComponents/common';

import WelcomeVideo from './WelcomeVideo';

import PaymentVideo from './PaymentVideo';
import DistressedVideo from './DistressedVideo';

import PhotoVideo from './PhotoVideo';
import TagsVideo from './TagsVideo';
import RoutesVideo from './RoutesVideo';
import FinalVideo from './FinalVideo';

import Buttons from './Buttons';

import CompletePage from './CompletePage';

class Body extends Component{

  render(){

    return(
      <Scroll>
        <WelcomeVideo {...this.props}/>
        <PaymentVideo {...this.props}/>
        <DistressedVideo {...this.props}/>
        <PhotoVideo {...this.props}/>
        <TagsVideo {...this.props}/>
        <RoutesVideo {...this.props}/>
        <FinalVideo {...this.props}/>

        <Buttons {...this.props}/>

        <CompletePage {...this.props}/>


      </Scroll>
    )
  }
}

export default Body;
