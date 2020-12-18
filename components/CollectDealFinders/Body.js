import React, { Component } from 'react';
import { Form, CardBody, Copy, Bold, LineBreak } from 'app/NativeComponents/common';

import UrlSettings from './UrlSettings';
import TeamLinkInfoToggle from './TeamLinkInfoToggle';

import SiteInfo from './SiteInfo';
import TrainingVideos from './TrainingVideos';
import WelcomeEmail from './WelcomeEmail';

import Buttons from './Buttons';

class Body extends Component{

  render(){
    return(
      <Form onSubmit={()=>this.props.saveLink()}>
        <CardBody>
          <Copy>
            Build a funnel to let new DealFinders sign up for your team. This is going to be easy! Set your landing page live to get started.
          </Copy>

        </CardBody>

        <UrlSettings {...this.props}/>
        <TeamLinkInfoToggle {...this.props}/>

        <SiteInfo {...this.props}/>
        <TrainingVideos {...this.props}/>
        <WelcomeEmail {...this.props}/>

        <Buttons {...this.props}/>
      </Form>
    )
  }
}

export default Body;
