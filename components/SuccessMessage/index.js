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
import { resetSuccessMessage, toggleActionSheet } from 'app/NativeActions';

import DismissButton from './DismissButton';
import UndoButton from './UndoButton';

class SuccessMessage extends PureComponent {

  componentDidMount() {

    clearInterval(this._interval);
    if(this.props.change_log){
      this._interval = setInterval(() => {
        this.handleReset();
      }, 9000);
    }else{
      this._interval = setInterval(() => {
        this.handleReset();
      }, 5000);
    }

  }

  handleReset(){
    clearInterval(this._interval);
    this.props.resetSuccessMessage();
  }

  renderText(text, title){

    return(
      <Wrapper>
        <Title>{title && title != "" ? title : "Success!"}</Title>
        <Copy>{text && text != "" ? text : "Your data has been saved!"}</Copy>
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
        width:"100%",
        maxWidth: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
        elevation: 6,
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
                      <Icon color={this.props.colors.success_color} icon={"check-circle"} size={32} style={{marginRight: 10}} />
                      <Stretch>
                        {this.renderText(text, title)}
                      </Stretch>
                    </Row>
                  </CardBody>
                </Stretch>
                <UndoButton {...this.props} handleReset={this.handleReset.bind(this)} />
                <DismissButton {...this.props} handleReset={this.handleReset.bind(this)} />

              </Row>

          </Card>
        </Animation>

      </Wrapper>
    );
  }

};


const mapStateToProps = ({ native, modal, settings }) => {
  const { device, isIphoneX } = native;
  const { change_log } = modal;
  const { colors } = settings;
  return { device, isIphoneX, change_log, colors }
}

export default connect(mapStateToProps, { resetSuccessMessage, toggleActionSheet })(SuccessMessage);
