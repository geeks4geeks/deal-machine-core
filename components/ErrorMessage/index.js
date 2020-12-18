import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import {
  Card,
  CardBody,
  Icon,
  Wrapper,
  Title,
  Copy,
  Animation,
  Stretch,
  Split,
  Row,
  Button } from 'app/NativeComponents/common';

import { resetErrorMessage } from 'app/NativeActions';
import DismissButton from './DismissButton';


class ErrorMessage extends PureComponent {

  componentDidMount() {

    clearInterval(this._interval);
    this._interval = setInterval(() => {
      this.handleReset();
    }, 5000);

  }

  handleReset(){
    clearInterval(this._interval);
    this.props.resetErrorMessage();
  }

  renderText(text, title){

    return(
      <Wrapper>
        <Title>{title && title != "" ? title : "Error"}</Title>
        <Copy>{text && text != "" && text != "NETWORK_ERROR" && text != "TIMEOUT_ERROR" && text != "SERVER_ERROR" ? text : text == "NETWORK_ERROR" ? "Trouble connecting to the network. Please make sure you're connected to the internet" : "Something went wrong. Please try again."}</Copy>
      </Wrapper>
    )
  }

  render(){
    const { size, color, text, title, device } = this.props;
    return (
      <Wrapper style={
      device == "desktop" ?
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
                  <CardBody style={{
                    paddingRight: 10,
                    paddingLeft: 10
                  }}>
                    <Row>
                      <Icon color={this.props.colors.error_color} icon={"error"} size={32} style={{marginRight: 10}} />
                      <Stretch>
                        {this.renderText(text, title)}
                      </Stretch>
                    </Row>
                  </CardBody>
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

export default connect(mapStateToProps, { resetErrorMessage })(ErrorMessage);
