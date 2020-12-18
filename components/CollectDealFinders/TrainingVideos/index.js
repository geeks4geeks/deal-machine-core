import React, { Component } from 'react';
import { Wrapper, Copy, Card, CardBody } from 'app/NativeComponents/common';
import {  ToggleSwitch } from 'app/NativeComponents/snippets';

import WelcomeVideo from './WelcomeVideo';

import PaymentVideo from './PaymentVideo';
import DistressedVideo from './DistressedVideo';

import PhotoVideo from './PhotoVideo';
import TagsVideo from './TagsVideo';
import RoutesVideo from './RoutesVideo';
import FinalVideo from './FinalVideo';

class TrainingVideos extends Component{


  renderVideos(){
    if(this.props.edit_user_dealfinder_page.require_training == 1){
      return(
        <Wrapper>
          <WelcomeVideo {...this.props}/>

          <PaymentVideo {...this.props}/>
          <DistressedVideo {...this.props}/>

          <PhotoVideo {...this.props}/>
          <TagsVideo {...this.props}/>
          <RoutesVideo {...this.props}/>
          <FinalVideo {...this.props}/>
        </Wrapper>
      );
    }
  }

  render(){


    if(this.props.edit_team_link_toggle == "videos" && this.props.edit_live_page == "on"){
      return(
        <Wrapper>
          <CardBody>
            <Copy>
              Enable your training portal so DealFinders can train themselves and learn what types of properties you want them to find.
            </Copy>
          </CardBody>

          <Card>

            <ToggleSwitch
              style={{
                borderBottomWidth: 1,
                borderBottomColor: this.props.colors.border_color,
                borderBottomStyle: "solid"
              }}
              value={this.props.edit_user_dealfinder_page.require_training == 1 ? true : false}
              onChange={value => {
                //change approveDeals
                this.props.editTeamLinkInfo({ prop: "require_training", value: value == true ? 1 : 0 })
              }}
              title={"Require Training?"}
              text={"Require your DealFinders to watch all training videos in order to add deals for your team."}
            />
          </Card>
          {this.renderVideos()}
        </Wrapper>
      );


    }

    return <Wrapper />

  }
}

export default TrainingVideos;
