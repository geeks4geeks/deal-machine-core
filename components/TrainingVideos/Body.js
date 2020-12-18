import React, { Component } from 'react';
import { Wrapper, Scroll, CardBody, Copy } from 'app/NativeComponents/common';

import WelcomeVideo from './WelcomeVideo';

import PaymentVideo from './PaymentVideo';
import DistressedVideo from './DistressedVideo';

import PhotoVideo from './PhotoVideo';
import TagsVideo from './TagsVideo';
import RoutesVideo from './RoutesVideo';
import FinalVideo from './FinalVideo';

class Body extends Component{

  renderContactOptions(){
    if(this.props.device == "desktop"){
      return(
        <CardBody>
          <Copy style={{textAlign: "center"}}>If you have any questions please contact {this.props.user_dealfinder_page.name} at <a href={'mailto:'+this.props.user_dealfinder_page.email}>{this.props.user_dealfinder_page.email}</a> or <a href={'tel:'+this.props.user_dealfinder_page.phone}>{this.props.user_dealfinder_page.phone}</a></Copy>
        </CardBody>
      )
    }else{
      return(
        <CardBody>
          <Copy style={{textAlign: "center"}}>If you have any questions please contact {this.props.user_dealfinder_page.name} at {this.props.user_dealfinder_page.email} or {this.props.user_dealfinder_page.phone}</Copy>
        </CardBody>
      )
    }
  }

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

        {this.renderContactOptions()}
      </Scroll>
    )
  }
}

export default Body;
