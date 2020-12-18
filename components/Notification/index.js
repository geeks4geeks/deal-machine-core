import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Card,
  CardBody,
  Icon,
  Wrapper,
  Title,
  Copy,
  Bold,
  Animation,
  Stretch,
  Split,
  Row,
  Button } from 'app/NativeComponents/common';

import { showNotification } from 'app/NativeActions';
import DismissButton from './DismissButton';
import NotificationIcon from './NotificationIcon';

class Notification extends Component {

  componentDidMount() {

    clearInterval(this._interval);
    this._interval = setInterval(() => {
      this.handleReset();
    }, 5000);

  }

  componentWillUnmount(){
    clearInterval(this._interval);
  }

  handleReset(){
    clearInterval(this._interval);
    this.props.showNotification(false);
  }

  renderText(text, title, subtitle){
    if(subtitle && subtitle != ""){
      return(
        <Wrapper>
          <Title>{title}</Title>
          <Copy><Bold>{subtitle}</Bold></Copy>
          <Copy>{text}</Copy>
        </Wrapper>
      )
    }

    return(
      <Wrapper>
        <Title>{title}</Title>
        <Copy>{text}</Copy>
      </Wrapper>
    )
  }

  render(){
    const { text, title, subtitle, type, image, email, onPress } = this.props.notification;
    return (
      <Wrapper style={
      this.props.device == "desktop" ?
      {
        backgroundColor: "transparent",
        flex: 1,
        position:"fixed",
        right:0,
        bottom:0,
        width:"auto",
        width:"100%",
        maxWidth: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: this.props.isIphoneX ? 15 : 5
      } : {
        backgroundColor: "rgba(31,41,51,0.05)",
        flex: 1,
        position:"absolute",
        left:0,
        bottom:0,
        width:"100%",
        justifyContent: 'flex-end',
        alignItems: 'center',
        elevation: 6,
        paddingBottom: this.props.isIphoneX ? 15 : 5
      }}>
        <Animation
          style={{alignSelf: "stretch"}}
          type="fadeInUp"
          duration={500}
        >
          <Card>
              <Row>
                <Stretch>
                  <Button onPress={onPress}>
                    <CardBody style={{
                      paddingRight: 10,
                      paddingLeft: 10
                    }}>
                      <Row>
                        <NotificationIcon {...this.props}/>
                        <Stretch>
                          {this.renderText(text, title, subtitle)}
                        </Stretch>
                      </Row>
                    </CardBody>
                  </Button>
                </Stretch>
                <DismissButton {...this.props} handleReset={this.handleReset.bind(this)} />

              </Row>

          </Card>
        </Animation>

      </Wrapper>
    );
  }

};


const mapStateToProps = ({ native, settings }) => {
  const { device, isIphoneX } = native;
  const { colors } = settings;

  return { device, isIphoneX, colors }
}

export default connect(mapStateToProps, { showNotification })(Notification);
