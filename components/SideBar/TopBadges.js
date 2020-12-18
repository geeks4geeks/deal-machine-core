import React, { Component } from 'react';

import{
  Card,
  Icon,
  Wrapper,
  Row,
  Bold,
  Copy,
  Button,
  ExternalImage
} from 'app/NativeComponents/common';


class TopBadges extends Component{

  render(){
    if(this.props.my_badges){
      if(this.props.my_badges.length > 0){

        return(
          <Button
            to="/app/settings/badges"
            onPress={()=>{
              this.props.appRedirect({redirect: "badges"})}}>

              <Wrapper style={{
                paddingTop: 5
              }}>
                <Row>
                  <Icon
                    fa_icon={"trophy"}
                    color={this.props.colors.white_text_color}
                    size={16}
                    style={{
                      marginRight: 5
                    }}
                  />
                  <Copy style={{fontSize: 10, color: this.props.colors.white_text_color}}><Bold>{this.props.my_badges.length != 1 ? this.props.my_badges.length+" Badges" : this.props.my_badges.length+" Badge"}</Bold></Copy>
                </Row>
              </Wrapper>
          </Button>
        );
      }
    }
    return <Wrapper/>
  }
}


export default TopBadges;
