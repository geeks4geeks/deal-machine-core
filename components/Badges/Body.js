
import React, { Component } from 'react';

import {
  Wrapper,
  Row,
  Title,
  CardBody,
  Button,
  Spin,
  CenterCenter,
  Scroll,
  Copy
} from 'app/NativeComponents/common';

import Badge from './Badge';

class Body extends Component{

  renderBadgesEarned(){
    if(this.props.my_badges.length > 0){
      return(
        <CardBody>
          <Title>Badges Earned</Title>
          <Wrapper>
          {this.props.my_badges.map((my_badge) => {
            return(
              <Button
                key={my_badge.id}
                onPress={()=>{this.props.toggleBadgePopup(true, my_badge)}}>
                <Badge
                  colors={this.props.colors}
                  dark_mode={this.props.dark_mode}
                  badge={my_badge}
                  earnedBadge={true}
                  isTeamBadge = {my_badge.is_team_badge == 1 ? true : false}
                />
              </Button>
            )
          })}
          </Wrapper>
        </CardBody>
      )
    }
  }

  render(){
    if(this.props.badges_loaded_all && this.props.all_badges.length > 0){
      return(
        <Scroll>
          <Wrapper>
            {this.renderBadgesEarned()}
            <CardBody>
              <Title>All Available Badges</Title>
              <Wrapper>
              {this.props.not_earned_badges.map((not_earned_badges) => {
                return(
                  <Badge
                    colors={this.props.colors}
                    dark_mode={this.props.dark_mode}
                    key={not_earned_badges.id}
                    badge={not_earned_badges}
                    earnedBadge={false}
                    isTeamBadge = {not_earned_badges.is_team_badge == 1 ? true : false}

                  />
                )
              })}
              </Wrapper>
            </CardBody>
          </Wrapper>
        </Scroll>
      );
    }else if(this.props.badges_loaded_all && this.props.all_badges.length == 0){
      return(
        <Wrapper>
          <CardBody>

            <CardBody style={{marginTop: 30}}>
              <Title style={{textAlign: "center"}}>Earn Some Badges!</Title>
              <Copy style={{textAlign: "center"}}>Earn badges while using the Dealmachine App</Copy>
            </CardBody>
          </CardBody>

        </Wrapper>
      )
    }
    return(
      <Wrapper>
        <Wrapper style={{marginTop: 30}}>
          <CenterCenter>
            <Spin/>
          </CenterCenter>
        </Wrapper>
      </Wrapper>
    )
  }
}

export default Body;
