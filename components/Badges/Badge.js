import React, {Component} from 'react';
import moment from 'moment';

import {
  Wrapper,
  Card,
  Title,
  Copy,
  CardBody,
  Bold,
  Row,
  Icon
 } from 'app/NativeComponents/common';

 import BadgeIcon from './BadgeIcon';

class Badge extends Component{

  renderOverlay(){
    if(!this.props.earnedBadge){
      return(
        <Wrapper style={{
          position: "absolute",
          borderRadius: 5,
          bottom: 0, top: 0, right: 0, left: 0,
          backgroundColor: this.props.dark_mode == "dark_mode" ? "rgba(31, 41, 51, 0.75)" : "rgba(238, 238, 238, 0.8)"
        }} />
      )
    }
  }

  renderAnimationIcon(){



    if(this.props.badge.gold_badge == 1 && this.props.earnedBadge){
      return(
        <Icon
          style={{
            alignSelf: "flex-end",
            padding: 10
          }}
          color={this.props.colors.light_text_color}
          icon={"videocam"}
          size={20}
        />
      )
    }else{
      return <Wrapper />;
    }
  }

  renderEarned(){
    if(this.props.earnedBadge){
      return(
        <Copy>
          <Bold>
            Earned: {this.props.badge.date_created ? moment(this.props.badge.date_created).format("MMM Do, YYYY") : ""}
          </Bold>
        </Copy>
      )
    }
  }

 renderTeamBadge(){
   if(this.props.isTeamBadge){
     return (<Copy><Bold>Team Badge</Bold></Copy>)
   }
 }

  render(){
    return(
      <Card style={{
        position: "relative"
      }}>

        <Row>

            <BadgeIcon
              colors={this.props.colors}
              style={{ width: 100, height: 100 }}
              image={this.props.badge.image}
              earnedBadge={this.props.earnedBadge}
            />
            <Wrapper
              style={{
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "flex-start"
              }}
            >
              <CardBody>
                <Title>{this.props.badge.title}</Title>
                {this.renderEarned()}
                <Copy>{this.props.badge.description}</Copy>
                {this.renderTeamBadge()}
              </CardBody>
            </Wrapper>
            {this.renderAnimationIcon()}


        </Row>
        {this.renderOverlay()}
      </Card>
    );
  }
}

export default Badge;
