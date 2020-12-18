import React, { Component } from 'react';
import {
  Button,
  Wrapper,
  Gradient,
  CardBody,
  Row,
  Icon,
  Stretch,
  Title,
  Copy,
  Bold
} from 'app/NativeComponents/common';

import ButtonNotifications from './ButtonNotifications';

class SideBarButton extends Component{


  renderDropdownIcon(){
    if(this.props.dropParent){
      return(
        <Icon
          icon={this.props.opened ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={18}
          color={this.props.colors.white_text_color}
          style={{marginLeft: 10, marginRight: 20}}
        />
      )
    }
  }

  renderFlag(){
    if(this.props.flag_title && this.props.flag_title != ""){
      return(
        <Gradient
        color1={this.props.colors.gradient_color_1} color2={this.props.colors.gradient_color_2}
        style={{
          backgroundColor:this.props.colors.card_color,
          borderRadius: 15,
          padding: 0,
          paddingRight: 10,
          paddingLeft: 10,
          marginLeft:15,
          marginRight:15
        }}>
          <Copy style={{fontSize: 12, color: this.props.colors.white_text_color}}><Bold>{this.props.flag_title}</Bold></Copy>
        </Gradient>
      )
    }
  }

  renderFullButton(){
    //if(this.props.mobile_toggle_drawer){
      return(
        <Wrapper className="dm-sidebar-hidden-button-section" style={{
          paddingLeft: 0,
          paddingTop: 0,
          paddingBottom: 0,
          height: 75,
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start"
        }}>

          <Stretch style={{
            alignItems: "flex-start",
            justifyContent: "center"
          }}>
            <Row style={{alignSelf: "stretch"}}>
              <Title style={{color: this.props.colors.white_text_color}}>
                {this.props.title}
              </Title>
              {this.renderFlag()}

            </Row>
          </Stretch>
          {/* <ButtonNotifications notifications={this.props.notifications}/> */}

          {this.renderDropdownIcon()}
        </Wrapper>
      )
    //}
  }

  render(){
    if(!this.props.hideButton){
      return (
        <Button
          id={this.props.id}
          to={this.props.to}
          className={"dm-sidebar-button"}
          onPress={this.props.onPress}
          style={{
            height: 75,
            backgroundColor: this.props.active ? "rgba(255,255,255,0.1)" : "transparent"
          }}
        >

            <Row style={{
              paddingLeft: this.props.dropButton ? 30 : 0
            }}>
                <Wrapper style={{
                  width: 75,
                  height: 75,
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <Icon
                    icon={this.props.icon}
                    fa_icon={this.props.fa_icon}
                    color={this.props.colors.white_text_color}

                    size={28}
                  />
                </Wrapper>
                {this.renderFullButton()}

            </Row>
        </Button>
      );
    }

    return <Wrapper />

  }

}

export default SideBarButton;
