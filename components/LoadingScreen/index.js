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
  Spin } from 'app/NativeComponents/common';

class LoadingScreen extends PureComponent {


  renderText(text, title){

    return(
      <Wrapper>
        <Title>{title && title != "" ? title : "Loading..."}</Title>
        <Copy>{text && text != "" ? text : "Please be patient. This can take a few seconds."}</Copy>
      </Wrapper>
    )
  }

  render(){

    const { size, color, text, title, device } = this.props;
    return (
      <Animation
        style={device == "desktop" ? {
          position: "fixed",
          left:0,
          top:0,
          width:"100%",
          height: "100%",
          pointerEvents: "none",
          backgroundColor: "rgba(31,41,51,0.75)",
        } : {
          backgroundColor: "rgba(31,41,51,0.75)",
          flex: 1,
          position:"absolute",
          left:0,
          top:0,
          width:"100%",
          height: "100%",
          justifyContent: 'flex-end',
          alignItems: 'center',
          elevation: 6,
        }}
        type="fadeIn"
        duration={500}
      >
        <Wrapper

        style={
        device == "desktop" ?
        {
          backgroundColor: "transparent",
          position:"absolute",
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
                        <Wrapper style={{alignItems: "center", justifyContent: "center", marginRight: 10}}>
                          <Spin size="large" />
                        </Wrapper>
                        <Stretch>
                          {this.renderText(text, title)}
                        </Stretch>
                      </Row>
                    </CardBody>
                  </Stretch>
                </Row>

            </Card>
          </Animation>

        </Wrapper>
      </Animation>
    );
  }

};


const mapStateToProps = ({ native }) => {
  const { device, isIphoneX } = native;
  return { device, isIphoneX }
}

export default connect(mapStateToProps, {})(LoadingScreen);
