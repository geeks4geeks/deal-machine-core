import React, { Component } from 'react';
import {
  Button,
  Card,
  Row,
  ProfilePic,
  Wrapper,
  CardBody,
  Split,
  Stretch,
  Title,
  Icon,
  CenterCenter,
  Copy,
  Bold
} from 'app/NativeComponents/common';

import {
  renderDate
} from 'app/NativeActions';

class RequestItem extends Component{

  render(){

    return (
      <Button
      onPress={this.props.onPress}
      to={"/app/team/request/"+this.props.member.id}
      style={{borderBottomStyle: "solid", borderBottomWidth: 1, borderBottomColor: this.props.colors.border_color,
      backgroundColor: this.props.active_team_member ? this.props.active_team_member.id == this.props.member.id ? this.props.colors.background_color : "transparent" : "transparent"
      }}>
        <Row>
          <CardBody style={{flex: 1, padding:10, paddingTop: 15, paddingBottom:15}}>
            <Row>
              <Stretch>
                <Row>
                  <ProfilePic
                    size={25}
                    email={this.props.member.email}
                    image={this.props.member.image}
                    style={{marginRight: 10}}
                  />
                  <Wrapper style={{
                    flex: 1
                  }}>
                    <Copy>
                      <Bold>{this.props.member.email}</Bold>
                    </Copy>
                    <Copy>Requested to join on {renderDate(this.props.member.date_created)}</Copy>
                  </Wrapper>
                </Row>
              </Stretch>
              <Wrapper>
                <CenterCenter>
                  <Icon
                    style={{marginLeft: 10}}
                    icon={"keyboard-arrow-right"}
                  />
                </CenterCenter>
              </Wrapper>
            </Row>
          </CardBody>
        </Row>
      </Button>
    )
  }

}

export default RequestItem;
