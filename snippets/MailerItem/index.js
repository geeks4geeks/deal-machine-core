import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Wrapper,
  Row,
  Card,
  Copy,
  Bold,
  Button,
  Icon
} from 'app/NativeComponents/common';
import {
  PhotoOverlay
} from 'app/NativeComponents/snippets';

import {
  appRedirect,
  renderDate
} from 'app/NativeActions';

import MailerTimeline from './MailerTimeline';

class MailerItem extends Component{

  constructor(props){
    super(props);
    this.state = {}
  }

  renderScreenShots(){
    if(this.props.mailer.screenshot_front && this.props.mailer.screenshot_front != "" &&
      this.props.mailer.screenshot_back && this.props.mailer.screenshot_back != ""){

        const width = 150;
        const height = width*0.68;

        let front_height = width*0.68;

        switch(this.props.mailer.template_type){
          case "postcard":
          default:
            front_height = width*0.68;
          break;
          case "handwritten":
            front_height = width*1.3;
          break;
        }

      return(

        <Row style={{
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 5,
          paddingBottom: 5
        }}>
          <Wrapper style={{padding: 5}}>
            <PhotoOverlay
              image={this.props.mailer.screenshot_front}
              use_full={true}
              height={front_height}
              width={width}
              outerStyle={{
                borderWidth: 1,
                borderColor: this.props.colors.border_color,
                borderStyle: 'solid'
              }}
              backgroundColor="transparent"
            />
          </Wrapper>
          <Wrapper style={{padding: 5}}>
            <PhotoOverlay
              image={this.props.mailer.screenshot_back}
              use_full={true}
              height={height}
              width={width}
              outerStyle={{
                borderWidth: 1,
                borderColor: this.props.colors.border_color,
                borderStyle: 'solid'
              }}
              backgroundColor="transparent"
            />
          </Wrapper>
        </Row>
      )
    }
  }


  render(){

    if(this.props.mailer){
      return(
        <Wrapper style={{
          padding: 20,
          borderBottomWidth: 1,
          borderBottomColor: this.props.colors.border_color,
          borderBottomStyle: 'solid'
        }}>
          <Wrapper>
            <Copy>Sent to <Bold>{this.props.mailer.lead_address}</Bold> on <Bold>{renderDate(this.props.mailer.date_created,true)}</Bold></Copy>
            <Button onPress={this.props.onPropertyPress}>
              <Row>
                <Copy>View Lead</Copy>
                <Icon
                  style={{marginLeft: 5}}
                  size={14}
                  icon="keyboard-arrow-right"
                />
              </Row>
            </Button>
          </Wrapper>
          {this.renderScreenShots()}
          <MailerTimeline mailer={this.props.mailer} />
        </Wrapper>
      )

    }

    return <Wrapper />;

  }

}

const mapStateToProps = ({ auth, settings, native }) => {
  const { token, user } = auth;
  const { colors } = settings;

  const { device, isMobile } = native;

  return {
    token, user, colors,
    device, isMobile
  }
}


export default connect(mapStateToProps, {
  appRedirect
})(MailerItem);
