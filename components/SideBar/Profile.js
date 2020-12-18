import React, { Component } from 'react';
import {
  Wrapper,
  Button,
  CardBody,
  Row,
  ProfilePic,
  Stretch,
  Title,
  Copy,
  Icon
} from 'app/NativeComponents/common';

import DealCreditsButton from './DealCreditsButton';
import TopBadges from './TopBadges';


class Profile extends Component{


  renderFullProfile(){
    //if(this.props.mobile_toggle_drawer){
      return(
        <Wrapper className="dm-sidebar-hidden-profile" style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start"
        }}>
          <Stretch style={{
            justifyContent: "center",
            alignItems: "flex-start"
          }}>
            <Title style={{color: this.props.colors.white_text_color}}>
              {this.props.user.firstname} {this.props.user.lastname}
            </Title>

            <Row>
              <DealCreditsButton {...this.props}/>
              <TopBadges {...this.props}/>
            </Row>
          </Stretch>
        </Wrapper>
      )
    //}
  }

  render(){

    return (
      <Row>
        <Button

        to="/app/settings/profile/user-information"
        onPress={()=>this.props.appRedirect({redirect:"editUserInfo"})}
        style={{
          width: 75,
          height: 75,
          alignItems: "center",
          justifyContent: "center"
        }}>
          <ProfilePic
            email={this.props.user.email}
            image={this.props.user.image}
            size={35}
            style={{
              marginRight: 0
            }}
          />
        </Button>
        {this.renderFullProfile()}
      </Row>

    );

  }

}

export default Profile;
